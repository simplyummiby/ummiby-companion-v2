import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const checks = [];
const check = (condition, label) => {
  checks.push({ label, passed: Boolean(condition) });
  if (!condition) failures.push(label);
};

const context = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(root, 'js/data/quran-data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'js/data/readingLibrary.js'), 'utf8'), context);
const quran = context.window.QURAN_DATA;
const library = context.window.QURAN_READING_LIBRARY;

check(Array.isArray(quran) && quran.length === 114, '114 surahs load');
const ayat = quran.flatMap(surah => surah.ayahs.map(ayah => ({ ...ayah, surah: surah.number })));
check(ayat.length === 6236, '6,236 ayat load');
check(ayat.every(ayah => String(ayah.arabic || '').trim()), 'Every ayah has Arabic text');
check(ayat.every(ayah => String(ayah.translation || '').trim()), 'Every ayah has a translation');
check(library?.units?.length === 294, '294 Reading Units load');
check(library?.units?.[0]?.id === 'P0001', 'Reading Units begin at P0001');
check(library?.units?.at(-1)?.id === 'P0294', 'Reading Units end at P0294');

const covered = new Set();
let rangeValid = true;
for (const unit of library.units) {
  const surah = quran[unit.surahNumber - 1];
  if (!surah || unit.startAyah < 1 || unit.endAyah > surah.ayahs.length || unit.endAyah < unit.startAyah) rangeValid = false;
  for (let n = unit.startAyah; n <= unit.endAyah; n += 1) {
    const key = `${unit.surahNumber}:${n}`;
    if (covered.has(key)) rangeValid = false;
    covered.add(key);
  }
}
check(rangeValid, 'All Reading Unit ranges are valid and non-overlapping');
check(covered.size === 6236, 'Reading Units cover every ayah exactly once');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of index.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:\?[^"#]*)?"/g)) {
  check(fs.existsSync(path.join(root, match[1])), `Entry asset exists: ${match[1]}`);
}

for (const file of ['js/app.js', 'js/shell.js', 'js/data/quran-canonical.js']) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of source.matchAll(/from\s+["']([^"']+)["']/g)) {
    const target = match[1].split('?')[0];
    if (target.startsWith('.')) check(fs.existsSync(path.resolve(path.dirname(path.join(root, file)), target)), `Module import exists: ${file} → ${target}`);
  }
}

const version = fs.readFileSync(path.join(root, 'js/version.js'), 'utf8');
check(version.includes("'3.27.1.6'"), 'Application version is 3.27.1.6');
check(index.includes('v=3.27.1.6'), 'Entry cache keys are 3.27.1.6');

console.log(`Ummiby Companion release validation: ${checks.length - failures.length}/${checks.length} checks passed.`);
for (const result of checks) console.log(`${result.passed ? 'PASS' : 'FAIL'}  ${result.label}`);
if (failures.length) process.exit(1);
