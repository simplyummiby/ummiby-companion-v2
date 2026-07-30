# Build Report — v3.31.0

## Automatic Location Prayer-Time Foundation

### Implemented
- Shared `js/services/prayer-times.js` service.
- Browser geolocation with explicit user permission.
- Umm al-Qura default calculation method.
- Hanafi default Asr juristic method.
- User-selectable calculation and juristic methods.
- Local persistence under `ummiby.prayer.settings.v1`.
- Working Prayer Settings verification screen.
- Displays Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha.
- Highlights the next obligatory prayer.

### Architecture
The location, calculation method, and juristic method are stored independently. The future App Home, Prayer Companion, Ramadan tools, and notifications can all consume this service without rebuilding the prayer calculation foundation.

### Verification
Prayer times should be compared with the user’s Athan app using the same Umm al-Qura and Hanafi settings before dynamic Home scenery is enabled. Browser geolocation requires HTTPS or localhost.

### Deferred
- Full Prayer Companion content.
- Manual city search and manual coordinate entry.
- Per-prayer minute adjustments.
- Account/Supabase preference sync.
- Home-page prayer card and time-driven atmosphere.
