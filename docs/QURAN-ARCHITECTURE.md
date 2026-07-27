# Qur'an Module Architecture — v3.8.0

## Reading model

### Tracked experiences
- Reading Unit Journey
- Classic Journey
- Memorization

Tracked experiences maintain their own position and progress. The active reading journey is the only journey shown on Qur'an Home.

### Untracked reading
- Qur'an Navigator
- Featured Readings
- Ramadan Central reading
- Physical mushaf
- Other reading apps

Untracked reading does not maintain a resume state or completion percentage. It only acknowledges that Qur'an was read that day.

## Navigation
1. Home
2. Journeys
3. Qur'an Navigator
4. Featured Readings
5. Memorization
6. Reading History
7. Settings

## Daily reading record
Reading views inside Ummiby Companion write the current date to `ummiby.quran.readingDays`. The manual home control writes the same date with a manual source marker and is intended for reading outside the app.

## Resources
Study resources are contextual and appear within Reading Units, Classic Journey, Featured Readings, and supported Qur'an Navigator passages. There is no standalone Study Library navigation item.
