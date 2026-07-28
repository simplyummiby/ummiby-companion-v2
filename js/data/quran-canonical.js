import "./quran-data.js?v=3.13.0";
import "./readingLibrary.js?v=3.13.0";

export const BASMALAH_ARABIC = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

function normalizeBasmalahPlacement(quranData) {
  if (!Array.isArray(quranData)) return quranData;
  quranData.forEach((surah) => {
    if (surah.number === 1 || surah.number === 9) return;
    const firstAyah = surah.ayahs?.[0];
    if (!firstAyah?.arabic?.startsWith(BASMALAH_ARABIC)) return;
    firstAyah.arabic = firstAyah.arabic.slice(BASMALAH_ARABIC.length).trimStart();
  });
  return quranData;
}

export const QURAN_DATA = normalizeBasmalahPlacement(window.QURAN_DATA);
export const QURAN_READING_LIBRARY = window.QURAN_READING_LIBRARY;

export function getSurah(surahNumber) {
  return QURAN_DATA.find((surah) => surah.number === Number(surahNumber)) ?? null;
}

export function getAyah(surahNumber, ayahNumber) {
  return getSurah(surahNumber)?.ayahs.find((ayah) => ayah.ayah === Number(ayahNumber)) ?? null;
}

export function getReadingUnit(unitIdOrOrder) {
  const id = typeof unitIdOrOrder === "number"
    ? `P${String(unitIdOrOrder).padStart(4, "0")}`
    : String(unitIdOrOrder).toUpperCase().startsWith("P")
      ? String(unitIdOrOrder).toUpperCase()
      : `P${String(Number(unitIdOrOrder)).padStart(4, "0")}`;
  return QURAN_READING_LIBRARY.getById(id);
}

export function getReadingUnitAyat(unitIdOrOrder) {
  const unit = getReadingUnit(unitIdOrOrder);
  if (!unit) return [];
  const surah = getSurah(unit.surahNumber);
  if (!surah) return [];
  return surah.ayahs.filter((ayah) => ayah.ayah >= unit.startAyah && ayah.ayah <= unit.endAyah);
}

export function validateCanonicalQuranData() {
  if (!Array.isArray(QURAN_DATA)) throw new Error("Canonical Qur’an data did not load.");
  if (!QURAN_READING_LIBRARY) throw new Error("Canonical Reading Library did not load.");
  QURAN_READING_LIBRARY.validate();

  if (QURAN_DATA.length !== 114) throw new Error(`Expected 114 surahs, found ${QURAN_DATA.length}.`);
  const ayahTotal = QURAN_DATA.reduce((sum, surah) => sum + surah.ayahs.length, 0);
  if (ayahTotal !== 6236) throw new Error(`Expected 6,236 ayat, found ${ayahTotal}.`);

  for (let index = 0; index < QURAN_DATA.length; index += 1) {
    const surah = QURAN_DATA[index];
    const expectedNumber = index + 1;
    if (surah.number !== expectedNumber) throw new Error(`Surah sequence error at ${expectedNumber}.`);
    if (surah.ayahCount !== surah.ayahs.length) throw new Error(`Ayah count mismatch in Surah ${surah.number}.`);
    surah.ayahs.forEach((ayah, ayahIndex) => {
      if (ayah.ayah !== ayahIndex + 1) throw new Error(`Ayah sequence error at ${surah.number}:${ayahIndex + 1}.`);
      if (!ayah.arabic?.trim()) throw new Error(`Missing Arabic at ${surah.number}:${ayah.ayah}.`);
      if (!ayah.translation?.trim()) throw new Error(`Missing translation at ${surah.number}:${ayah.ayah}.`);
    });
  }

  const covered = new Set();
  for (const unit of QURAN_READING_LIBRARY.units) {
    const surah = getSurah(unit.surahNumber);
    if (!surah) throw new Error(`Missing Surah ${unit.surahNumber} for ${unit.id}.`);
    if (unit.endAyah > surah.ayahCount) throw new Error(`${unit.id} exceeds Surah ${unit.surahNumber}.`);
    const ayat = getReadingUnitAyat(unit.id);
    if (ayat.length !== unit.endAyah - unit.startAyah + 1) throw new Error(`Incomplete ayah range for ${unit.id}.`);
    for (let ayah = unit.startAyah; ayah <= unit.endAyah; ayah += 1) {
      const key = `${unit.surahNumber}:${ayah}`;
      if (covered.has(key)) throw new Error(`Duplicate Reading Unit coverage at ${key}.`);
      covered.add(key);
    }
  }
  if (covered.size !== 6236) throw new Error(`Reading Units cover ${covered.size} ayat instead of 6,236.`);

  if (getAyah(1, 1)?.arabic !== BASMALAH_ARABIC) throw new Error("Al-Fātiḥah must retain the basmalah as Ayah 1.");
  if (getAyah(9, 1)?.arabic?.startsWith(BASMALAH_ARABIC)) throw new Error("At-Tawbah must not begin with a basmalah.");
  for (const surah of QURAN_DATA) {
    if (surah.number === 1 || surah.number === 9) continue;
    if (surah.ayahs[0]?.arabic?.startsWith(BASMALAH_ARABIC)) {
      throw new Error(`Basmalah is still embedded in Surah ${surah.number}:1.`);
    }
  }

  return Object.freeze({
    surahs: QURAN_DATA.length,
    ayat: ayahTotal,
    readingUnits: QURAN_READING_LIBRARY.units.length,
    firstUnit: QURAN_READING_LIBRARY.units[0].id,
    lastUnit: QURAN_READING_LIBRARY.units.at(-1).id,
    version: QURAN_READING_LIBRARY.version
  });
}

export const QURAN_CANONICAL_STATUS = validateCanonicalQuranData();
