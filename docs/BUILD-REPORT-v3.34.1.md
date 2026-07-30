# Build Report — v3.34.1

## Release
**Reliable Immersive Courtyard Background Hotfix**

## Baseline
Ummiby Companion v3.34.0 — Immersive Courtyard Experience

## Changes
- Replaced the fragile pseudo-element/CSS-variable artwork implementation with a dedicated `.home-background` element.
- Applied each experience artwork directly through the background element's inline `background-image` style.
- Added a separate `.home-background-wash` layer so the fade and readability treatment no longer share the image declaration.
- Preserved the full-page courtyard treatment behind the greeting, activity cards, Prayer Companion, footer, and developer preview.
- Preserved all six experience configurations and preview modes.
- Kept all changes scoped to Dynamic Home.

## Regression Checks
- App startup JavaScript syntax: passed.
- All six Home artwork files are present.
- Dynamic Home no longer uses `--home-bg-image`.
- Dedicated background and wash elements are rendered.
- Qur'an, Duaa, Prayer Companion, Featured Readings, readers, Settings, and other modules were not structurally modified.
- Build report remains in `docs/`.
