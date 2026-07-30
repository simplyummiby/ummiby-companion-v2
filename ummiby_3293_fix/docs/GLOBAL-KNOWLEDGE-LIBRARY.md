# Global Knowledge Library

Ummiby Companion stores evidence and study resources once, then modules reference them by ID.

## Shared libraries

- `js/data/source-library.js` — Qur’an, hadith, and book citations.
- `js/data/resource-library.js` — lectures, articles, videos, books, and posts.

## Duaa relationships

Each Duaa record includes:

- `segments` for aligned Arabic, English, and transliteration.
- `sourceIds` for wording evidence.
- `virtue.sourceIds` for benefit or virtue evidence.
- `resourceIds` for global study resources.

Source URLs remain blank until verified. The UI supports clickable links immediately when a verified URL is added.
