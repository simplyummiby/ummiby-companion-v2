# Ummiby Companion

**v3.3.0 — Duaa Learning Reader & Global Knowledge Foundation**

This patch fixes the missing profile control in local preview mode. The profile circle and dropdown now remain visibly testable in the shared application banner without Supabase configuration, while authenticated sessions continue to show the real user name, email, profile details, and Sign Out action.


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

**v3.3.0 — Duaa Learning Reader & Global Knowledge Foundation**

### Added

- A profile circle in the upper-right of the application banner, generated from each user’s name or email.
- A responsive account dropdown with My Profile, Preferences, About Ummiby Companion, and Sign Out.
- Read-only profile details using the authenticated Supabase user and loaded profile identity.
- A confirmation dialog before ending the session.
- Keyboard and outside-click behavior for opening and closing the account menu.

### Changed

- Removed the temporary signed-in user strip from module content.
- Made the profile circle the single consistent account access point throughout the application.
- Updated application metadata and visible version references to v3.2.2.

### Preserved

- Existing login, account creation, password reset, persistent session restoration, modules, routes, Duaa records, reading preferences, and local-development behavior.

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