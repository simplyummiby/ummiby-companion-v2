import { getSupabaseClient, isSupabaseConfigured } from './supabase.js?v=3.26.1';
import { dateContext } from './time.js?v=3.26.1';

const QUEUE_KEY='ummiby.sync.queue.v1';
const META_KEY='ummiby.sync.meta.v1';
let activeUserId=null;
let flushing=false;
const adapters=new Map();

function jsonRead(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
function jsonWrite(key,value){localStorage.setItem(key,JSON.stringify(value))}
function queue(){const value=jsonRead(QUEUE_KEY,[]);return Array.isArray(value)?value:[]}
function setMeta(patch){jsonWrite(META_KEY,{...jsonRead(META_KEY,{}),...patch})}
export function syncStatus(){return {...jsonRead(META_KEY,{}),queued:queue().length,userId:activeUserId}}
export function registerSyncAdapter(namespace,adapter){adapters.set(namespace,adapter)}
export function setSyncUser(userId){activeUserId=userId||null;setMeta({userId:activeUserId})}
export function enqueueSync(namespace,recordKey,payload,operation='upsert'){
  const context=dateContext();
  const items=queue();
  const item={id:crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`,namespace,recordKey,payload,operation,updatedAt:new Date().toISOString(),...context};
  const previous=items.findIndex(x=>x.namespace===namespace&&x.recordKey===recordKey);
  if(previous>=0)items.splice(previous,1);
  items.push(item);jsonWrite(QUEUE_KEY,items);setMeta({lastLocalChangeAt:item.updatedAt});
  void flushSyncQueue();
  return item;
}
export async function hydrateSyncData(){
  if(!activeUserId||!isSupabaseConfigured()||!navigator.onLine)return {hydrated:false};
  const client=getSupabaseClient();
  const {data,error}=await client.from('app_sync_records').select('namespace,record_key,payload,updated_at').eq('user_id',activeUserId);
  if(error){setMeta({lastError:error.message});return {hydrated:false,error}}
  for(const record of data||[]){
    const adapter=adapters.get(record.namespace);
    if(adapter?.hydrate)await adapter.hydrate(record.record_key,record.payload,{updatedAt:record.updated_at});
  }
  setMeta({lastHydratedAt:new Date().toISOString(),lastError:null});
  return {hydrated:true,count:data?.length||0};
}
export async function flushSyncQueue(){
  if(flushing||!activeUserId||!isSupabaseConfigured()||!navigator.onLine)return {flushed:false};
  flushing=true;
  try{
    const client=getSupabaseClient();let items=queue();let completed=0;
    for(const item of [...items]){
      const row={user_id:activeUserId,namespace:item.namespace,record_key:item.recordKey,payload:item.payload,local_date:item.localDate,time_zone:item.timeZone,client_updated_at:item.updatedAt};
      const {error}=item.operation==='delete'
        ? await client.from('app_sync_records').delete().eq('user_id',activeUserId).eq('namespace',item.namespace).eq('record_key',item.recordKey)
        : await client.from('app_sync_records').upsert(row,{onConflict:'user_id,namespace,record_key'});
      if(error){setMeta({lastError:error.message});break}
      items=items.filter(x=>x.id!==item.id);jsonWrite(QUEUE_KEY,items);completed++;
    }
    if(completed)setMeta({lastSyncedAt:new Date().toISOString(),lastError:null});
    return {flushed:true,count:completed};
  } finally {flushing=false}
}
window.addEventListener('online',()=>void flushSyncQueue());
