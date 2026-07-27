# Qur'an Module Architecture — v3.8.1

## Reading Journeys philosophy

Reading Journeys are the heart of the Qur'an module. They provide structured, resumable paths for reading the Qur'an over time while keeping daily consistency separate from journey completion.

Both Reading Unit Journey and Classic Journey follow the Qur'an in its traditional order. Reading Unit Journey is not thematic or rearranged. The difference between the journeys is how traditional-order reading is organized and where the reader can naturally pause and resume.

## Tracked Reading Journeys

### Reading Unit Journey
- Follows the Qur'an from beginning to end in traditional order.
- Divides the reading into 294 thoughtfully chosen, manageable units.
- Creates natural stopping points and includes unit themes and contextual study resources when available.
- Maintains its own saved position and progress.

### Classic Journey
- Follows the Qur'an from beginning to end in traditional surah order.
- Lets the reader choose any stopping point and resume from the exact ayah.
- Does not require a surah to be completed in one reading session.
- Maintains its own saved position and progress.

## Active Reading Journey

A user may retain progress in both Reading Journeys. The Active Reading Journey only determines which path appears in the Qur'an Home Continue Reading experience. Changing the active designation never removes, combines, or resets either journey's progress.

Journey state is stored under `ummiby.quran.journeys`. The previous `ummiby.quran.activeJourney` value remains supported as a migration fallback and mirror for compatibility.

## Navigation
1. Home
2. Reading Journeys
3. Qur'an Navigator
4. Featured Readings
5. Memorization
6. Reading History
7. Settings

## Untracked reading
- Qur'an Navigator
- Featured Readings
- Ramadan Central reading
- Physical mushaf
- Other reading apps

Untracked reading does not alter Reading Journey position or completion. It only acknowledges that Qur'an was read that day.

## Daily reading record
Reading views inside Ummiby Companion write the current date to `ummiby.quran.readingDays`. The manual home control writes the same date with a manual source marker and is intended for reading outside the app.

## Resources and preferences
Study resources remain contextual within Reading Units, Classic Journey, Featured Readings, and supported Qur'an Navigator passages. Translation display and Arabic font-size preferences remain shared with the existing reading workspace.
