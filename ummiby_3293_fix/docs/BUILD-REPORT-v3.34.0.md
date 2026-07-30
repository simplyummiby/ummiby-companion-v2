# Build Report — v3.34.0 Immersive Courtyard Experience

## Scope

Refined the Dynamic Home page only. The six-experience framework and developer preview remain intact.

## Changes

- Promoted each selected courtyard artwork from a hero-only image to the full Dynamic Home page background.
- Continued the artwork behind activity cards, Prayer Companion, footer, navigation, and header.
- Added a subtle vertical atmospheric wash rather than a hard image cutoff.
- Converted activity cards and Prayer Companion to lighter translucent glass panels.
- Increased blur and reduced opaque white backgrounds, border weight, and shadows.
- Raised the activity cards farther into the courtyard so the page reads as one continuous scene.
- Refined the greeting panel to be smaller, lighter, and less visually dominant.
- Preserved the floating developer preview selector.
- Kept all styling scoped under `.dynamic-home-page`.

## Regression checks

- App Home uses the immersive full-page courtyard treatment.
- All six preview modes continue to select their own artwork and content.
- Automatic experience mode remains available.
- Qur’an, Duaa, Prayer, Fasting, Names of Allah, Ramadan, Settings, readers, banners, and shared module layouts were not intentionally modified.
- Dynamic Home CSS remains isolated from shared `.card`, `.hero`, `.page-grid`, and reader selectors.
- Desktop, tablet, and mobile responsive rules remain present.
