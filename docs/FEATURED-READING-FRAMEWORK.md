# Featured Reading Framework

Every Featured Reading submodule must use the same route and layout contracts.

## Routes

- Landing: `/quran/<reading-slug>`
- Reader section: `/quran/<reading-slug>/section/<number>`
- History: `/quran/<reading-slug>/history`

All internal navigation uses `data-route`. Do not add a second click handler for an individual Featured Reading.

## Landing shell

Use these shared structural classes:

- `featured-reading-landing kahf-friday-index` on the page section
- `kahf-landing-hero` for the hero
- `kahf-index-layout` for the two-column shell
- main content first
- `kahf-index-sidebar` second
- `kahf-section-grid` and `kahf-section-card` for sections
- `kahf-experience-card` for sidebar cards (legacy CSS class name only; never display “experience” publicly)

On desktop, the sidebar is sticky and contains the calendar/history card and current-reading card. On narrower layouts, it moves above the section cards.

## Reader shell

Use the shared reader framework and route each section through the central `quranContent()` router. Reader links must remain ordinary `data-route` anchors.

## Per-reading configuration

Only these values should vary: Surah number and name, schedule wording, section count/data, artwork, supporting text/resources, calendar eligibility rules, and storage keys.
