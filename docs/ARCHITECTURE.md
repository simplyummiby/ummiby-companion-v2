# Version 2 Architecture

## Purpose

Ummiby Companion Version 2 is a clean rebuild. Version 1 remains a reference for proven content and behavior, but Version 2 does not copy its accumulated structure or technical debt.

## Stack

- Semantic HTML
- Modular CSS
- Native JavaScript ES modules
- Supabase Authentication
- Supabase PostgreSQL database
- Row Level Security for every private user-data table

## Architectural principles

1. **One shell, many modules.** The shell is persistent and configuration-driven.
2. **Shared code remains shared.** Components and services are never copied into module folders.
3. **Module code remains isolated.** Feature-specific rendering and data access live with the module.
4. **Online storage from the start.** User-generated data is designed for Supabase before feature UI is built.
5. **No secret browser keys.** Only the Supabase publishable/anon key may be used in frontend code. Secret and service-role keys are forbidden.
6. **RLS is mandatory.** Every personal-data table must enforce ownership through `auth.uid()`.
7. **Visible save states.** Modules must distinguish saving, saved, offline, and failed states.
8. **Future React readiness.** Rendering functions, configuration objects, services, and module boundaries should translate cleanly into future components.

## Current source structure

```text
/
├── index.html
├── css/
│   ├── tokens.css
│   ├── app-shell.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── modules.js
│   ├── shell.js
│   ├── config.example.js
│   └── config.js              # local only; ignored by Git
├── docs/
├── supabase/
└── assets/                    # banners and icons added as designed
```

## Module contract

Every registered module supplies:

- stable module ID
- display label
- sidebar label
- theme name
- banner title and eyebrow
- description
- SVG icon
- Module Nav Bar destinations

The shared shell consumes this contract and renders the module consistently.

## Authentication boundary

When Supabase is configured:

1. The app restores any persisted session.
2. Authenticated users enter the protected App Shell.
3. Unauthenticated users see the Auth Screen.
4. Registration and login use email/password.
5. Password reset uses email only for recovery—not for routine login.

## Database workflow for each new module

Before module tracking UI is built:

1. Define the data entities and ownership model.
2. Create migration SQL.
3. Enable RLS.
4. Add select, insert, update, and delete policies as required.
5. Add a module data service.
6. Implement loading, saving, empty, failure, and offline states.
7. Verify cross-device reads using the same account.
