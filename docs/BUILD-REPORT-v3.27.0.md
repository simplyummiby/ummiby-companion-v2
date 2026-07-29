# Build Report — Ummiby Companion v3.27.0

## Scope
Extended the shared local-first Supabase sync foundation to the Qur’an module.

## Synced Qur’an data
- Active reading journey and journey state
- Reading Unit current position, starting point, per-unit progress, completion history, and saved ayah
- Daily Qur’an reading activity/history
- Saved ayat
- Private ayah notes
- Friday Al-Kahf active progress and dated records
- Al-Mulk featured-reading progress
- Shared reader preferences continue to sync through the existing preference/Duaa state service

## Behavior
- Existing local Qur’an data is queued once for migration.
- Local writes remain immediate and work offline.
- Queued changes flush after authentication or reconnection.
- Initial-device hydration restores Qur’an state from Supabase.
- Record-level last-write-wins protects independent state areas from overwriting each other.
- Reading-day maps, private notes, saved ayat, and reading history use merge-aware hydration.

## Database
No new SQL migration is required. This release uses `public.app_sync_records` from `002_site_sync_foundation.sql`.
