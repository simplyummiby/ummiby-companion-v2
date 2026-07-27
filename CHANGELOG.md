# Changelog

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
