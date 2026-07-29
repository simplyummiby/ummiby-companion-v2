import { QURAN_CANONICAL_STATUS } from "./data/quran-canonical.js?v=3.25.3";
import { renderShell, saveActiveJourney } from "./shell.js?v=3.25.3";
import { toggleComplete, toggleMemorized, toggleWorshipToday, setDuaaOrder, updateReadingPreferences, readingPreferences } from "./duaa.js?v=3.25.3";
import {
  onAuthStateChange,
  restoreSession,
  sendPasswordReset,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./auth.js?v=3.25.3";
import { initializeSupabase, getSupabaseClient } from "./supabase.js?v=3.25.3";
import { clearIdentity, getIdentity, initializeIdentity, loadProfile } from "./identity.js?v=3.25.3";
import { clearPreferences, loadPreferences } from "./preferences.js?v=3.25.3";

const app = document.querySelector("#app");
console.info("Canonical Qur’an data verified", QURAN_CANONICAL_STATUS);
const toastRegion = document.querySelector("#toast-region");
let currentUser = null;
let configured = false;
const nowForHistory = new Date();
let historyView = { collectionId:'morning', year:nowForHistory.getFullYear(), month:nowForHistory.getMonth() };

const collectionFilterKey = (collectionId) => `ummiby.collectionFilters.${collectionId}`;
const collectionScrollKey = (collectionId) => `ummiby.collectionScroll.${collectionId}`;
const collectionReadingSequenceKey = (collectionId) => `ummiby.collectionReadingSequence.${collectionId}`;
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function readCollectionFilterState(collectionId) {
  try {
    const value = JSON.parse(sessionStorage.getItem(collectionFilterKey(collectionId)) || '{}');
    return { speakers: new Set(value.speakers || []), purposes: new Set(value.purposes || []) };
  } catch { return { speakers: new Set(), purposes: new Set() }; }
}
function saveCollectionFilterState(collectionId, state) {
  sessionStorage.setItem(collectionFilterKey(collectionId), JSON.stringify({ speakers:[...state.speakers], purposes:[...state.purposes] }));
}

function normalizedPath() {
  const hashRoute = window.location.hash.replace(/^#/, "");
  if (!hashRoute || hashRoute === "/") return "/home";

  const route = hashRoute.startsWith("/") ? hashRoute : `/${hashRoute}`;
  return route.length > 1 ? route.replace(/\/+$/, "") : route;
}

function prepareRouteLinks() {
  app.querySelectorAll("[data-route]").forEach((link) => {
    const route = link.getAttribute("href") || "/home";
    link.dataset.appRoute = route;
    link.setAttribute("href", `#${route}`);
  });
}

function toast(message, type = "info") {
  const item = document.createElement("div");
  item.className = `toast${type === "error" ? " is-error" : ""}`;
  item.textContent = message;
  toastRegion.append(item);
  window.setTimeout(() => item.remove(), 1800);
}

function render() {
  const pathname = normalizedPath();
  app.innerHTML = renderShell({ pathname, user: currentUser, identity: getIdentity(), configured, historyView });
  prepareRouteLinks();
  bindShellEvents();
}

function navigate(route) {
  if (normalizedPath() === route) return;
  window.location.hash = route;
}

function recordQuranReading(source='inside') {
  const key = localDateKey();
  let records = {};
  try { records = JSON.parse(localStorage.getItem('ummiby.quran.readingDays') || '{}'); } catch {}
  records[key] = source;
  localStorage.setItem('ummiby.quran.readingDays', JSON.stringify(records));
}

function recordReadingUnitActivity(type, unitOrder, details = {}) {
  const order = Number(unitOrder);
  if (!Number.isInteger(order) || order < 1 || order > QURAN_CANONICAL_STATUS.readingUnits) return;
  let entries = [];
  try { entries = JSON.parse(localStorage.getItem('ummiby.quran.readingUnit.history') || '[]'); } catch {}
  const now = new Date();
  const dateKey = localDateKey(now);
  if (type === 'opened' && entries.some(entry => entry.type === 'opened' && entry.unitOrder === order && entry.dateKey === dateKey)) return;
  entries.unshift({ id: `${now.getTime()}-${type}-${order}`, type, unitOrder: order, dateKey, at: now.toISOString(), ...details });
  localStorage.setItem('ummiby.quran.readingUnit.history', JSON.stringify(entries.slice(0, 250)));
}

function bindShellEvents() {
  let namesFilter='all';
  const applyNamesFilters=()=>{const query=(app.querySelector('[data-names-search]')?.value||'').trim().toLowerCase();const cards=[...app.querySelectorAll('[data-name-card]')];let visible=0;cards.forEach(card=>{const matchesText=!query||card.dataset.nameSearch.includes(query);const matchesSource=namesFilter==='all'||card.dataset.nameSource===namesFilter;card.hidden=!(matchesText&&matchesSource);if(!card.hidden)visible+=1});const output=app.querySelector('[data-names-results]');if(output)output.textContent=`${visible} ${visible===1?'Name':'Names'} shown`;const empty=app.querySelector('[data-names-empty]');if(empty)empty.hidden=visible!==0};
  app.querySelector('[data-names-search]')?.addEventListener('input',applyNamesFilters);
  app.querySelectorAll('[data-names-filter]').forEach(button=>button.addEventListener('click',()=>{namesFilter=button.dataset.namesFilter;app.querySelectorAll('[data-names-filter]').forEach(x=>x.classList.toggle('is-active',x===button));applyNamesFilters()}));
  app.querySelectorAll('[data-name-favorite]').forEach(button=>button.addEventListener('click',()=>{const id=String(button.dataset.nameFavorite);let values=[];try{values=JSON.parse(localStorage.getItem('ummiby.names.favorites')||'[]').map(String)}catch{}values=values.includes(id)?values.filter(x=>x!==id):[...values,id];localStorage.setItem('ummiby.names.favorites',JSON.stringify(values));toast(values.includes(id)?'Name added to favorites.':'Name removed from favorites.');render()}));
  const toggleNameLearned=(id)=>{let values=[];try{values=JSON.parse(localStorage.getItem('ummiby.names.completed')||'[]').map(String)}catch{}values=values.includes(id)?values.filter(x=>x!==id):[...values,id];localStorage.setItem('ummiby.names.completed',JSON.stringify(values));toast(values.includes(id)?'Name marked as learned.':'Learned status removed.');render()};
  app.querySelector('[data-name-complete]')?.addEventListener('click',button=>toggleNameLearned(String(button.dataset.nameComplete)));
  app.querySelectorAll('[data-name-learned]').forEach(button=>button.addEventListener('click',()=>toggleNameLearned(String(button.dataset.nameLearned))));
  app.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const currentPath = normalizedPath();
      const targetRoute = link.dataset.appRoute || "/home";
      if (link.dataset.openSavedAyah) sessionStorage.setItem('ummiby.quran.openSavedAyah', link.dataset.openSavedAyah);
      if (currentPath === '/duaa/quranic' && targetRoute.startsWith('/duaa/quranic/read/')) {
        sessionStorage.setItem(collectionScrollKey('quranic'), String(window.scrollY));
      }
      navigate(targetRoute);
    });
  });

  app.querySelectorAll('[data-history-collection]').forEach(button => {
    button.addEventListener('click', () => {
      historyView = { ...historyView, collectionId:button.dataset.historyCollection };
      render();
    });
  });
  app.querySelectorAll('[data-history-month]').forEach(button => {
    button.addEventListener('click', () => {
      const date=new Date(historyView.year,historyView.month+Number(button.dataset.historyMonth),1);
      historyView={...historyView,year:date.getFullYear(),month:date.getMonth()};
      render();
    });
  });
  app.querySelectorAll('[data-history-year]').forEach(select => {
    select.addEventListener('change', () => {
      const year=Number(select.value);
      if(!Number.isInteger(year)) return;
      historyView={...historyView,year};
      render();
    });
  });


  if (app.querySelector('[data-quran-reading-inside]')) recordQuranReading('inside');

  const saveKahf=(mutator)=>{let active={};try{active=JSON.parse(localStorage.getItem('ummiby.quran.kahfFriday.active')||'{}')}catch{}const friday=(()=>{const d=new Date(),day=d.getDay(),delta=day===5?0:(day===6?-1:-(day+2));d.setDate(d.getDate()+delta);return localDateKey(d)})();if(active.fridayDate!==friday)active={fridayDate:friday,completedSections:[],currentSection:1,savedAyah:0};mutator(active,friday);localStorage.setItem('ummiby.quran.kahfFriday.active',JSON.stringify(active));return {active,friday}};
  const recordKahf=(status)=>{const {friday}=saveKahf(()=>{});let records={};try{records=JSON.parse(localStorage.getItem('ummiby.quran.kahfFriday.records')||'{}')}catch{}records[friday]={...(records[friday]||{}),status,readingMethod:records[friday]?.readingMethod||'ummiby',updatedAt:new Date().toISOString()};localStorage.setItem('ummiby.quran.kahfFriday.records',JSON.stringify(records));recordQuranReading(status==='complete'?'kahf-full':'kahf-partial')};
  const syncKahfRecord=(active)=>{const {friday}=saveKahf(()=>{});let records={};try{records=JSON.parse(localStorage.getItem('ummiby.quran.kahfFriday.records')||'{}')}catch{}const count=(active.completedSections||[]).length;if(!count){delete records[friday]}else{const existing=records[friday]||{},status=existing.readingMethod==='external'&&existing.status==='complete'?'complete':count===8?'complete':'partial';records[friday]={...existing,status,readingMethod:existing.readingMethod||'ummiby',updatedAt:new Date().toISOString()};recordQuranReading(status==='complete'?'kahf-full':'kahf-partial')}localStorage.setItem('ummiby.quran.kahfFriday.records',JSON.stringify(records))};
  app.querySelectorAll('[data-toggle-saved-ayah]').forEach(button=>button.addEventListener('click',()=>{
    const surah=Number(button.dataset.savedSurah),ayah=Number(button.dataset.savedAyah),surahName=button.dataset.savedSurahName||`Surah ${surah}`;
    let records=[];try{records=JSON.parse(localStorage.getItem('ummiby.quran.savedAyat')||'[]')}catch{}if(!Array.isArray(records))records=[];
    const key=`${surah}:${ayah}`,exists=records.some(item=>`${Number(item.surah)}:${Number(item.ayah)}`===key);
    records=exists?records.filter(item=>`${Number(item.surah)}:${Number(item.ayah)}`!==key):[...records,{surah,ayah,surahName,savedAt:new Date().toISOString()}];
    records.sort((a,b)=>Number(a.surah)-Number(b.surah)||Number(a.ayah)-Number(b.ayah));
    localStorage.setItem('ummiby.quran.savedAyat',JSON.stringify(records));
    toast(exists?`${surahName} ${surah}:${ayah} removed from Saved Ayāt.`:`${surahName} ${surah}:${ayah} added to Saved Ayāt.`);
    render();
  }));

  const noteDialog=app.querySelector('[data-ayah-note-dialog]');
  const noteText=noteDialog?.querySelector('[data-ayah-note-text]');
  let activeNoteKey='';
  const readNotes=()=>{try{const value=JSON.parse(localStorage.getItem('ummiby.quran.ayahNotes')||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}};
  const updateNoteCount=()=>{const count=noteText?.value.length||0;const label=noteDialog?.querySelector('[data-ayah-note-count]');if(label)label.textContent=`${count} / 2000`};
  app.querySelectorAll('[data-open-ayah-note]').forEach(button=>button.addEventListener('click',()=>{
    activeNoteKey=`${Number(button.dataset.noteSurah)}:${Number(button.dataset.noteAyah)}`;const record=readNotes()[activeNoteKey];
    if(noteText)noteText.value=record?.text||'';const title=noteDialog?.querySelector('[data-note-dialog-title]');if(title)title.textContent=`Personal Note · ${activeNoteKey}`;
    const edited=noteDialog?.querySelector('[data-ayah-note-edited]');if(edited)edited.textContent=record?.updatedAt?`Last edited ${new Date(record.updatedAt).toLocaleDateString()}`:'';
    const del=noteDialog?.querySelector('[data-delete-ayah-note]');if(del)del.hidden=!record;updateNoteCount();noteDialog?.showModal();noteText?.focus();
  }));
  noteText?.addEventListener('input',updateNoteCount);
  app.querySelectorAll('[data-close-ayah-note]').forEach(button=>button.addEventListener('click',()=>noteDialog?.close()));
  noteDialog?.addEventListener('click',event=>{if(event.target===noteDialog)noteDialog.close()});
  app.querySelector('[data-save-ayah-note]')?.addEventListener('click',()=>{const text=(noteText?.value||'').trim();if(!activeNoteKey)return;const records=readNotes();if(text)records[activeNoteKey]={text,updatedAt:new Date().toISOString()};else delete records[activeNoteKey];localStorage.setItem('ummiby.quran.ayahNotes',JSON.stringify(records));toast(text?'Private note saved.':'Empty note removed.');noteDialog?.close();render()});
  app.querySelector('[data-delete-ayah-note]')?.addEventListener('click',()=>{if(!activeNoteKey)return;const records=readNotes();delete records[activeNoteKey];localStorage.setItem('ummiby.quran.ayahNotes',JSON.stringify(records));toast('Private note deleted.');noteDialog?.close();render()});

  const readerInfoDialog=app.querySelector('[data-reader-info-dialog]');
  app.querySelector('[data-open-reader-info]')?.addEventListener('click',event=>{
    if(!readerInfoDialog)return;
    const trigger=event.currentTarget;
    readerInfoDialog.showModal();
    const rect=trigger.getBoundingClientRect();
    const width=readerInfoDialog.getBoundingClientRect().width||430;
    const left=Math.max(12,Math.min(window.innerWidth-width-12,rect.right-width+18));
    const top=Math.max(12,Math.min(window.innerHeight-readerInfoDialog.offsetHeight-12,rect.bottom+10));
    readerInfoDialog.style.left=`${left}px`;
    readerInfoDialog.style.top=`${top}px`;
  });
  app.querySelectorAll('[data-close-reader-info]').forEach(button=>button.addEventListener('click',()=>readerInfoDialog?.close()));
  readerInfoDialog?.addEventListener('click',event=>{if(event.target===readerInfoDialog)readerInfoDialog.close()});
  app.querySelectorAll('[data-kahf-return-index]').forEach(link=>link.addEventListener('click',()=>{const section=Number(link.dataset.kahfReturnIndex);if(section)saveKahf(active=>{active.currentSection=section;active.lastViewedSection=section;active.lastActivityAt=new Date().toISOString()})}));

  const kahfExternalDialog=app.querySelector('[data-kahf-external-dialog]');
  app.querySelector('[data-open-kahf-external]')?.addEventListener('click',()=>kahfExternalDialog?.showModal());
  app.querySelectorAll('[data-close-kahf-external]').forEach(button=>button.addEventListener('click',()=>kahfExternalDialog?.close()));
  kahfExternalDialog?.addEventListener('click',event=>{if(event.target===kahfExternalDialog)kahfExternalDialog.close()});
  app.querySelector('[data-confirm-kahf-external]')?.addEventListener('click',()=>{const {friday}=saveKahf(()=>{});let records={};try{records=JSON.parse(localStorage.getItem('ummiby.quran.kahfFriday.records')||'{}')}catch{}records[friday]={...(records[friday]||{}),status:'complete',readingMethod:'external',updatedAt:new Date().toISOString()};localStorage.setItem('ummiby.quran.kahfFriday.records',JSON.stringify(records));recordQuranReading('kahf-full');kahfExternalDialog?.close();toast('This Friday’s external Al-Kahf reading was recorded as complete.');render()});
  const kahfPanelDetails=[...app.querySelectorAll('.kahf-index-sidebar .kahf-experience-card')];
  if(window.matchMedia('(max-width: 760px)').matches){kahfPanelDetails.forEach((item,index)=>item.open=index===0);kahfPanelDetails.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)kahfPanelDetails.forEach(other=>{if(other!==item)other.open=false})}))}

  app.querySelectorAll('[data-kahf-record]').forEach(button=>button.addEventListener('click',()=>{recordKahf(button.dataset.kahfRecord);toast(button.dataset.kahfRecord==='complete'?'Al-Kahf marked fully read for this Friday.':'Partial Al-Kahf reading recorded for this Friday.');render()}));
  app.querySelectorAll('[data-kahf-month]').forEach(button=>button.addEventListener('click',()=>{const current=Number(localStorage.getItem('ummiby.quran.kahfFriday.calendarOffset')||0);localStorage.setItem('ummiby.quran.kahfFriday.calendarOffset',String(current+Number(button.dataset.kahfMonth)));render()}));
  app.querySelectorAll('[data-kahf-save-ayah]').forEach(button=>button.addEventListener('click',()=>{const ayah=Number(button.dataset.kahfSaveAyah),section=Number(app.querySelector('[data-kahf-section]')?.dataset.kahfSection||1);saveKahf(active=>{active.currentSection=section;active.savedAyah=ayah;active.lastActivityAt=new Date().toISOString()});recordKahf('partial');toast(`Saved at Surah 18 • Al-Kahf, Ayah ${ayah}.`);render()}));
  app.querySelector('[data-kahf-complete-section]')?.addEventListener('click',button=>{const section=Number(button.dataset.kahfCompleteSection);let removed=false;const {active}=saveKahf(active=>{const completed=new Set(active.completedSections||[]);if(completed.has(section)){completed.delete(section);removed=true;active.currentSection=section}else{completed.add(section);active.currentSection=Math.min(8,section+1);active.savedAyah=0}active.completedSections=[...completed].sort((a,b)=>a-b);active.lastActivityAt=new Date().toISOString()});syncKahfRecord(active);toast(removed?'Section marked unread. You can mark it read again anytime.':active.completedSections.length===8?'Surah Al-Kahf completed this Friday.':'Section marked read.');render()});
  app.querySelector('[data-kahf-reset-friday]')?.addEventListener('click',()=>{const {friday}=saveKahf(active=>{active.completedSections=[];active.currentSection=1;active.savedAyah=0;delete active.completedAt;active.lastActivityAt=new Date().toISOString()});let records={};try{records=JSON.parse(localStorage.getItem('ummiby.quran.kahfFriday.records')||'{}')}catch{}delete records[friday];localStorage.setItem('ummiby.quran.kahfFriday.records',JSON.stringify(records));toast('This Friday’s Al-Kahf progress and calendar status were reset.');render()});
  app.querySelector('[data-kahf-complete-surah]')?.addEventListener('click',()=>{saveKahf(active=>{active.completedSections=[1,2,3,4,5,6,7,8];active.currentSection=8;active.savedAyah=0;active.completedAt=new Date().toISOString()});recordKahf('complete');toast('Surah Al-Kahf completed this Friday.');navigate('/quran/al-kahf-friday')});



  const saveMulk=(mutator)=>{let active={};try{active=JSON.parse(localStorage.getItem('ummiby.quran.mulkFeatured.active')||'{}')}catch{}active={completedSections:[],currentSection:1,savedAyah:0,...active};mutator(active);localStorage.setItem('ummiby.quran.mulkFeatured.active',JSON.stringify(active));return active};
  app.querySelectorAll('[data-mulk-return-index]').forEach(link=>link.addEventListener('click',()=>{const section=Number(link.dataset.mulkReturnIndex);if(section)saveMulk(active=>{active.currentSection=section;active.lastActivityAt=new Date().toISOString()})}));
  app.querySelectorAll('[data-mulk-save-ayah]').forEach(button=>button.addEventListener('click',()=>{const ayah=Number(button.dataset.mulkSaveAyah),section=Number(app.querySelector('[data-mulk-section]')?.dataset.mulkSection||1);saveMulk(active=>{active.currentSection=section;active.savedAyah=ayah;active.lastActivityAt=new Date().toISOString()});toast(`Saved at Surah 67 • Al-Mulk, Ayah ${ayah}.`);render()}));
  app.querySelector('[data-mulk-complete-section]')?.addEventListener('click',button=>{const section=Number(button.dataset.mulkCompleteSection);let removed=false;const active=saveMulk(active=>{const completed=new Set(active.completedSections||[]);if(completed.has(section)){completed.delete(section);removed=true;active.currentSection=section}else{completed.add(section);active.currentSection=Math.min(4,section+1);active.savedAyah=0}active.completedSections=[...completed].sort((a,b)=>a-b);active.lastActivityAt=new Date().toISOString()});toast(removed?'Section marked unread.':active.completedSections.length===4?'Surah Al-Mulk completed.':'Section marked complete.');render()});
  app.querySelector('[data-mulk-complete-surah]')?.addEventListener('click',()=>{saveMulk(active=>{active.completedSections=[1,2,3,4];active.currentSection=4;active.savedAyah=0;active.completedAt=new Date().toISOString()});toast('Surah Al-Mulk completed.');navigate('/quran/al-mulk')});

  app.querySelectorAll('[data-open-active-journey]').forEach(button => {
    button.addEventListener('click', () => app.querySelector(`#make-active-${button.dataset.openActiveJourney}`)?.showModal());
  });
  app.querySelectorAll('[data-confirm-active-journey]').forEach(button => {
    button.addEventListener('click', () => {
      const changed = saveActiveJourney(button.dataset.confirmActiveJourney);
      if (changed) toast(`${button.dataset.confirmActiveJourney === 'classic' ? 'Classic Journey' : 'Reading Unit Journey'} is now your Active Reading Journey.`);
      app.querySelector('[data-active-journey-dialog][open]')?.close();
      render();
    });
  });


  const requestedSavedAyah=sessionStorage.getItem('ummiby.quran.openSavedAyah');
  if(requestedSavedAyah){
    sessionStorage.removeItem('ummiby.quran.openSavedAyah');
    requestAnimationFrame(()=>{const [surah,ayah]=requestedSavedAyah.split(':'),target=document.getElementById(`ayah-${surah}-${ayah}`);if(target){target.scrollIntoView({behavior:'smooth',block:'center'});target.classList.add('is-restored-place');setTimeout(()=>target.classList.remove('is-restored-place'),2200)}});
  }

  const companionDisclosure = app.querySelector('.reader-companion-disclosure');
  if (companionDisclosure) {
    const mobileCompanion = window.matchMedia('(max-width: 980px)').matches;
    companionDisclosure.open = !mobileCompanion;
  }

  const activeReadingUnit = Number(app.querySelector('[data-reading-unit-reader]')?.dataset.readingUnit || 0);
  if (activeReadingUnit) recordReadingUnitActivity('opened', activeReadingUnit);
  const readerScrollBar = app.querySelector('[data-reader-scroll-progress]');
  const readerScrollLabel = app.querySelector('[data-reader-scroll-label]');
  if (readerScrollBar) {
    const updateReaderScrollProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const percent = Math.max(0, Math.min(100, Math.round((window.scrollY / maxScroll) * 100)));
      readerScrollBar.style.width = `${percent}%`;
      readerScrollBar.setAttribute('aria-valuenow', String(percent));
      if (readerScrollLabel) readerScrollLabel.textContent = `${percent}% through this page`;
    };
    updateReaderScrollProgress();
    window.addEventListener('scroll', updateReaderScrollProgress, { passive:true, once:false });
  }
  let selectedResumeAyah = Number(app.querySelector('.reader-ayah.is-saved-place')?.dataset.readerAyah || 0);
  app.querySelectorAll('[data-select-resume-ayah]').forEach(button => {
    button.addEventListener('click', () => {
      selectedResumeAyah = Number(button.dataset.selectResumeAyah);
      app.querySelectorAll('.reader-ayah').forEach(row => row.classList.toggle('is-selected-place', Number(row.dataset.readerAyah) === selectedResumeAyah));
      toast(`Ayah ${selectedResumeAyah} selected. Choose Save My Place when ready.`);
    });
  });
  app.querySelector('[data-save-reading-place]')?.addEventListener('click', () => {
    if (!selectedResumeAyah) { toast('Choose the ayah where you want to resume first.', 'error'); return; }
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(`ummiby.quran.readingUnit.${activeReadingUnit}`) || '{}'); } catch {}
    progress.resumeAyah = selectedResumeAyah;
    progress.updatedAt = new Date().toISOString();
    localStorage.setItem(`ummiby.quran.readingUnit.${activeReadingUnit}`, JSON.stringify(progress));
    localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    recordReadingUnitActivity('saved', activeReadingUnit, { ayah: selectedResumeAyah });
    toast(`Place saved. You’ll resume at Ayah ${selectedResumeAyah}.`);
    render();
  });
  app.querySelector('[data-resume-saved-ayah]')?.addEventListener('click', event => {
    const button = event.currentTarget;
    const target = document.querySelector(`#ayah-${button.dataset.resumeSurah}-${button.dataset.resumeSavedAyah}`);
    if (!target) { toast('Your saved ayah could not be found on this page.', 'error'); return; }
    target.scrollIntoView({ behavior:'smooth', block:'center' });
    target.classList.add('is-restored-place');
    window.setTimeout(() => target.classList.remove('is-restored-place'), 2200);
  });
  app.querySelector('[data-complete-reading-unit]')?.addEventListener('click', button => {
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem(`ummiby.quran.readingUnit.${activeReadingUnit}`) || '{}'); } catch {}
    progress.completed = !progress.completed;
    progress.completedAt = progress.completed ? new Date().toISOString() : null;
    localStorage.setItem(`ummiby.quran.readingUnit.${activeReadingUnit}`, JSON.stringify(progress));
    localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    if(progress.completed && activeReadingUnit < QURAN_CANONICAL_STATUS.readingUnits)localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit + 1));
    else localStorage.setItem('ummiby.quran.readingUnit.current', String(activeReadingUnit));
    recordReadingUnitActivity(progress.completed ? 'completed' : 'reopened', activeReadingUnit);
    toast(progress.completed ? `Reading Unit ${activeReadingUnit} marked complete.` : 'Reading Unit completion removed.');
    render();
  });
  app.querySelectorAll('[data-reader-placeholder]').forEach(control => control.addEventListener('click', event => {
    event.preventDefault();
    toast('This control is ready for the full Qur’an data and navigation phase.');
  }));

  const unitSearch = app.querySelector('[data-unit-search]');
  const unitFilterButtons = [...app.querySelectorAll('[data-unit-filter]')];
  const unitRows = [...app.querySelectorAll('[data-unit-index-row]')];
  const unitGroups = [...app.querySelectorAll('[data-unit-index-group]')];
  let unitFilter = 'all';
  const applyUnitFilters = () => {
    const query = (unitSearch?.value || '').trim().toLowerCase();
    unitRows.forEach(row => {
      const matchesText = !query || row.dataset.unitSearch.includes(query);
      const matchesState = unitFilter === 'all' || row.dataset.unitState === unitFilter;
      row.hidden = !(matchesText && matchesState);
    });
    unitGroups.forEach(group => { group.hidden = !group.querySelector('[data-unit-index-row]:not([hidden])'); });
    const visible = unitRows.filter(row => !row.hidden).length;
    const result = app.querySelector('[data-unit-results]');
    if (result) result.textContent = `${visible} ${visible === 1 ? 'unit' : 'units'} shown`;
  };
  unitSearch?.addEventListener('input', applyUnitFilters);
  unitFilterButtons.forEach(button => button.addEventListener('click', () => {
    unitFilter = button.dataset.unitFilter;
    unitFilterButtons.forEach(item => item.classList.toggle('is-active', item === button));
    applyUnitFilters();
  }));

  app.querySelector('[data-jump-current-unit]')?.addEventListener('click', () => {
    const current = app.querySelector('[data-unit-state="current"]');
    current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    current?.classList.add('is-jump-highlight');
    setTimeout(() => current?.classList.remove('is-jump-highlight'), 1800);
  });
  app.querySelector('[data-jump-current-juz]')?.addEventListener('click', () => {
    app.querySelector('.classic-juz-card.is-current')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  const navigatorSearch = app.querySelector('[data-navigator-search]');
  const navigatorSurahs = [...app.querySelectorAll('[data-navigator-surah]')];
  navigatorSearch?.addEventListener('input', () => {
    const query = navigatorSearch.value.trim().toLowerCase();
    navigatorSurahs.forEach(card => { card.hidden = !!query && !card.dataset.surahSearch.includes(query); });
    const visible = navigatorSurahs.filter(card => !card.hidden).length;
    const result = app.querySelector('[data-navigator-results]');
    if (result) result.textContent = `${visible} ${visible === 1 ? 'surah' : 'surahs'} shown`;
  });

  const startingPointDialog = app.querySelector('[data-reading-starting-point-dialog]');
  app.querySelector('[data-open-reading-starting-point]')?.addEventListener('click', () => startingPointDialog?.showModal());
  app.querySelector('[data-save-reading-starting-point]')?.addEventListener('click', () => {
    const input = app.querySelector('[data-reading-starting-unit]');
    const start = Number(input?.value || 1);
    if (!Number.isInteger(start) || start < 1 || start > 294) { toast('Choose a Reading Unit from 1 to 294.', 'error'); return; }
    const treatment = app.querySelector('input[name="starting-point-treatment"]:checked')?.value || 'complete';
    for (let order = 1; order <= 294; order += 1) {
      let progress = {};
      try { progress = JSON.parse(localStorage.getItem(`ummiby.quran.readingUnit.${order}`) || '{}'); } catch {}
      delete progress.previouslyCovered;
      delete progress.coveredAt;
      if (order < start && treatment === 'complete' && !progress.completed) {
        progress.completed = true;
        progress.completedAt = new Date().toISOString();
      }
      if (Object.keys(progress).length) localStorage.setItem(`ummiby.quran.readingUnit.${order}`, JSON.stringify(progress));
      else localStorage.removeItem(`ummiby.quran.readingUnit.${order}`);
    }
    localStorage.setItem('ummiby.quran.readingUnit.current', String(start));
    localStorage.setItem('ummiby.quran.readingUnit.startingPoint', String(start));
    startingPointDialog?.close();
    toast(treatment === 'complete' ? `Journey continues from Reading Unit ${start}; earlier units are marked complete.` : `Journey now starts at Reading Unit ${start}.`);
    render();
  });

  const resetJourneyDialog = app.querySelector('[data-reading-journey-reset-dialog]');
  app.querySelector('[data-open-reading-journey-reset]')?.addEventListener('click', () => resetJourneyDialog?.showModal());
  app.querySelector('[data-confirm-reading-journey-reset]')?.addEventListener('click', () => {
    const keysToRemove = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && /^ummiby\.quran\.readingUnit\.\d+$/.test(key)) keysToRemove.push(key);
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    localStorage.removeItem('ummiby.quran.readingUnit.current');
    localStorage.removeItem('ummiby.quran.readingUnit.history');
    localStorage.removeItem('ummiby.quran.readingUnit.startingPoint');
    resetJourneyDialog?.close();
    toast('Reading Unit Journey reset. Unit 1 is ready to begin.');
    render();
  });

  app.querySelector('[data-record-quran-today]')?.addEventListener('click', () => {
    const key = localDateKey();
    let records = {};
    try { records = JSON.parse(localStorage.getItem('ummiby.quran.readingDays') || '{}'); } catch {}
    if (records[key]) {
      delete records[key];
      toast("Today's Qur’an reading record removed.");
    } else {
      records[key] = 'manual';
      toast("Today's Qur’an reading recorded.");
    }
    localStorage.setItem('ummiby.quran.readingDays', JSON.stringify(records));
    render();
  });

  app.querySelectorAll("[data-toggle-worship]").forEach((button) => {
    button.addEventListener("click", () => {
      const recorded = toggleWorshipToday(button.dataset.toggleWorship);
      toast(recorded ? "Recorded for today." : "Today's record removed.");
      render();
    });
  });

  app.querySelectorAll("[data-toggle-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collectionId, itemId] = button.dataset.toggleComplete.split(":");
      const complete = toggleComplete(collectionId, itemId);
      toast(complete ? "Duaa marked complete." : "Completion removed.");
      render();
    });
  });

  app.querySelectorAll("[data-toggle-memorized]").forEach((button) => {
    button.addEventListener("click", () => {
      const [collectionId, itemId] = button.dataset.toggleMemorized.split(":");
      const memorized = toggleMemorized(collectionId, itemId);
      toast(memorized ? "Duaa marked memorized." : "Memorized status removed.");
      render();
    });
  });

  const readingDialog = app.querySelector("[data-reading-dialog]");
  app.querySelectorAll("[data-reading-settings]").forEach(button => button.addEventListener("click", () => readingDialog?.showModal()));
  app.querySelectorAll("[data-arabic-size-step]").forEach(button => {
    button.addEventListener("click", () => {
      const current = Number(readingPreferences().arabicSize) || 2.35;
      const next = Math.min(3.4, Math.max(1.7, Math.round((current + Number(button.dataset.arabicSizeStep)) * 10) / 10));
      updateReadingPreferences({ arabicSize: next });
      app.querySelector(".reader-page, .quran-reader")?.style.setProperty("--reader-arabic-size", `${next}rem`);
      if (sizeInput) sizeInput.value = String(next);
      if (sizeOutput) sizeOutput.textContent = `${next.toFixed(1)}rem`;
      toast(`Arabic text size set to ${next.toFixed(1)}rem.`);
    });
  });
  const sizeInput = app.querySelector("[data-reading-size]");
  const sizeOutput = app.querySelector("[data-size-output]");
  sizeInput?.addEventListener("input", () => {
    const size = Number(sizeInput.value);
    if (sizeOutput) sizeOutput.textContent = `${size.toFixed(1)}rem`;
    app.querySelector(".reader-page, .quran-reader")?.style.setProperty("--reader-arabic-size", `${size}rem`);
    updateReadingPreferences({ arabicSize: size });
  });
  app.querySelector("[data-reading-transliteration]")?.addEventListener("change", (event) => {
    updateReadingPreferences({ showTransliteration: event.currentTarget.checked });
    render();
    app.querySelector("[data-reading-dialog]")?.showModal();
  });
  app.querySelector("[data-reading-english]")?.addEventListener("change", (event) => {
    updateReadingPreferences({ showEnglish: event.currentTarget.checked });
    render();
    app.querySelector("[data-reading-dialog]")?.showModal();
  });
  app.querySelectorAll("[data-reading-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      updateReadingPreferences({ mode: button.dataset.readingMode });
      render();
    });
  });

  app.querySelectorAll("[data-collection-filters]").forEach((panel) => {
    const collectionId = panel.dataset.collectionFilters;
    const list = app.querySelector(`[data-collection-list="${collectionId}"]`);
    if (!list) return;
    const state = readCollectionFilterState(collectionId);
    const rows = [...list.querySelectorAll('[data-duaa-row]')];
    const status = panel.querySelector('[data-filter-status]');
    const clear = panel.querySelector('[data-clear-collection-filters]');
    const activeFilters = panel.querySelector('[data-active-filters]');
    const labels = new Map([...panel.querySelectorAll('[data-filter-group]')].map(input => [input.dataset.filterValue, input.nextElementSibling?.textContent || input.dataset.filterValue]));
    const groupState = (group) => group === 'speaker' ? state.speakers : state.purposes;
    const defaultSummary = { speaker:'All prophets and speakers', purpose:'All purposes' };
    const updateSummary = (group, values) => {
      const summary = panel.querySelector(`[data-filter-summary="${group}"]`);
      if (!summary) return;
      if (!values.size) summary.textContent = defaultSummary[group];
      else if (values.size === 1) summary.textContent = labels.get([...values][0]) || '1 selected';
      else summary.textContent = `${values.size} selected`;
    };
    const renderActiveFilters = () => {
      if (!activeFilters) return;
      const selections = [...state.speakers].map(value=>['speaker',value]).concat([...state.purposes].map(value=>['purpose',value]));
      activeFilters.hidden = selections.length === 0;
      activeFilters.innerHTML = selections.map(([group,value]) => `<button type="button" data-remove-filter="${group}:${value}"><span>${labels.get(value) || value}</span><i class="ph ph-x" aria-hidden="true"></i></button>`).join('');
      activeFilters.querySelectorAll('[data-remove-filter]').forEach(button => button.addEventListener('click', () => {
        const [group,value] = button.dataset.removeFilter.split(':');
        groupState(group).delete(value);
        const input = panel.querySelector(`[data-filter-group="${group}"][data-filter-value="${value}"]`);
        if (input) input.checked = false;
        applyFilters();
      }));
    };
    const applyFilters = () => {
      let shown = 0;
      rows.forEach((row) => {
        const speakerMatch = !state.speakers.size || state.speakers.has(row.dataset.speaker);
        const rowPurposes = new Set((row.dataset.purposes || '').split(' ').filter(Boolean));
        const purposeMatch = !state.purposes.size || [...state.purposes].some((purpose) => rowPurposes.has(purpose));
        const visible = speakerMatch && purposeMatch;
        row.hidden = !visible;
        if (visible) shown += 1;
      });
      updateSummary('speaker', state.speakers);
      updateSummary('purpose', state.purposes);
      renderActiveFilters();
      const active = state.speakers.size > 0 || state.purposes.size > 0;
      if (clear) clear.hidden = !active;
      if (status) status.textContent = active ? `Showing ${shown} of ${rows.length} duaas` : `Showing all ${rows.length} duaas`;
      saveCollectionFilterState(collectionId, state);
      const visibleIds = rows.filter(row => !row.hidden).map(row => row.dataset.duaaRow);
      sessionStorage.setItem(collectionReadingSequenceKey(collectionId), JSON.stringify(visibleIds));
    };
    panel.querySelectorAll('[data-filter-group]').forEach((input) => {
      const target = groupState(input.dataset.filterGroup);
      input.checked = target.has(input.dataset.filterValue);
      input.addEventListener('change', () => {
        input.checked ? target.add(input.dataset.filterValue) : target.delete(input.dataset.filterValue);
        applyFilters();
      });
    });
    panel.querySelectorAll('[data-open-filter-dialog]').forEach(button => {
      button.addEventListener('click', () => panel.querySelector(`[data-filter-dialog="${button.dataset.openFilterDialog}"]`)?.showModal());
    });
    panel.querySelectorAll('[data-clear-filter-group]').forEach(button => {
      button.addEventListener('click', () => {
        const group = button.dataset.clearFilterGroup;
        groupState(group).clear();
        panel.querySelectorAll(`[data-filter-group="${group}"]`).forEach(input => { input.checked = false; });
        applyFilters();
      });
    });
    clear?.addEventListener('click', () => {
      state.speakers.clear();
      state.purposes.clear();
      panel.querySelectorAll('[data-filter-group]').forEach((input) => { input.checked = false; });
      applyFilters();
    });
    applyFilters();
    const storedScroll = Number(sessionStorage.getItem(collectionScrollKey(collectionId)) || 0);
    if (storedScroll > 0) requestAnimationFrame(() => window.scrollTo({ top:storedScroll, behavior:'instant' }));
  });

  app.querySelectorAll("[data-collection-list]").forEach((list) => {
    let draggedId = null;
    list.querySelectorAll("[data-duaa-row]").forEach((row) => {
      const handle = row.querySelector("[data-drag-handle]");
      handle?.addEventListener("pointerdown", () => { row.draggable = true; });
      handle?.addEventListener("pointerup", () => { row.draggable = false; });
      row.addEventListener("dragstart", (event) => {
        draggedId = row.dataset.duaaRow;
        row.classList.add("is-dragging");
        event.dataTransfer.effectAllowed = "move";
      });
      row.addEventListener("dragend", () => {
        row.classList.remove("is-dragging");
        row.draggable = false;
        list.querySelectorAll(".is-drag-over").forEach(x => x.classList.remove("is-drag-over"));
      });
      row.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (draggedId && draggedId !== row.dataset.duaaRow) row.classList.add("is-drag-over");
      });
      row.addEventListener("dragleave", () => row.classList.remove("is-drag-over"));
      row.addEventListener("drop", (event) => {
        event.preventDefault();
        row.classList.remove("is-drag-over");
        if (!draggedId || draggedId === row.dataset.duaaRow) return;
        const ids = [...list.querySelectorAll("[data-duaa-row]")].map(x => x.dataset.duaaRow);
        const from = ids.indexOf(draggedId);
        const to = ids.indexOf(row.dataset.duaaRow);
        ids.splice(to, 0, ids.splice(from, 1)[0]);
        if (setDuaaOrder(list.dataset.collectionList, ids)) render();
      });
    });
  });

  const profileButton = app.querySelector("[data-profile-button]");
  const accountMenu = app.querySelector("[data-account-menu]");
  const closeAccountMenu = ({ returnFocus = false } = {}) => {
    if (!accountMenu || !profileButton) return;
    accountMenu.hidden = true;
    profileButton.setAttribute("aria-expanded", "false");
    if (returnFocus) profileButton.focus();
  };
  const openAccountMenu = () => {
    if (!accountMenu || !profileButton) return;
    accountMenu.hidden = false;
    profileButton.setAttribute("aria-expanded", "true");
    accountMenu.querySelector('[role="menuitem"]')?.focus();
  };
  profileButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    accountMenu?.hidden ? openAccountMenu() : closeAccountMenu();
  });
  accountMenu?.addEventListener("click", (event) => event.stopPropagation());
  app.addEventListener("click", () => closeAccountMenu());
  app.querySelectorAll("[data-open-account-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      closeAccountMenu();
      app.querySelector(`#${button.dataset.openAccountDialog}`)?.showModal();
    });
  });
  app.querySelector("[data-request-sign-out]")?.addEventListener("click", () => {
    closeAccountMenu();
    app.querySelector("#sign-out-dialog")?.showModal();
  });
  app.querySelector("[data-confirm-sign-out]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      await signOut();
      app.querySelector("#sign-out-dialog")?.close();
      toast("You have been signed out.");
    } catch (error) {
      button.disabled = false;
      toast(error.message, "error");
    }
  });
  app.querySelectorAll(".account-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
  app.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && accountMenu && !accountMenu.hidden) {
      event.preventDefault();
      closeAccountMenu({ returnFocus: true });
    }
  });
}

function authScreen(mode = "signin") {
  const titles = {
    signin: "Welcome back",
    signup: "Create your account",
    reset: "Reset your password"
  };
  const actions = {
    signin: "Sign in",
    signup: "Create account",
    reset: "Send reset email"
  };
  const passwordField = mode === "reset" ? "" : `
    <div class="form-field">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" minlength="8" required />
    </div>`;

  document.documentElement.dataset.theme = "home";
  app.innerHTML = `
    <main class="auth-screen">
      <section class="auth-intro">
        <div class="brand-mark" aria-hidden="true">U</div>
        <h1>Ummiby<br />Companion</h1>
        <p>A private, personal place for Qur’an reading, duaa, study, memorization, and Ramadan reflection—with your progress available across your devices.</p>
      </section>
      <section class="auth-panel">
        <div class="auth-card">
          <p class="page-kicker">Secure account</p>
          <h2>${titles[mode]}</h2>
          <p class="page-description">Use your email and password. Your browser or Google Password Manager can offer to save the login.</p>
          <form class="form-stack" data-auth-form data-mode="${mode}">
            <div class="form-field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="username" required />
            </div>
            ${passwordField}
            <button class="button button-primary" type="submit">${actions[mode]}</button>
          </form>
          <div class="auth-actions">
            ${mode !== "signin" ? '<button class="button button-link" type="button" data-auth-mode="signin">Sign in instead</button>' : '<button class="button button-link" type="button" data-auth-mode="signup">Create account</button>'}
            ${mode !== "reset" ? '<button class="button button-link" type="button" data-auth-mode="reset">Forgot password?</button>' : ""}
          </div>
        </div>
      </section>
    </main>`;

  app.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => authScreen(button.dataset.authMode));
  });

  app.querySelector("[data-auth-form]").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const submitButton = event.currentTarget.querySelector("button[type='submit']");
    submitButton.disabled = true;

    try {
      if (mode === "signin") await signInWithPassword(email, password);
      if (mode === "signup") {
        await signUpWithPassword(email, password);
        toast("Account created. Check your email if confirmation is enabled.");
      }
      if (mode === "reset") {
        await sendPasswordReset(email);
        toast("Password reset email sent.");
        authScreen("signin");
      }
    } catch (error) {
      toast(error.message, "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

async function loadApplicationContext(user) {
  if (!user) {
    clearIdentity();
    clearPreferences();
    return;
  }

  const client = getSupabaseClient();

  // 3. Load Profile
  const { profile, error: profileError } = await loadProfile(client, user.id);

  // 4. Load Preferences
  const { error: preferencesError } = await loadPreferences(client, user.id);

  // Profile and preference services fail soft so a temporary database issue does
  // not replace the established authenticated application with a blank screen.
  if (profileError) console.warn("Profile could not be loaded.", profileError);
  if (preferencesError) console.warn("Preferences could not be loaded.", preferencesError);

  // 5. Initialize Identity
  initializeIdentity(profile, user);
}

async function handleAuthenticatedUser(user) {
  currentUser = user;
  await loadApplicationContext(user);
  render();
}

async function start() {
  try {
    // 1. Initialize Supabase
    const supabaseState = await initializeSupabase();
    configured = supabaseState.configured;

    if (!configured) {
      // Preserve the existing local-development behavior when config.js is absent.
      render();
      return;
    }

    // 2. Restore Session
    const { user } = await restoreSession();
    currentUser = user;

    // 3. Load Profile
    // 4. Load Preferences
    // 5. Initialize Identity
    if (currentUser) await loadApplicationContext(currentUser);

    onAuthStateChange(async ({ user: changedUser }) => {
      if (changedUser) await handleAuthenticatedUser(changedUser);
      else {
        currentUser = null;
        clearIdentity();
        clearPreferences();
        authScreen("signin");
      }
    });

    // 6. Render Application
    if (currentUser) render();
    else authScreen("signin");
  } catch (error) {
    app.innerHTML = `<div class="boot-screen"><div class="boot-mark">!</div><p>Ummiby Companion could not start.</p></div>`;
    toast(error.message, "error");
  }
}

window.addEventListener("hashchange", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  render();
  window.scrollTo(0, 0);
  document.querySelector("#module-content")?.focus({ preventScroll: true });
});
start();
