# Ummiby Companion v3.29.1 Build Report

## Featured Reading Calendar Corrections

- Removed calendar-history reset controls from Al-Kahf, Al-Mulk, and As-Sajdah landing pages.
- Kept a labeled History control on each landing calendar.
- Added Reset History only to each dedicated Featured Reading history page.
- Added a three-state reading model: not read, partially read, and fully read.
- Partial readings count as active reading days while remaining distinct from full completions in statistics.
- Added automatic partial/full history synchronization when sections are marked complete in all three readers.
- Added gray X markers only after an eligible reading window has passed.
  - Al-Kahf: Fridays only.
  - Al-Mulk and As-Sajdah: every past day.
  - Current eligible day remains unmarked until its window closes unless reading activity exists.
- Standardized markers and legends on landing and history calendars:
  - Gray X: Not Read
  - Accent outline circle: Partially Read
  - Accent filled circle: Fully Read
- Replaced the landing calendar’s centered modal with a compact popover positioned near the selected date; mobile uses a bottom placement.
- Updated history editing dialogs to support all three statuses.
- Added an illustrated Al-Kahf Friday virtue card directly beneath the section grid.
- Preserved existing banner art, section illustrations, readers, navigation, resources, and section cards.

## Release Validation

- JavaScript syntax checks passed for `js/shell.js` and `js/app.js`.
- Canonical release validator passed 31 of 31 checks.
- Application and cache-key version updated to 3.29.1.
