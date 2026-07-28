# Ummiby Companion v3.16.0 Build Report

## Baseline

Built from the uploaded `Ummiby-Companion-v3.14.1-Learned-Names-Page` project, which was confirmed as the true latest baseline despite the earlier numbering sequence.

## Qur’an Reading Mode

- Repaired **Go to Ayah / saved spot** by using the clicked button rather than the browser event object.
- Added a temporary visual highlight after jumping to the restored ayah.
- Replaced the ayah-derived header percentage with a live scroll-position gauge for the current reading page.
- Reduced confirmation toast duration from 4.2 seconds to 1.8 seconds.
- Raised toast placement above the fixed reading controls so **Save My Place** remains visible.

## Reading Journey Progress

- Added **Set Starting Point** to the Reading Unit index.
- Earlier units are stored as **Covered before Ummiby**, not completed.
- Completed-in-Ummiby and previously-covered totals remain distinct.
- Overall journey position counts both completed and previously covered units.
- Changing the starting point recalculates previously covered units cleanly.
- Journey reset also clears starting-point metadata.

## Validation

- JavaScript syntax checks passed.
- Canonical release validator passed all 30 checks.
- Version and cache keys updated to `3.16.0`.
