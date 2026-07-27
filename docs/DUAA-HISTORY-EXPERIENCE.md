# Duaa History Experience

Version 3.7.0 replaces the earlier three-card weekly history placeholder with a collection-specific monthly history workspace.

## Counting rules

- An active day is any day with at least one recorded duaa.
- Current and longest streaks use active days, honoring the Every Duaa Counts principle.
- A completed day requires every duaa in the selected collection to be completed in that day’s snapshot.
- Completion rate uses only daily records with known completed and total counts. Legacy active-day records are never assigned invented totals.

## Persistence

History remains local-first under `ummiby.duaa.v2.1`. Version 3.7.0 enriches new tracked-day records with completed count, total count, and full-completion status while preserving earlier boolean consistency records. The UI reads through data-service helpers so cloud synchronization can be added later without redesigning the History page.


## v3.7.1 polish

- The History page intentionally omits the standard epigraph to keep its explanatory heading high on the page.
- KPI cards use a constrained compact summary layout.
- The calendar supports direct year selection in addition to month-by-month navigation.


## v3.7.2 Monthly Insights

- Selected-day inspection was removed because the current data does not provide enough detail to make it meaningful.
- The companion panel now interprets the month being viewed with active-day progress, longest monthly streak, most consistent week, most consistent weekday, and a gentle rule-based message.
- The year selector includes one upcoming year, ten prior years, and any additional years represented in saved history.


## v3.7.3 Year and Banner Polish

- History years begin at 2026 and grow forward automatically, always including one upcoming year.
- Earlier years appear only when actual imported history exists.
- The History banner now uses clock and hourglass imagery while keeping all words in the site layer.
- The year-list implementation no longer creates ten arbitrary historical options.

## v3.7.4 layout polish

- The collection selector uses rounded rectangular segmented buttons rather than pill-shaped controls.
- Monthly Record and Monthly Insights share equal height in the desktop two-column layout.
- On tablet and mobile, the cards stack and return to natural content height.
- The History banner uses the existing standardized Duaa banner component and a purpose-cropped panoramic asset.
