# Duaa History Experience

Version 3.7.0 replaces the earlier three-card weekly history placeholder with a collection-specific monthly history workspace.

## Counting rules

- An active day is any day with at least one recorded duaa.
- Current and longest streaks use active days, honoring the Every Duaa Counts principle.
- A completed day requires every duaa in the selected collection to be completed in that day’s snapshot.
- Completion rate uses only daily records with known completed and total counts. Legacy active-day records are never assigned invented totals.

## Persistence

History remains local-first under `ummiby.duaa.v2.1`. Version 3.7.0 enriches new tracked-day records with completed count, total count, and full-completion status while preserving earlier boolean consistency records. The UI reads through data-service helpers so cloud synchronization can be added later without redesigning the History page.
