# Qur’an Canonical Data Validation — v3.9.0

## Verified release totals

- 114 surahs
- 6,236 ayat
- 6,236 non-empty Arabic text records
- 6,236 non-empty Hilali–Khan translation records
- 294 Reading Units, P0001 through P0294
- Reading Unit coverage: exactly 6,236 unique ayat
- No duplicate ayah coverage
- No gaps or overlaps within surahs
- Every Reading Unit endpoint falls within its surah
- Every surah and ayah sequence is continuous

## Compatibility correction

The v3.8.4 polished reader preview was labeled Reading Unit 87 for Al-Baqarah 253–259. In the recovered canonical library, Al-Baqarah 253–257 is P0025 and 258–260 is P0026. The Phase 1 release aligns the existing polished preview to canonical P0025 and retains the old `ummiby.quran.readingUnit.87` local record only as a one-time fallback when no P0025 record exists.

## Phase boundary

Phase 1 installs, validates, and indexes the canonical data. Full dynamic reader routing, Previous/Next behavior, and progress handling across every unit remain Phase 2 work.
