# Duaa Module Architecture – v2.1.3

## Navigation

Normal Duaa pages retain the global module sidebar and use a sticky horizontal Duaa navigation bar. Duaa pages do not use breadcrumbs or reserve breadcrumb spacing. The Page Epigraph is the first page element beneath the module bar. On mobile, the module bar scrolls horizontally.

## Tracked collections

Morning, Evening, and Before Sleep separate two concepts:

1. **Collection progress** records which individual duaas were completed in the app.
2. **Daily worship record** records whether at least one duaa was performed that day, including a manual record action for worship completed away from the app.

The weekly display runs Sunday through Saturday.

## Untracked collections

Travel, Weather, Prayer, and Istikharah use the same collection/index and reader pattern without completion, progress, history, or daily worship controls.

## Reading Mode

Reading Mode is a dedicated page rather than a modal. It hides the global sidebar and app banner, keeps a subdued sticky Duaa navigation bar, and displays one duaa at a time with Arabic, transliteration, meaning, source, and Previous/Next controls. Tracked collections also provide Mark Complete.

## User-controlled order

Each collection supports a persistent preferred recitation order. Desktop users can drag rows by the handle; touch and keyboard users can use the up/down controls. The saved order is local to the browser until cloud synchronization is added. Reading Mode follows that saved order.


## Accent color

All solid Duaa interaction accents use `#1F639F`, including the module navigation, primary buttons, progress fills, and completed checkmark backgrounds.


## Collections library index (v3.4.8)

The `/duaa/collections` route is an alphabetical index rather than a card gallery. It uses the reusable `collectionListItem` renderer and `.collection-index*` CSS classes. The index is centered at a maximum width of 860px, each entire row is a navigation target, and square thumbnails are derived from destination-page banner artwork in `assets/collection-thumbnails/`. Daily Companion cards on Duaa Home remain icon-based because they carry tracking and consistency information.
