## 3.26.1
- Added shared local-first sync foundation, offline queue, hydration, device-timezone dates, and migrated Duaa daily tracking.

# Changelog

## v3.25.3 – Al-Mulk Landing Page Alignment

- Rebuilt only the Surah Al-Mulk landing page to match the established Al-Kahf experience style.
- Restored the same spacious editorial hero proportions, copy treatment, primary action, and reading-status line.
- Replaced the custom two-column Al-Mulk section arrangement with the responsive Al-Kahf four-card grid.
- Restyled Current Reading as a supporting experience card instead of a dashboard strip.
- Preserved the full-width Al-Mulk layout without an Al-Kahf calendar or right-side tracking panel.
- Left the Al-Mulk reader unchanged.

## v3.25.3 – Illustrated Surah Al-Mulk Experience

- Added Surah 67 • Al-Mulk to Featured Readings.
- Added a calm, full-width landing page with no calendar, streak, or nightly tracking.
- Added four illustrated reading sections covering Ayat 1–30.
- Integrated Al-Mulk into the shared Qur’an reader with independent saved-position and section-completion state.
- Added Al-Mulk-only Reading Companion resources and closing hadith reminder.
- Preserved Al-Kahf and existing Qur’an journey behavior.

## v3.24.0 – Al-Kahf Experience Landing Page
- Redesigned the Al-Kahf Section Index into the official Friday experience landing page.
- Added a sticky, responsive Experience Panel with integrated Friday calendar, dates, progress, continue reading, reset, external completion, and study access.
- Preserved the existing hero, eight section cards, reader, routing, history store, and Friday streak behavior.

## 3.24.0 — Featured Reading Card System

- Introduced a reusable `featuredReadingCard` Home-page component with configurable artwork, ribbon, category, title, subtitle, action, status, and reference fields.
- Rebuilt the Friday Al-Kahf Home feature with image-only cave artwork and fully accessible HTML overlay text.
- Added dynamic Read, Continue, and Review states from the Friday reading record.
- Added current/upcoming Friday date context in the status panel.
- Established the base styling contract for future special reading cards.

## v3.24.0 — Al-Kahf Reader Final Polish

- Positioned the reader information dialog beside and slightly below its information button on desktop.
- Kept the Section Index control permanently available in the bottom-left corner throughout all eight sections.
- Centered the Previous Section, Mark Section Read, and Next Section controls independently of the Section Index link.
- Enlarged the Reading Companion icons for the virtue, current reading, and study sources.
- Changed the Al-Kahf reading-resource icon to a paper document.
- Added more internal padding to the Friday virtue quotation card while retaining its tightened typography.
- Preserved the horizontal shared-axis slide transition.

## v3.24.0 — Al-Kahf Reader Controls & Study Categories

- Grouped Al-Kahf study resources under Video, Audio, and Reading labels.
- Centered the Previous Section, Mark Section Read, and Next Section control group in the Al-Kahf reader.
- Replaced the empty reader information behavior with a populated, accessible modal.
- Removed the redundant font-settings gear from the Al-Kahf reader while preserving A− and A+ controls.
- Preserved the last viewed Al-Kahf section when returning through the Section Index.
- Kept the existing horizontal shared-axis section transition.

## v3.22.2 — Reading Companion Consistency & Al-Kahf Study Sources

- Widened and repositioned the desktop Reading Companion for better breathing room.
- Tightened line spacing and vertical rhythm inside companion cards, especially the Friday virtue and citation.
- Moved reader text metadata into an information tooltip in the top reader bar.
- Removed Arabic text, English translation, and Friday virtue metadata from Study Sources.
- Added three trusted Surah Al-Kahf resources throughout the Friday experience, Reading Unit Journey passages in Surah 18, and the Navigator Surah 18 reader.

## v3.22.1 — Al-Kahf Reader Polish

- Replaced the reader eyebrow “A New Section” with “Section X of 8” in every Al-Kahf section.
- Tuned the Mūsā and Al-Khiḍr and Closing Reminder banner focal points without increasing banner height.
- Simplified the Al-Kahf Reading Companion to the Friday virtue, Current Reading, and Study Sources.
- Preserved Friday history, streaks, navigation, progress, artwork, featured reading, and routing behavior.

## v3.22.0 — The Illustrated Al-Kahf Experience

- Installed the approved nine-image Al-Kahf illustration collection.
- Added final cave artwork to the Qur’an Home Friday card and Featured Readings Al-Kahf card.
- Added matching artwork to all eight Al-Kahf section cards and reader banners.
- Kept reader banners compact at 230px desktop, 190px tablet, and 160px mobile.
- Optimized all production artwork as WebP assets.

## v3.22.0 — Reader Active Icon Fix

- Corrected filled Phosphor rendering for Saved Ayāt, private notes, and Resume pins.
- Saved stars now fill yellow while retaining a transparent button background.
- Increased the in-reader surah:ayah reference size.

## v3.20.0
- Added Phosphor star, note, and map-pin reader controls with compact canonical references.
- Added private per-ayah notes and in-reader My Library access.
- Consolidated duplicate reader action rendering and storage parsing.


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


## v3.22.0 — Featured Readings Foundation

- Built a dedicated Featured Readings index for Surah 18 • Al-Kahf, Surah 32 • As-Sajdah, and Surah 67 • Al-Mulk.
- Added concise Sunnah timing and evidence references to each card.
- Connected Al-Kahf to the existing Friday reading experience.
- Left As-Sajdah and Al-Mulk clearly marked as upcoming reader experiences.
- Added responsive three-, two-, and one-column card layouts.
