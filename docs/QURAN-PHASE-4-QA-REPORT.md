# Qur’an Phase 4 QA Report

## Release

Ummiby Companion v3.12.0 — Canonical Qur’an Integration QA & Regression Protection

## Canonical data results

| Check | Result |
|---|---:|
| Surahs | 114 verified |
| Ayat | 6,236 verified |
| Arabic text | Present for every ayah |
| Hilali–Khan translation | Present for every ayah |
| Reading Units | 294 verified |
| First unit | P0001 |
| Final unit | P0294 |
| Invalid endpoints | 0 |
| Gaps | 0 |
| Overlaps | 0 |
| Duplicate ayah coverage | 0 |
| Total ayah coverage | 6,236 exactly once |

## Application integrity results

- The main HTML entry file references packaged CSS and JavaScript assets that exist.
- Local ES module imports used by the app shell and canonical data layer resolve correctly.
- All JavaScript files pass syntax validation.
- Release cache keys and the visible app version are aligned to v3.12.0.
- The packaged raw Tanzil and Hilali–Khan source files remain present.

## Regression corrected

Earlier builds generated Qur’an reading-day keys with `toISOString()`, which converts the current time to UTC before choosing the date. In Arizona and other western time zones, evening reading could therefore be recorded under the following calendar day. Phase 4 now creates date keys from the user’s local year, month, and day for:

- automatic inside-app reading records;
- manually recorded reading days;
- Reading Unit activity de-duplication;
- weekly consistency display.

Stored timestamps remain ISO timestamps so activity ordering and history display remain precise.

## Repeatable validation

From the extracted project root, run:

```bash
node tools/validate-release.mjs
```

The command exits with a non-zero status if a canonical count, Reading Unit boundary, source asset, module import, or release-version check fails.

## Intentionally outside Phase 4

The following are not data-integrity failures and remain separate feature work:

- Classic Journey is still a designed preview rather than a complete dynamic 114-surah reader.
- Featured Readings still use staged reading content and placeholder study-resource links.
- Study-resource categories are prepared for trusted links but are not fully populated.
- Supabase cross-device synchronization for Qur’an journey progress remains future application-service work; current journey progress uses local browser storage.

These items were not silently changed during the canonical integration QA phase.
