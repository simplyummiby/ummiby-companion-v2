// Shared timezone/date service. The browser supplies the current device timezone.
export function deviceTimeZone(){
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}
export function localDateKey(date = new Date(), timeZone = deviceTimeZone()){
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
export function dateContext(date = new Date()){
  return { localDate:localDateKey(date), timeZone:deviceTimeZone(), capturedAt:date.toISOString() };
}
