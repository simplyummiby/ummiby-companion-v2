# Duaa Consistency Persistence — v3.6.2

## Storage model

Duaa consistency remains local-first in the existing `ummiby.duaa.v2.1` localStorage record. The release does not require a Supabase migration and does not reset prior Duaa data.

Daily activity is stored independently for:

- Morning
- Evening
- Before Sleep

Each active day is keyed by the user's local calendar date in `YYYY-MM-DD` format. A day becomes active when at least one duaa in a tracked collection is completed or when the user selects **Record Today**.

## Regression checks

- A record created during Arizona evening hours remains on the same local day after reload.
- Morning, Evening, and Before Sleep records remain independent.
- Record Today adds the current local day only for the selected collection.
- Removing Record Today removes only that selected record.
- Existing collection completion and memorization state remain in the same storage object.
- Existing Read/Learn settings and collection ordering remain unchanged.
- No destructive storage migration was introduced.

## Future Supabase work

A later cloud-sync milestone can mirror these local daily records into a user-scoped Supabase table. The History UI can be built against the same local-date record shape first, then synchronized without changing the display model.
