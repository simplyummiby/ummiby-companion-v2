# Build Report — v3.28.5

## Objective

Correct the Featured Reading hero consolidation so that only the duplicate content-area hero is removed from the three Featured Reading landing pages, while all other artwork and layouts remain intact.

## Verified and preserved

- Featured Readings home page retains all three card images and its existing card layout and spacing.
- Surah Al-Kahf reader retains all eight section illustrations.
- Surah Al-Mulk reader retains all four section illustrations.
- Surah As-Sajdah reader retains all four section illustrations.
- Section cards, sidebars, calendars, history controls, virtues, resources, navigation, and reader behavior were not changed.

## Landing-page framework

The three landing pages continue to use the same shared structure:

1. Existing global page banner at the unchanged application-wide height.
2. Compact Open Reader action row.
3. Shared section-card grid.
4. Shared sidebar framework.
5. Virtues and Other Featured Readings content.

The former duplicate `.kahf-landing-hero` content-area hero is not present on any of the three landing pages.

## Banner artwork

- Surah 18 • Al-Kahf: `assets/images/quran/al-kahf/friday-hero.webp`
- Surah 67 • Al-Mulk: `assets/images/quran/al-mulk/mulk-hero-image.png`
- Surah 32 • As-Sajdah: `assets/images/quran/as-sajdah/sajdah-hero.png`

All three use the existing global `.module-banner` component without changing its dimensions.

## Version

Application version and cache-busting keys were incremented to `3.28.5`.

## Data and backend

No Supabase schema, migration, or stored-data changes are required.
