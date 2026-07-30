# Ummiby Companion v3.30.0 Build Report

## Qur’an Reader Settings Consolidation

### Completed
- Removed persistent A− and A+ controls from Qur’an reader headers.
- Added the settings gear to the Al-Kahf, Al-Mulk, and As-Sajdah Featured Reading readers.
- Rebuilt the shared Qur’an settings panel used by Qur’an Home and reader dialogs.
- Added an Arabic text-size slider with a live Arabic and English preview.
- Added a global English footnote visibility setting.
- Added expandable footnote accordions beneath ayat that contain Hilali-Khan footnotes.
- Added a Reset to Default control.
- Extended the synced reading-preferences state with Qur’an translation and footnote preferences.
- Updated reader information to reflect the selected translation preference.

### Translation dataset status
- Hilali-Khan remains the installed active translation.
- The Saheeh International choice is represented in the new settings interface but intentionally disabled until a verified, properly licensed complete dataset is imported. The app does not silently substitute Hilali-Khan when Saheeh is selected.

### Persistence
Qur’an display preferences remain part of the existing synced application state, allowing them to follow the user across sessions and connected devices through the current sync adapter.

### Validation
- JavaScript syntax checks passed.
- Release validator passed 31 of 31 checks.
