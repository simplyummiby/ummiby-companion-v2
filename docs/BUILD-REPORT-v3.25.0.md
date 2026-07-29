# BUILD REPORT — Ummiby Companion v3.25.0

## Release

**Ummiby Companion v3.25.0 – Illustrated Surah Al-Mulk Experience**

## Completed Work

- Added Surah 67 • Al-Mulk as an available card under Featured Readings.
- Added a dedicated full-width Al-Mulk landing page without a right panel, calendar, streaks, reading history, or external-reading tracker.
- Added a Current Reading card with independent section and saved-ayah state.
- Added four illustrated sections: Ayat 1–5, 6–15, 16–23, and 24–30.
- Added a shared-framework Al-Mulk reader containing only Surah 67.
- Added Previous, Mark Complete, Next, page-position progress, display controls, saved ayat, notes, and saved-place controls.
- Added independent local-storage namespace: `ummiby.quran.mulkFeatured.active`.
- Added three Al-Mulk-only Reading Companion resources.
- Added the closing “A Blessed Surah” hadith banner.
- Updated app version metadata and cache-busting references to v3.25.0.
- Stored this and prior build reports in `docs/`.

## Validation

- JavaScript syntax validated with `node --check` for `js/shell.js` and `js/app.js`.
- Confirmed all Al-Mulk section routes map only to Surah 67 data.
- Confirmed Al-Mulk state does not use Al-Kahf or journey storage keys.
- Confirmed external resources use `target="_blank"` and `rel="noopener noreferrer"`.
- Confirmed Al-Kahf routes and state handlers remain present.

## Asset Note

The five uploaded image binaries could not be retrieved by the build runtime because the attachment service returned HTTP 403. The project includes correctly named, working image assets copied from existing project artwork so there are no broken paths. Replace the five files in `assets/images/quran/al-mulk/` with the supplied final artwork when attachment access is available.
