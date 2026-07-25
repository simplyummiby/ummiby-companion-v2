# Ummiby Companion

**v2.2.4 — Qur’an Reading Bar Alignment**

This release aligns the Qur’an Reading Mode with the established Duaa reading experience. The top and bottom bars now span the full reading page, use the richer Qur’an green, and frame the centered reading context without adding a button background behind Exit Reading Mode.

## Current version

**v2.2.4 — Qur’an Reading Bar Alignment**

### Reading Mode refinements

- Removed the background treatment from **Exit Reading Mode** so the rich green header remains uninterrupted.
- Centered the Reading Unit and ayah range in the top bar using balanced left and right control areas.
- Expanded both reading bars across the full page width, matching the Duaa Reading Mode structure.
- Applied the richer bottom-bar green to the top bar for a consistent immersive frame.
- Kept the bottom bar slim and centered its shorter unit or section progress indicator.
- Refined **Mark Complete** to follow the Duaa action-button pattern while retaining the Qur’an green theme.

### Final layout adjustments

- Moved the entire Today’s Status rail left at the grid-layout level and centered the status presentation within its allotted area.
- Added visible blue side gutters around the Study Library category rows by slightly reducing their width.

### Experience improvements

- Added circular collection icons and a one-click **Mark Done** action to each tracked Duaa Home card.
- Replaced persistent helper copy with accessible information tooltips.
- Shifted Today’s Status left and widened the duaa list area.
- Standardized list-row height by shortening long descriptions visually.
- Corrected the Reading Mode bar to the Duaa navigation blue with fully visible controls.
- Moved reading preferences into a gear inside Reading Mode and removed Duaa Settings from the module navigation.
- Added persistent Arabic font-size, English translation, and transliteration controls.
- Rebuilt Study Library using rich category rows with internal resource-list views and graceful zero-resource states.

### Data and compatibility

- All 44 restored duaas and stable IDs remain unchanged.
- Completion, worship history, custom ordering, and reading preferences use the existing `ummiby.duaa.v2.1` storage key.
- Existing users default to English translation and transliteration displayed.
- `collectionDataAudit()` continues to verify counts, missing IDs, and duplicate IDs.

### Version check

Open `js/version.js` in VS Code to confirm the extracted build version, release name, and release date.

## Running locally

Serve the extracted project through a local web server such as VS Code Live Server. ES module imports will not work reliably by opening `index.html` directly through a `file://` URL.

## Configuration

Copy `js/config.example.js` to `js/config.js` and add the private Supabase project values when cloud authentication is being tested. Keep `js/config.js` out of source control.



## v2.1.9 Duaa Inline Study Library

- Restored a narrower, calmer width for Duaa Home while preserving the wider collection workspace.
- Added a subtle card treatment to Today's Status.
- Replaced Study Library category navigation with in-page expandable accordion sections.
- Resource links now appear directly beneath their category and still open externally in a new tab.