# Build Report — Ummiby Companion v3.29.2

## Scope

Correct two shared defects on the Featured Reading history pages for Surah Al-Kahf, Surah Al-Mulk, and Surah As-Sajdah.

## Corrections

- Fixed the Reset History event handler to read the Surah key from the clicked button correctly.
- Reset History now clears the Surah-specific history store and matching Featured Reading entries in the general Qur’an reading-day store.
- Preserved current section progress when history is reset.
- Added a history-calendar CSS override so Fully Read uses the filled accent marker instead of inheriting the older white-marker rule.
- Confirmed landing-page marker behavior remains unchanged.

## Validation

- JavaScript syntax checks passed.
- Release validator passed 31/31 checks.
- ZIP integrity test passed.
