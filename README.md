# Ummiby Companion

**v3.4.2 — Morning Duaa Page Introduction**

This release brings the Morning Duaa page into the official banner and Page Introduction system while preserving all collection, reader, tracking, account, and application-service behavior.

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

**v3.4.2 — Morning Duaa Page Introduction**

### Changed

- Added a dedicated Morning banner using the “Same Place, Different Time of Day” philosophy.
- Applied the official centered Page Introduction Standard to Morning Duaas.
- Added the Ibn Taymiyyah quotation with an icon-only external source link.

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