# Ummiby Companion v3.25.3 – Qur’an Navigation Regression Fix

## Scope

This patch fixes the Qur’an module navigation regression introduced during the v3.25.2 Al-Mulk landing-page alignment.

## Root Cause

The previous landing-page patch accidentally removed the shared Al-Kahf state and calendar helper functions from `js/shell.js`. Qur’an Home still called those functions while building its featured Al-Kahf card, causing a JavaScript render exception. Because the new Qur’an shell did not finish rendering, stale Duaa navigation could remain visible and receive later clicks.

## Changes

- Restored `kahfFridayKey()`.
- Restored `kahfRecords()`.
- Restored `kahfActive()`.
- Restored `kahfStatusFor()`.
- Restored `kahfHijriDate()`.
- Restored `kahfCalendar()`.
- Restored `kahfStreaks()`.
- Preserved the Al-Mulk landing page and reader from v3.25.2.
- Updated JavaScript cache-busting references to v3.25.3.
- Updated release metadata to v3.25.3.

## Validation

Confirmed successful shell rendering for:

- Qur’an Home
- Reading Journeys
- Qur’an Navigator
- Saved Ayāt
- Featured Readings
- Memorization
- Reading History
- Qur’an Settings
- Surah Al-Mulk landing page

Confirmed that each route renders Qur’an navigation and does not leak Duaa navigation.

Confirmed JavaScript syntax for `js/app.js` and `js/shell.js`.
