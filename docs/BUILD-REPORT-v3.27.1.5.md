# Build Report — v3.27.1.5

## Scope

Emergency repair of shared Qur’an reader navigation and standardization of Featured Reading landing pages.

## Root causes corrected

1. Al-Mulk section anchors had both the global route listener and a second module-specific listener. After route preparation rewrote the href to a hash, the second listener navigated to an invalid nested hash.
2. A late CSS rule set `.mulk-index-layout` to `display:block`, overriding the same two-column grid used by Al-Kahf and placing the history panel below the main content.

## Changes

- One authoritative route handler for all `data-route` links.
- `stopImmediatePropagation()` prevents accidental secondary navigation handlers.
- Removed the Al-Mulk-specific route listener.
- Added a canonical Featured Reading landing shell shared by Al-Kahf and Al-Mulk.
- Documented the required routes, classes, and extension contract for future Surahs.

## Data / SQL

No database migration required.
