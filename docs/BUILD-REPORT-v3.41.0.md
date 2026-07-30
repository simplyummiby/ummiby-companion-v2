# Build Report — v3.41.0

## Scope

Concentrate this release on the Home page Daily Rhythm while preserving the existing Companion Station layout, weather strip, prayer card, reflection, opportunities panel, and footer.

## Daily Rhythm

- Six persistent items now appear in every Home experience:
  - Qur’an Reading
  - Morning Adhkār
  - Evening Adhkār
  - Surah Al-Mulk
  - Surah As-Sajdah
  - Before Sleep Duʿā
- The final line is now either an action link when the item belongs to the current experience, or a quiet timing status when it belongs later or earlier in the day.
- Completion states are read from the existing local progress records.
- Each item uses existing landscape artwork from its module.

## Experience behavior

- Qur’an Reading remains actionable throughout the day.
- Morning Adhkār is actionable during Fajr and Morning.
- Evening Adhkār is actionable during Asr, Maghrib, and Isha.
- Al-Mulk, As-Sajdah, and Before Sleep Duʿā become actionable during Isha.
- Outside those periods, cards display timing guidance without becoming links.
