# Build Report — v3.26.1

## Scope
Established a reusable site-wide local-first synchronization foundation and migrated tracked Duaa collections as the first consumer.

## Added
- Shared automatic device-timezone date service (`js/time.js`).
- Shared offline queue, hydration, retry, user binding, and last-sync metadata (`js/sync.js`).
- Supabase `app_sync_records` migration with per-user RLS (`supabase/002_site_sync_foundation.sql`).
- Online retry and initial-device hydration after authentication.

## Duaa migration
- Morning, Evening, and Before Sleep item checks are now keyed by local calendar date.
- A new local day presents fresh unchecked items automatically.
- Prior worship/history records remain intact.
- Legacy current-state checks migrate only when a matching record exists for today, preventing stale completion from rolling forward.
- Changes are saved locally immediately and queued for Supabase.

## Conflict policy
The current foundation uses record-level last-write synchronization. Duaa hydration preserves local and remote history maps and daily maps. More granular module adapters can add domain-specific merge rules as each module migrates.

## Required database step
Run `supabase/002_site_sync_foundation.sql` in the Supabase SQL editor before expecting cross-device synchronization. Local-first behavior and daily resets work even before that SQL is applied.
