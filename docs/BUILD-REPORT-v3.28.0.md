# Build Report — v3.28.0

## Scope
- Added Surah As-Sajdah landing page, four-section reader, nightly calendar, and dedicated history route.
- Added the approved hero and four section artworks.
- Added two side-by-side Sunnah quote cards for before-sleep recitation and Friday Fajr.
- Made As-Sajdah available from Featured Readings.
- Standardized equal-height Featured Reading section cards and pinned every Read Section button to the bottom.
- Reused the shared Featured Reading landing, reader, sidebar, calendar, and history patterns.

## Routes
- `/quran/as-sajdah`
- `/quran/as-sajdah/section/1` through `/section/4`
- `/quran/as-sajdah/history`

## Data
- No Supabase migration required.
- Uses existing local-first featured-reading keys and shared Qur’an reading-day tracking.
