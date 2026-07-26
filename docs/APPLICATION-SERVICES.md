# Application Services Foundation

## Release

**v3.1.0 — Application Services Foundation**

This release separates application startup responsibilities into small vanilla-JavaScript services. The goal is one authoritative path for Supabase, authentication, profile identity, and account preferences before feature modules add more online data.

## Service responsibilities

### `js/supabase.js`

- Imports the Supabase browser library once.
- Validates `js/config.js`.
- Creates the single shared Supabase client.
- Exposes the client to the remaining services.
- Preserves the unconfigured local-development fallback.

No other application file should call `createClient`.

### `js/auth.js`

- Restores the persisted Supabase Auth session.
- Subscribes to auth-state changes.
- Signs in, signs up, sends password-reset messages, and signs out.
- Does not initialize Supabase or query application profile tables.

### `js/identity.js`

- Loads the signed-in user's `public.profiles` record.
- Converts the profile into a stable application identity.
- Exposes role and active-status helpers.
- Falls back to the authenticated Supabase user if the profile cannot temporarily be loaded, preserving the established signed-in application experience.

### `js/preferences.js`

- Loads the signed-in user's `public.app_preferences` JSON document.
- Holds the account preferences for the current application session.
- Provides a centralized save operation for later settings screens and module services.
- Clears in-memory preferences at sign-out.

Existing Duaa completion, ordering, worship history, and reading display settings remain in their established local-storage record in this release. They are not silently migrated or rewritten.

## Startup pipeline

`js/app.js` now starts the application in this order:

1. Initialize Supabase.
2. Restore Session.
3. Load Profile.
4. Load Preferences.
5. Initialize Identity.
6. Render Application.

Auth-state changes use the same profile, preference, and identity path instead of duplicating startup logic.

## Rules for future services

- Import the Supabase client from `js/supabase.js`; never create another client.
- Keep authentication operations in `js/auth.js`.
- Keep profile and role decisions in `js/identity.js`.
- Keep account-wide preference persistence in `js/preferences.js`.
- Feature-specific data access belongs in a feature service rather than `js/app.js` or rendering files.
- Database failures must have an explicit user-visible or fail-soft behavior appropriate to the feature.
