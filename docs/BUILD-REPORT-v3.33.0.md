# Build Report — v3.33.0 Dynamic Home Experience Framework

## Implemented
- Replaced App Home only with a dedicated immersive layout.
- Added horizontal global module navigation, live status strip, six artwork-driven experiences, three reusable activity cards, and a horizontal transparent prayer companion.
- Added Automatic plus Fajr/Morning/Dhuhr/Asr/Maghrib/Isha preview selector.
- Added Open-Meteo current weather with approximately 30-minute local cache and graceful fallback.
- Added transliterated Islamic weekday before the Hijri date.
- Scoped all new styling beneath `.dynamic-home-page`.

## Regression checks
- App Home uses the dedicated Dynamic Home layout.
- Existing Qur’an, Duaa, Prayer, Names, Fasting, Ramadan, Settings, Featured Reading, and reader shell paths use the original shared shell.
- Existing sidebars, module banners, content widths, and sticky reader controls are unchanged outside `/home`.
- Desktop, tablet, and mobile responsive rules included.
- All six artwork assets included.
