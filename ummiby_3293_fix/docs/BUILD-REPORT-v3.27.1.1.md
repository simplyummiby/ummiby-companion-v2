# Build Report — Ummiby Companion v3.27.1.1

## Objective
Correct false Qur’an reading-day records caused by opening or rendering a Qur’an reader.

## Changes
- Removed the reader-presence trigger that called `recordQuranReading('inside')`.
- Added an explicit Qur’an reading-day write when a Reading Unit is marked complete.
- Retained manual history editing, the Qur’an Home manual toggle, and explicit Featured Reading completion pathways.
- Added a one-time local migration that removes legacy `inside` values because that source was generated only by the faulty reader-open behavior.
- Updated version and cache-busting references to 3.27.1.1.

## Data Safety
- Manual records and completion records are preserved.
- Saved places, saved ayat, notes, journey progress, and Reading Unit open-history remain unchanged.
- No database migration is required.
