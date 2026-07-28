# v3.19.0

- Added Saved Ayāt with heart toggles, canonical ordering, an external collection page, and in-reader access.
- Replaced reading-place bookmark icons with pins while retaining the Resume label.

# Changelog

## v3.16.0 – Qur’an Reading Position & Journey Starting Point

- Fixed **Go to saved spot** in Reading Unit mode and added a temporary restored-location highlight.
- Changed the reader header bar into a live page-scroll gauge.
- Moved and shortened save confirmations so they do not cover **Save My Place**.
- Added **Set Starting Point** for readers joining midway through a Qur’an journey.
- Added a distinct **Covered before Ummiby** state, separate from completions recorded in Ummiby.
- Split overall journey position from completed-in-Ummiby totals.
- Updated release numbering to v3.16.0.


## 3.16.0 — Learned Names Page

- Added **Learned** to the Names of Allah module navigation.
- Added the dedicated **My Learned Names** page.
- Mirrored the Duaa memorization-card concept: each Name fills with the module's lapis color when marked learned.
- Added learned, remaining, and percentage summaries plus a full-collection progress bar.
- Reused the existing Names learning status so the detail page, journey, review page, and learned-card page remain synchronized.


## 3.16.0 — Learned Names Page

- Added **Learned** to the Names of Allah module navigation.
- Added the dedicated **My Learned Names** page.
- Mirrored the Duaa memorization-card concept: each Name fills with the module's lapis color when marked learned.
- Added learned, remaining, and percentage summaries plus a full-collection progress bar.
- Reused the existing Names learning status so the detail page, journey, review page, and learned-card page remain synchronized.


## 3.16.0 — Names of Allah Companion Foundation
- Added all 99 Names from the specified Shaykh Ibn al-'Uthaymeen/Dawud Burbank source.
- Added Home, Explore, Learn, Review, Favorites, About, and individual Name routes.
- Added search, Qur’an/Sunnah filters, favorites, and studied-state persistence.
- Added deep-lapis visual identity and complete responsive styling.
- Preserved Prayer Companion v3.13.0 and all existing modules.

# Changelog

## v3.13.0 — Prayer Companion Foundation
- Added the complete Prayer Companion module shell, navigation, routing, ancient-gold visual identity, responsive home, prayer-time placeholder panel, and standardized banner.
- Added five daily prayer indexes and detail frameworks, Sunnah and voluntary prayer pages, sequential prayer lessons, Wudu Companion, Prayer Duaa Library shells, Prayer Knowledge, settings/calendar placeholders, and progress dashboard.
- Preserved canonical Duaa data boundaries and prepared native Prayer Read/Learn architecture without duplicating records or implementing premature tracking.
- Preserved existing Qur’an, Duaa, Ramadan, reader, journey, settings, and routing behavior.


## v3.12.1 — Reader Display Controls & Journey Reset

- Added visible Arabic text size decrease/increase controls to Qur’an reader headers.
- Retained the detailed Arabic-size slider in Reading Preferences.
- Added a guarded Reset Reading Journey action to the Reading Unit Index.
- Reset clears all Reading Unit completions, saved places, current position, and unit activity history.
- Reset preserves general Qur’an reading-day records and display preferences.

# v3.12.0 — Canonical Qur’an Integration QA & Regression Protection (Phase 4)

## Validated

- 114 surahs load in canonical order.
- 6,236 ayat load with Arabic and Hilali–Khan translation text.
- 294 Reading Units load in sequence from P0001 through P0294.
- Every Reading Unit endpoint is valid for its surah.
- Every ayah belongs to exactly one Reading Unit.
- No Reading Unit gaps or overlaps were detected.
- Entry CSS and JavaScript assets exist.
- ES module imports resolve to packaged files.
- All JavaScript and validator files pass Node syntax checks.

## Corrected

- Qur’an reading-day records now use the local calendar date instead of a UTC-derived date.
- Reading Unit activity de-duplication now uses the local calendar date.
- Weekly consistency rendering now compares local dates consistently.

## Added

- `tools/validate-release.mjs` for repeatable canonical-data and release-integrity checks.
- `docs/QURAN-PHASE-4-QA-REPORT.md` with the completed audit and known scope boundaries.

## Preserved

- Canonical Arabic and Hilali–Khan data.
- All 294 frozen Reading Unit boundaries.
- Dynamic reader navigation and per-unit saved places.
- Completion, Continue Reading, Unit Index, filters, and Reading History behavior.
- Existing Duaa, Ramadan, app-shell, authentication, preferences, and Supabase foundation.

## v3.16.1 — Qur’an Reading Experience Refinement
- Simplified the Reading Companion metadata into a resume-focused Current Reading card.
- Standardized full Surah references across reader and journey UI.
- Standardized About this Reading Unit presentation and updated Fuṣṣilat 41:1–29.


## v3.17.1 — Qur’an Basmalah Placement Correction
- Retained the basmalah as Ayah 1 only in Surah 1 • Al-Fātiḥah.
- Displayed the basmalah separately above Ayah 1 for every other surah except Surah 9 • At-Tawbah.
- Removed the embedded basmalah from the Arabic text of Ayah 1 in Surahs 2–8 and 10–114 without changing canonical ayah numbering.
- Added canonical validation checks to prevent basmalah placement regressions.

## v3.18.0 — Qur’an Journey Indexes & Navigator

- Replaced the Reading Unit Journey’s long surah-grouped list with a dense, responsive 294-tile journey grid.
- Added All, Current, Completed, and Remaining filters, search, and Jump to Current Unit behavior.
- Redesigned the journey overview around the current unit, completion total, and direct continuation.
- Replaced “Completed in Ummiby” and “Covered before Ummiby” with one completion state.
- Updated starting-point setup so earlier units can either be marked complete or left incomplete.
- Added a Juz-based Classic Journey index.
- Expanded the Qur’an Navigator into a searchable 114-surah tile grid.
