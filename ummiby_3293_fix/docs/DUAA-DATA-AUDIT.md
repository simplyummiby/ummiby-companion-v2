# Duaa Data Restoration Audit — v2.1.3

## Restored collection counts

| Collection | Items |
|---|---:|
| Morning | 16 |
| Evening | 15 |
| Before Sleep | 3 |
| Travel | 2 |
| Weather | 5 |
| Prayer | 2 |
| Istikharah | 1 |
| **Total** | **44** |

## Integrity results

- All 44 items have non-empty IDs, titles, Arabic text, English meanings, and source references.
- No duplicate item IDs were found within any collection.
- Every collection ID matches the v2 routing structure.
- Per-collection custom ordering continues to use the existing `ummiby.duaa.v2.1` storage key.
- Compatible v2.1.1 completion IDs are migrated to restored IDs when an unambiguous match exists.
- Restored items that were absent from an older saved order are appended automatically rather than hidden.

## Source

The restored content was migrated from `ummiby-companion-v0.5.5-full.zip`. The older source metadata, verification flags, focus phrases, virtues, and study-resource arrays are retained in the restored data model.
