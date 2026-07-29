# Ummiby Companion v3.26.1

**Current release:** Al-Kahf Reader Polish

See `docs/BUILD-REPORT-v3.26.1.md` for release details.

---

## Ummiby Companion

**Current release:** Canonical Qur’an Integration QA & Regression Protection — Phase 4

The canonical Qur’an foundation now includes 114 surahs, 6,236 Arabic ayat with Hilali–Khan translations, and 294 frozen Reading Units. Run `node tools/validate-release.mjs` from the project root to repeat the integrity audit. See `docs/QURAN-PHASE-4-QA-REPORT.md` for full results and scope boundaries.

---

This release refines the Duaa Memorization Map with canonical duaa records. Shared supplications such as Sayyid al-Istighfar now have one memorization status across every collection where they appear, while each collection keeps its own virtue and usage details.

**v3.4.26 — Duaa Collections Card Gallery**

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

**v3.4.19 — Focus Mode Study Resources and Collection Ending**

### Changed

- Replaced refresh-breaking clean client routes with static-host-safe hash routes.
- Applied the fix centrally to Duaa, Qur’an, Ramadan, reading views, history, collections, and future internal `data-route` links.
- Preserved browser Back and Forward navigation.
- Made nested pages safe to refresh, bookmark, copy, and open in a new tab through Live Server.
- Corrected password-reset redirects so they return to the real application entry point.

### Preserved

- Duaa collection artwork, epigraphs, readers, tracking, account controls, authentication, application services, and all existing page content.

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

## v3.4.26 — Duaa Collections Card Gallery

- Registers Prayer and Fasting as top-level global-navigation modules.
- Adds working placeholder pages without enabling unfinished tracking or location services.
- Keeps the focused App Home card set unchanged until the new modules receive full blueprints.

## Duaa Read and Learn Polish (v3.6.2)

- Learn Mode remains selectable for every duaa.
- Duas without segmented learning data display a centered, responsive placeholder with a Return to Read action.
- Existing phrase-by-phrase learning remains unchanged for duas with segmented content.
- Reader navigation, completion, collection exit, settings, and memorization controls use the approved Phosphor icon language.

## Duaa Read and Learn Modes (v3.6.0)

Duaa Reading Mode now offers a calm **Read** view for uninterrupted daily recitation and a segmented **Learn** view for memorization and pronunciation practice. The selected mode is stored with the existing local reading preferences.


## Local preview note

The v3.9.0 entry assets use release-specific cache keys so Live Server does not mix JavaScript modules from older builds. A blank `js/config.js` is included intentionally for local preview mode.


## Canonical Qur’an data
Version 3.9.0 includes the complete Arabic and Hilali–Khan Qur’an dataset plus all 294 canonical Reading Units. The browser validates this foundation at module load through `js/data/quran-canonical.js`. Raw source files are retained in `data/quran/source/`.


## Names of Allah Companion (v3.16.0)
Complete module shell with the Ibn al-'Uthaymeen list, Explore, Learn, Review, Favorites, detail routes, local progress, and explicit source attribution.
