# Build Report — v3.28.4

## Objective

Consolidate the visual introduction of all three Featured Reading landing pages by making the shared page banner carry the approved Surah artwork and removing the duplicate content-area hero.

## Changes

- Al-Kahf banner now uses `friday-hero.webp`.
- Al-Mulk banner now uses `mulk-hero-image.png`.
- As-Sajdah banner now uses `sajdah-hero.png`.
- Global banner dimensions were not changed.
- Removed all three `.kahf-landing-hero` blocks from landing-page markup.
- Added a compact shared `.featured-reading-primary-action` row to retain the primary Open Reader action and current completion count.
- Added responsive image positioning and overlays for readable banner text.

## Data and backend

No Supabase schema or data migration changes are required.
