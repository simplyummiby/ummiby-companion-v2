# Ummiby Companion v2

A clean rebuild of Ummiby Companion using semantic HTML, modular CSS, native JavaScript modules, and Supabase for authentication and cross-device data storage.

## Current release

**v2.0.0 — App Shell Foundation**

This first release establishes the shared application shell, module registry, routing, theme system, authentication boundary, and database conventions. Feature modules are represented by intentional placeholder views and will be rebuilt one at a time.

## Modules registered from day one

- App Home
- Qur'an
- Duaa
- Names of Allah
- Ramadan
- Settings

## Local setup

1. Clone the repository.
2. Copy `js/config.example.js` to `js/config.js`.
3. Add the Supabase project URL and publishable/anon key to `js/config.js`.
4. Run the project through a local web server such as VS Code Live Server.
5. Open `index.html` through that server.

Never place a Supabase secret or service-role key in this repository or in browser code.

## Documentation

Architecture and project decisions are documented in `/docs`.
