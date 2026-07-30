import { enqueueSync, registerSyncAdapter } from './sync.js?v=3.27.1';

const META_KEY='ummiby.quran.syncMeta.v1';
const MIGRATION_KEY='ummiby.quran.syncMigration.v1';
const originalSetItem=Storage.prototype.setItem;
const originalRemoveItem=Storage.prototype.removeItem;
let hydrating=false;

const EXACT_KEYS=new Set([
  'ummiby.quran.activeJourney','ummiby.quran.ayahNotes','ummiby.quran.journeys',
  'ummiby.quran.kahfFriday.active','ummiby.quran.kahfFriday.records',
  'ummiby.quran.mulkFeatured.active','ummiby.quran.mulkFeatured.records','ummiby.quran.sajdahFeatured.records','ummiby.quran.readingDays',
  'ummiby.quran.readingUnit.current','ummiby.quran.readingUnit.history',
  'ummiby.quran.readingUnit.startingPoint','ummiby.quran.savedAyat'
]);
function isSyncedKey(key){return EXACT_KEYS.has(key)||/^ummiby\.quran\.readingUnit\.\d+$/.test(key)}
function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
function meta(){const value=readJson(META_KEY,{});return value&&typeof value==='object'?value:{}}
function setMetaFor(key,updatedAt){const next={...meta(),[key]:updatedAt};originalSetItem.call(localStorage,META_KEY,JSON.stringify(next))}
function parseValue(raw,fallback=null){try{return JSON.parse(raw)}catch{return fallback}}
function asTime(value){const n=Date.parse(value||'');return Number.isFinite(n)?n:0}
function mergeMap(local,remote){return {...(local&&typeof local==='object'?local:{}),...(remote&&typeof remote==='object'?remote:{})}}
function mergeNotes(local,remote){
  const out={...local};
  for(const [key,value] of Object.entries(remote||{})){
    if(!out[key]||asTime(value?.updatedAt)>=asTime(out[key]?.updatedAt))out[key]=value;
  }
  return out;
}
function mergeSaved(local,remote){
  const map=new Map();
  for(const item of [...(Array.isArray(local)?local:[]),...(Array.isArray(remote)?remote:[])]){
    const id=String(item?.key||`${item?.surahNumber||item?.surah||''}:${item?.ayahNumber||item?.ayah||''}`);
    const previous=map.get(id);
    if(!previous||asTime(item?.updatedAt)>=asTime(previous?.updatedAt))map.set(id,item);
  }
  return [...map.values()];
}
function mergeForKey(key,localValue,remoteValue){
  if(key==='ummiby.quran.readingDays'||key==='ummiby.quran.ayahNotes')return key.endsWith('ayahNotes')?mergeNotes(localValue,remoteValue):mergeMap(localValue,remoteValue);
  if(key==='ummiby.quran.savedAyat')return mergeSaved(localValue,remoteValue);
  if(key==='ummiby.quran.readingUnit.history'){
    const all=[...(Array.isArray(localValue)?localValue:[]),...(Array.isArray(remoteValue)?remoteValue:[])];
    const seen=new Set();return all.filter(item=>{const id=JSON.stringify([item?.unit,item?.completedAt,item?.date,item?.type]);if(seen.has(id))return false;seen.add(id);return true}).slice(-250);
  }
  return remoteValue;
}
function queueKey(key,raw,operation='upsert',updatedAt=new Date().toISOString()){
  setMetaFor(key,updatedAt);
  enqueueSync('quran',key,{value:raw,clientUpdatedAt:updatedAt},operation);
}
Storage.prototype.setItem=function(key,value){
  originalSetItem.call(this,key,value);
  if(this===localStorage&&!hydrating&&isSyncedKey(String(key)))queueKey(String(key),String(value));
};
Storage.prototype.removeItem=function(key){
  originalRemoveItem.call(this,key);
  if(this===localStorage&&!hydrating&&isSyncedKey(String(key)))queueKey(String(key),null,'delete');
};

registerSyncAdapter('quran',{
  hydrate(recordKey,payload,remoteMeta){
    if(!isSyncedKey(recordKey)||!payload)return;
    const remoteUpdated=payload.clientUpdatedAt||remoteMeta?.updatedAt;
    const localUpdated=meta()[recordKey];
    if(asTime(localUpdated)>asTime(remoteUpdated))return;
    hydrating=true;
    try{
      if(payload.value==null){originalRemoveItem.call(localStorage,recordKey)}
      else{
        const remoteValue=parseValue(payload.value,payload.value);
        const localRaw=localStorage.getItem(recordKey);
        const localValue=localRaw==null?null:parseValue(localRaw,localRaw);
        const merged=mergeForKey(recordKey,localValue,remoteValue);
        originalSetItem.call(localStorage,recordKey,typeof merged==='string'?merged:JSON.stringify(merged));
      }
      setMetaFor(recordKey,remoteUpdated||new Date().toISOString());
    } finally {hydrating=false}
  }
});

export function migrateExistingQuranData(){
  if(localStorage.getItem(MIGRATION_KEY))return {migrated:false};
  let count=0;const now=new Date().toISOString();
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!key||!isSyncedKey(key))continue;
    const value=localStorage.getItem(key);
    if(value!=null){queueKey(key,value,'upsert',now);count++}
  }
  originalSetItem.call(localStorage,MIGRATION_KEY,JSON.stringify({version:1,migratedAt:now,count}));
  return {migrated:true,count};
}

migrateExistingQuranData();
