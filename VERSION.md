# Version

**Current version:** 3.4.10  
**Release name:** Static Hosting Route Reliability  
**Release date:** 2026-07-26

## Scope

This reliability release fixes direct refresh and bookmarked-route failures across the entire application when served by VS Code Live Server or another static host.

## Changes

- Replaced clean-path `history.pushState` routing with static-host-safe hash routing.
- All application routes now use URLs such as `/#/duaa/collections`, so the browser always requests the real root `index.html`.
- Applied the fix centrally to Duaa, Qur’an, Ramadan, readers, history pages, collection pages, and future `data-route` links.
- Converted rendered internal links to hash URLs so opening a route in a new tab also remains safe.
- Preserved browser Back and Forward navigation through the `hashchange` event.
- Updated password-reset redirects to return to the application root rather than a client-only nested route.
- Preserved application state, page rendering, module navigation, collection artwork, and existing functionality.
- Updated cache and release references to 3.4.10.

## Local testing

Open the root `index.html` through Live Server. Nested pages may now be refreshed, bookmarked, copied, or opened in a new tab without producing `Cannot GET /...`.
