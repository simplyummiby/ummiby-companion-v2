const STORAGE_KEY = 'ummiby.prayer.settings.v1';
const TRACKER_KEY = 'ummiby.prayer.tracker.v1';
const ADHAN_URL = 'https://unpkg.com/adhan/lib/bundles/adhan.esm.js';

export const DEFAULT_PRAYER_SETTINGS = Object.freeze({
  locationMode: 'auto',
  latitude: null,
  longitude: null,
  locationLabel: 'Automatic location',
  calculationMethod: 'UmmAlQura',
  madhab: 'Hanafi',
  timeFormat: '12h'
});

export const CALCULATION_METHODS = Object.freeze([
  ['UmmAlQura', 'Umm al-Qura University, Makkah'],
  ['MuslimWorldLeague', 'Muslim World League'],
  ['NorthAmerica', 'ISNA / North America'],
  ['Egyptian', 'Egyptian General Authority of Survey'],
  ['Karachi', 'University of Islamic Sciences, Karachi'],
  ['Dubai', 'Dubai'],
  ['Kuwait', 'Kuwait'],
  ['Qatar', 'Qatar'],
  ['Singapore', 'Singapore'],
  ['MoonsightingCommittee', 'Moonsighting Committee']
]);

let adhanPromise;
function loadAdhan() {
  if (!adhanPromise) adhanPromise = import(ADHAN_URL);
  return adhanPromise;
}

export function getPrayerSettings() {
  try {
    return { ...DEFAULT_PRAYER_SETTINGS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_PRAYER_SETTINGS };
  }
}

export function savePrayerSettings(changes = {}) {
  const next = { ...getPrayerSettings(), ...changes };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function requestAutomaticLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Automatic location is not supported by this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = Number(position.coords.latitude.toFixed(6));
        const longitude = Number(position.coords.longitude.toFixed(6));
        const settings = savePrayerSettings({
          locationMode: 'auto', latitude, longitude,
          locationLabel: `Current location · ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
        });
        resolve(settings);
      },
      error => reject(new Error(error.message || 'Location permission was not granted.')),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30 * 60 * 1000 }
    );
  });
}

function methodParameters(adhan, methodName) {
  const factory = adhan.CalculationMethod[methodName] || adhan.CalculationMethod.UmmAlQura;
  return factory();
}

export async function calculatePrayerTimes(date = new Date(), settings = getPrayerSettings()) {
  if (!Number.isFinite(settings.latitude) || !Number.isFinite(settings.longitude)) {
    throw new Error('Location is needed before prayer times can be calculated.');
  }
  const adhan = await loadAdhan();
  const coordinates = new adhan.Coordinates(settings.latitude, settings.longitude);
  const params = methodParameters(adhan, settings.calculationMethod);
  params.madhab = settings.madhab === 'Hanafi' ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;
  const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha
  };
}

export function formatPrayerTime(value, settings = getPrayerSettings()) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: settings.timeFormat !== '24h'
  }).format(value);
}

export function getNextPrayer(times, now = new Date()) {
  const ordered = [['Fajr', times.fajr], ['Dhuhr', times.dhuhr], ['Asr', times.asr], ['Maghrib', times.maghrib], ['Isha', times.isha]];
  return ordered.find(([, time]) => time > now) || null;
}

export function getDayPhase(times, now = new Date()) {
  if (now < times.fajr) return 'late-night';
  if (now < times.sunrise) return 'early-morning';
  if (now < times.dhuhr) return 'morning';
  if (now < times.asr) return 'afternoon';
  if (now < times.maghrib) return 'golden-hour';
  if (now < times.isha) return 'evening';
  return 'late-night';
}


export const TRACKED_PRAYERS = Object.freeze(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']);

export function prayerDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPrayerTracker(date = new Date()) {
  let records = {};
  try { records = JSON.parse(localStorage.getItem(TRACKER_KEY) || '{}'); } catch {}
  const key = prayerDateKey(date);
  const day = records[key] && typeof records[key] === 'object' ? records[key] : {};
  return TRACKED_PRAYERS.reduce((result, prayer) => {
    result[prayer] = Boolean(day[prayer]);
    return result;
  }, {});
}

export function togglePrayerTracked(prayer, date = new Date()) {
  if (!TRACKED_PRAYERS.includes(prayer)) return getPrayerTracker(date);
  let records = {};
  try { records = JSON.parse(localStorage.getItem(TRACKER_KEY) || '{}'); } catch {}
  const key = prayerDateKey(date);
  const current = records[key] && typeof records[key] === 'object' ? records[key] : {};
  records[key] = { ...current, [prayer]: !Boolean(current[prayer]) };
  localStorage.setItem(TRACKER_KEY, JSON.stringify(records));
  return getPrayerTracker(date);
}

export function prayerTrackerCount(date = new Date()) {
  return Object.values(getPrayerTracker(date)).filter(Boolean).length;
}
