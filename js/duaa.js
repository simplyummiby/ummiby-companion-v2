// Duaa collection content restored from the verified v0.5.5 collection package.
// v2.1.3 keeps the v2.1 storage key and migrates compatible legacy item IDs.
import { collections } from './data/duaa-collections.js';

export const duaaCollections = collections;
export const duaaOrder = ['morning','evening','sleep','travel','weather','prayer','istikharah','food','clothing','anxiety','quranic'];

// Keep the v2.1 storage key so a content restoration does not erase existing
// completion, worship-history, or custom-order records.
const key = 'ummiby.duaa.v2.1';
const emptyState = () => ({ completed:{}, memorized:{}, memorizedCanonical:{}, worship:{}, history:{}, order:{}, reading:{ arabicSize: 2.35, showEnglish: true, showTransliteration: true, mode: 'read' } });

// Consistency is a local-calendar habit record. Never derive its storage key
// from UTC: doing so can shift an Arizona evening into the following day.
function localDateKey(date = new Date()){
  const year=date.getFullYear();
  const month=String(date.getMonth()+1).padStart(2,'0');
  const day=String(date.getDate()).padStart(2,'0');
  return `${year}-${month}-${day}`;
}
function startOfLocalWeek(date = new Date()){
  const start=new Date(date.getFullYear(),date.getMonth(),date.getDate());
  start.setDate(start.getDate()-start.getDay());
  return start;
}

const legacyItemAliases = {
  morning: { protection:'morning-006', contentment:'morning-013' },
  evening: { 'evening-arrived':'evening-003' },
  sleep: { 'right-side':'sleep-002' },
  travel: { ride:'travel-001', journey:'travel-001' },
  weather: { rain:'weather-001', wind:'weather-002', 'after-rain':'weather-004' },
  istikharah: { istikharah:'istikharah-001' }
};

function migrateLegacyItemIds(next){
  for (const [collectionId, aliases] of Object.entries(legacyItemAliases)) {
    const completed = next.completed?.[collectionId];
    if (completed && typeof completed === 'object') {
      for (const [oldId,newId] of Object.entries(aliases)) {
        if (completed[oldId] && completed[newId] === undefined) completed[newId] = true;
      }
    }
    const savedOrder = next.order?.[collectionId];
    if (Array.isArray(savedOrder)) next.order[collectionId] = [...new Set(savedOrder.map(id => aliases[id] || id))];
  }
  return next;
}


function itemFor(collectionId,itemId){
  return collections[collectionId]?.items?.find(item=>item.id===itemId) || null;
}
export function canonicalDuaaId(collectionId,itemId){
  const item=itemFor(collectionId,itemId);
  return item?.canonicalId || `${collectionId}:${itemId}`;
}
function migrateMemorizationToCanonical(next){
  next.memorizedCanonical ||= {};
  for(const [collectionId,items] of Object.entries(next.memorized||{})){
    if(!items || typeof items!=='object') continue;
    for(const [itemId,value] of Object.entries(items)){
      if(value) next.memorizedCanonical[canonicalDuaaId(collectionId,itemId)]=true;
    }
  }
  return next;
}
function uniqueCanonicalIds(){
  return new Set(Object.values(collections).flatMap(collection=>collection.items.map(item=>item.canonicalId || `${collection.id}:${item.id}`)));
}
export function totalUniqueDuaaCount(){ return uniqueCanonicalIds().size; }

function normalizeState(value){
  const next = value && typeof value === 'object' ? value : emptyState();
  next.completed = next.completed && typeof next.completed === 'object' ? next.completed : {};
  next.memorized = next.memorized && typeof next.memorized === 'object' ? next.memorized : {};
  next.memorizedCanonical = next.memorizedCanonical && typeof next.memorizedCanonical === 'object' ? next.memorizedCanonical : {};
  migrateMemorizationToCanonical(next);
  next.worship = next.worship && typeof next.worship === 'object' ? next.worship : {};
  next.history = next.history && typeof next.history === 'object' ? next.history : {};
  next.order = next.order && typeof next.order === 'object' ? next.order : {};
  next.reading = next.reading && typeof next.reading === 'object' ? next.reading : {};
  next.reading.arabicSize = Number.isFinite(Number(next.reading.arabicSize)) ? Math.min(3.4, Math.max(1.7, Number(next.reading.arabicSize))) : 2.35;
  next.reading.showEnglish = next.reading.showEnglish !== false;
  next.reading.showTransliteration = next.reading.showTransliteration !== false;
  next.reading.mode = next.reading.mode === 'learn' ? 'learn' : 'read';
  return migrateLegacyItemIds(next);
}

function state(){
  try { return normalizeState(JSON.parse(localStorage.getItem(key))); }
  catch { return emptyState(); }
}
function save(value){
  try {
    localStorage.setItem(key, JSON.stringify(normalizeState(value)));
    return true;
  } catch (error) {
    console.error('Unable to save Duaa state.', error);
    return false;
  }
}

// Used by release QA after restoring collection content. It verifies that item
// IDs are present, unique within their collection, and safe for persisted state.
export function collectionDataAudit(){
  const report = {};
  Object.values(collections).forEach(collection => {
    const ids = collection.items.map(item => item.id);
    const duplicateIds = ids.filter((id,index) => ids.indexOf(id) !== index);
    report[collection.id] = {
      count: collection.items.length,
      missingIds: collection.items.filter(item => !item.id).length,
      duplicateIds: [...new Set(duplicateIds)]
    };
  });
  return report;
}

export function orderedItems(collectionId){
  const c=collections[collectionId];
  if(!c) return [];
  const ids=state().order?.[collectionId];
  if(!Array.isArray(ids) || !ids.length) return [...c.items];
  const byId=new Map(c.items.map(item=>[item.id,item]));
  const ordered=ids.map(id=>byId.get(id)).filter(Boolean);
  c.items.forEach(item=>{ if(!ids.includes(item.id)) ordered.push(item); });
  return ordered;
}
export function setDuaaOrder(collectionId,ids){
  if(!Array.isArray(ids)) return false;
  const valid=new Set((collections[collectionId]?.items||[]).map(item=>item.id));
  const clean=[...new Set(ids.filter(id=>valid.has(id)))];
  if(clean.length!==valid.size) return false;
  const s=state(); s.order ||= {}; s.order[collectionId]=clean; save(s); return true;
}


export function isMemorized(collectionId,itemId){
  const s=state();
  return Boolean(s.memorizedCanonical?.[canonicalDuaaId(collectionId,itemId)]);
}
export function toggleMemorized(collectionId,itemId){
  const s=state();
  s.memorizedCanonical ||= {};
  const canonicalId=canonicalDuaaId(collectionId,itemId);
  s.memorizedCanonical[canonicalId]=!s.memorizedCanonical[canonicalId];
  if(!s.memorizedCanonical[canonicalId]) delete s.memorizedCanonical[canonicalId];
  save(s);
  return Boolean(s.memorizedCanonical[canonicalId]);
}
export function memorizedCount(collectionId){
  const c=collections[collectionId];
  return c ? c.items.filter(item=>isMemorized(collectionId,item.id)).length : 0;
}
export function totalMemorizedCount(){
  const s=state();
  return [...uniqueCanonicalIds()].filter(id=>Boolean(s.memorizedCanonical?.[id])).length;
}

export function isComplete(collectionId,itemId){ return Boolean(state().completed?.[collectionId]?.[itemId]); }
export function toggleComplete(collectionId,itemId){
  const s=state(); s.completed[collectionId] ||= {}; s.completed[collectionId][itemId]=!s.completed[collectionId][itemId];
  if(s.completed[collectionId][itemId]) recordWorship(collectionId,s); else save(s);
  return s.completed[collectionId][itemId];
}
export function recordWorship(collectionId, existing){
  if(!collections[collectionId]?.tracked) return false;
  const s=existing || state();
  const day=localDateKey();
  s.worship[collectionId] ||= {};
  s.worship[collectionId][day]=true;
  return save(s);
}
export function toggleWorshipToday(collectionId){
  if(!collections[collectionId]?.tracked) return false;
  const s=state();
  const day=localDateKey();
  s.worship[collectionId] ||= {};
  if(s.worship[collectionId][day]) delete s.worship[collectionId][day];
  else s.worship[collectionId][day]=true;
  const recorded=Boolean(s.worship[collectionId][day]);
  return save(s) ? recorded : !recorded;
}
export function worshipToday(collectionId){
  return Boolean(state().worship?.[collectionId]?.[localDateKey()]);
}
export function completedCount(collectionId){ const c=collections[collectionId]; return c.items.filter(i=>isComplete(collectionId,i.id)).length; }
export function weekStatus(collectionId){
  const s=state();
  const today=new Date();
  const todayKey=localDateKey(today);
  const sunday=startOfLocalWeek(today);
  return Array.from({length:7},(_,i)=>{
    const date=new Date(sunday.getFullYear(),sunday.getMonth(),sunday.getDate()+i);
    const dayKey=localDateKey(date);
    return {label:['S','M','T','W','T','F','S'][i],date:dayKey,active:Boolean(s.worship?.[collectionId]?.[dayKey]),today:dayKey===todayKey};
  });
}

// Focused QA helper for release checks and future History work.
export function consistencyStorageAudit(){
  const s=state();
  return ['morning','evening','sleep'].reduce((report,collectionId)=>{
    const records=s.worship?.[collectionId] || {};
    report[collectionId]={
      totalDays:Object.keys(records).filter(day=>records[day]).length,
      today:Boolean(records[localDateKey()]),
      week:weekStatus(collectionId)
    };
    return report;
  },{});
}


export function readingPreferences(){
  const r=state().reading;
  return { arabicSize:r.arabicSize, showEnglish:r.showEnglish, showTransliteration:r.showTransliteration, mode:r.mode === 'learn' ? 'learn' : 'read' };
}
export function updateReadingPreferences(changes={}){
  const s=state();
  s.reading ||= {};
  if(changes.arabicSize !== undefined) s.reading.arabicSize=Math.min(3.4,Math.max(1.7,Number(changes.arabicSize)||2.35));
  if(changes.showEnglish !== undefined) s.reading.showEnglish=Boolean(changes.showEnglish);
  if(changes.showTransliteration !== undefined) s.reading.showTransliteration=Boolean(changes.showTransliteration);
  if(changes.mode !== undefined) s.reading.mode=changes.mode === 'learn' ? 'learn' : 'read';
  save(s);
  return readingPreferences();
}
