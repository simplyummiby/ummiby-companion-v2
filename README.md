# Ummiby Companion

**v3.4.8 — Duaa Collections Library Refresh**

This release establishes one reusable Page Epigraph system across the Duaa module while preserving collection, reader, tracking, account, banner, and application-service behavior.

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

**v3.4.8 — Duaa Collections Library Refresh**

### Changed

- Standardized Duaa page introductions with one reusable Page Epigraph component.
- Installed the approved quotations and citations across navigation, history, and collection pages.
- Added optional context, detail, multi-line citation, and external-link support without empty spacing.
- Refined navigation-to-epigraph spacing and tightened multi-line quote leading.
- Replaced the detached Morning source icon with one inline source-text link using the Phosphor arrow-square-out icon.
- Added `docs/EPIGRAPH-STANDARD.md`.

### Preserved

- Approved banners and tuning, Duaa collections and readers, tracking, account controls, authentication, and application services.

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