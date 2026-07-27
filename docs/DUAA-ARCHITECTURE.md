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

The `/duaa/collections` route uses a responsive visual card gallery rendered by `collectionListItem` and the `.collection-index*` CSS classes. The gallery uses three columns on wide screens, two on tablets, and one on small screens. Each entire card is a navigation target, and its artwork comes from the resized destination-page images in `assets/collection-index-images-v3411/`. Daily Companion cards on Duaa Home remain icon-based because they carry tracking and consistency information.


## Shared collection artwork (v3.4.9)

The Collections index and Duaa Home “More Collections” cards use the same resized square thumbnails derived from each destination page banner. Morning, Evening, and Before Sleep remain icon-based on Duaa Home because those cards carry tracking, progress, and weekly consistency content. Istikharah temporarily uses its existing illustration until a dedicated page banner is created.


## Qur’anic Duaa collection (v3.4.22)

The `/duaa/quranic` route is an untracked reference collection containing curated Qur’anic supplications. Each entry carries exact surah/ayah metadata, speaker attribution, purpose tags, and brief context. Collection-specific filter controls may combine one speaker with multiple purpose tags. The shared Reading Mode displays the Qur’anic attribution and reference in its About panel.


## Duaa Memorization State (v3.5.0)

Memorization is stored independently from daily completion under `memorized[collectionId][itemId]` in the existing Duaa local-storage state. Collection pages expose a memorized toggle, the Collections Index summarizes memorized counts, and `/duaa/memorization` renders the cross-collection badge map. A memorized badge links to the existing Reading Mode route for that item.
