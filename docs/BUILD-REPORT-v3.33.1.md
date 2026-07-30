# Ummiby Companion v3.33.1 — Dynamic Home Artwork Path Hotfix

## Correction

- Fixed all six Dynamic Home hero images failing to render.
- Moved the hero `background-image` declaration to the Home hero element itself so image URLs resolve relative to the application document rather than the CSS file.
- Preserved the developer preview selector and all six preview modes.
- No shared module or reader layout changes were made.

## Verified

- All six supplied artwork files are present under `assets/home/`.
- Fajr, Morning, Dhuhr, Asr, Maghrib, and Isha configuration entries point to existing files.
- JavaScript syntax checks pass.
- Release validation passes.
