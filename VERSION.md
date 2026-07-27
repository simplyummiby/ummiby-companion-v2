# Ummiby Companion v3.12.0

**Release:** Canonical Qur’an Integration QA & Regression Protection — Phase 4

- Completed the canonical Qur’an integration audit across 114 surahs, 6,236 ayat, and 294 Reading Units.
- Confirmed exact one-time Reading Unit coverage with no gaps, overlaps, or invalid endpoints.
- Added `tools/validate-release.mjs` for repeatable release validation.
- Verified entry assets, ES module imports, JavaScript syntax, and packaged source integrity.
- Corrected Qur’an reading-day and activity date keys to use the user’s local calendar date rather than UTC.
- Preserved the Phase 1–3 canonical data, reader, progress, navigation, index, and history behavior.
