# Ummiby Companion

**v3.4.1 — Page Epigraph & Navigation Typography Polish**

This patch establishes the centered quotation treatment as the sitewide page-introduction standard and sharpens the module navigation typography. The approved Duaa Home banner and all functional behavior are preserved.

## Duaa Learning Reader and shared knowledge libraries

- Duaa Reading Mode now uses aligned Transliteration, English, and Arabic learning segments.
- Mobile reading stacks Arabic first, followed by English and transliteration.
- Recitation count, virtues, evidence, grades, and source-link readiness are restored.
- Global source and resource libraries can now serve every current and future module.

## Account menu polish

- Replaced the profile pill with a clean circular avatar and chevron.
- Fixed dropdown clipping behind the module navigation.
- Removed the overlapping-avatar appearance and increased menu spacing.
- Added responsive positioning, a polished shadow, and a subtle open animation.
- Renamed the local state to Preview Mode.


## Current version

**v3.4.1 — Page Epigraph & Navigation Typography Polish**

### Changed

- Established a centered English page epigraph with no heading, card, background, or border.
- Added a shared geometric divider that inherits the active module color.
- Improved module-navigation clarity and text rendering without changing routes or layout.

### Preserved

- Approved Duaa Home banner, banner text, Duaa collections and readers, tracking, account controls, authentication, and application services.

## Setup and architecture documents

Start with:

```text
docs/APPLICATION-SERVICES.md
docs/SUPABASE-MILESTONE-1.md
docs/ARCHITECTURE.md
```

## Running locally

Serve the extracted project through a local web server such as VS Code Live Server. ES module imports will not work reliably through a `file://` URL.

## Supabase configuration

Copy `js/config.example.js` to `js/config.js` and add the Supabase project URL and publishable/anon key. Never place a service-role key in browser code.

`js/config.js` remains excluded from source control.

## v2.1.9 Duaa Inline Study Library

- Restored a narrower, calmer width for Duaa Home while preserving the wider collection workspace.
- Added a subtle card treatment to Today's Status.
- Replaced Study Library category navigation with in-page expandable accordion sections.
- Resource links now appear directly beneath their category and still open externally in a new tab.