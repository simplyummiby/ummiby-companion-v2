# Build Report — v3.30.1

## Release
Reader Settings and Featured Reading Action Polish

## Completed changes

- Restored a visible **English translation** checkbox in Qur’an Reader Settings and the Qur’an Settings page.
- Connected the preference to Reading Unit, Al-Kahf, Al-Mulk, and As-Sajdah reader output so English can be shown or hidden globally.
- Replaced technical `rem` readouts with **Small**, **Medium**, **Large**, and **Extra Large** labels while retaining the existing sizing range internally.
- Reworked the Reader Settings footer with separated, narrower **Restore Defaults** and **Done** buttons aligned at the bottom right.
- Updated reset behavior to restore English translation visibility along with the other Qur’an display defaults.
- Renamed the three Featured Readings home-card actions from **Open Reader** to **Explore Surah** because they open landing pages.
- Centered the action buttons—but not the titles or descriptions—on the three Featured Readings home cards.
- Reduced the width of **Begin Reading**, **Continue Reading**, and **Reset Progress** in the **Your Reading** section and centered their labels and placement.
- Centered Featured Reading section-card actions where appropriate, using compact buttons with comfortable horizontal padding rather than exact text width.
- Kept all build documentation inside `docs/`.

## Validation

- JavaScript syntax checks passed for `js/shell.js` and `js/app.js`.
- Qur’an canonical release validation passed all 31 checks.
