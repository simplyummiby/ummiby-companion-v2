# Build Report — Ummiby Companion v3.27.1

## Scope
Shared History Framework and Qur’an Calendar History.

## Implemented
- Duaa-style monthly Qur’an calendar.
- Editable today and past dates.
- Future dates disabled.
- Manual add/remove from the same `ummiby.quran.readingDays` record used by home and sync.
- Current streak, longest streak, monthly consistency, and reading-day totals.
- Reading Unit Journey activity retained below the calendar.

## Sync
No new SQL migration. The existing Qur’an sync adapter already syncs `ummiby.quran.readingDays`.
