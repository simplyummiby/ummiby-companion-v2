# Ummiby Companion

**v3.1.0 — Application Services Foundation**

This infrastructure release establishes one clean startup and service boundary for Supabase, authentication, profile identity, and account preferences while preserving the existing visible application and module behavior.

## Current version

**v3.1.0 — Application Services Foundation**

### Added

- One centralized Supabase client in `js/supabase.js`.
- Dedicated authentication, identity, and preferences service responsibilities.
- A deterministic application startup pipeline: Initialize Supabase → Restore Session → Load Profile → Load Preferences → Initialize Identity → Render Application.
- Shared auth-state handling that reuses the same application-context loading path.
- Permanent service-architecture documentation in `docs/APPLICATION-SERVICES.md`.

### Refactored

- Removed Supabase client creation and configuration loading from `js/auth.js`.
- Connected the v3.0.0 profile identity foundation to real application startup.
- Centralized `app_preferences` loading instead of leaving it for feature code to duplicate later.
- Preserved fail-soft profile and preference loading so temporary data-query failures do not destroy the authenticated shell.

### Preserved

- Email/password sign-in, account creation, password reset, sign-out, and persistent sessions.
- The unconfigured local-development fallback when `js/config.js` is absent.
- Existing Qur’an, Duaa, Ramadan, shell, route, and local-storage behavior.
- The vanilla HTML, CSS, JavaScript, and Supabase stack with no framework conversion.

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