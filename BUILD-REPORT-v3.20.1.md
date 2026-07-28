# Build Report — Ummiby Companion v3.20.1

## Objective
Restore access to the Reading Unit Journey reader from every Continue Reading and unit-opening entry point.

## Root cause
The v3.20.0 reader cleanup retained a call to `readingUnitResumeNotice(unit)` while inadvertently removing that shared renderer. Opening any `/quran/reading-unit/:order` route therefore threw a runtime `ReferenceError` before the reader could render.

## Fix
- Restored the shared Reading Unit resume-notice renderer.
- Updated its guidance to match the current per-ayah pin interaction.
- Retained Saved Ayāt, private notes, My Library, and all v3.20.0 reader controls.
- Bumped cache-busting references to v3.20.1.

## Verification
- JavaScript syntax checks pass.
- Reading Unit routes 1, 59, and 294 render successfully in isolated runtime checks.
- Qur’an Home, Journeys, Reading Unit index, and Saved Ayāt routes render successfully.
- Canonical release validation passes.
