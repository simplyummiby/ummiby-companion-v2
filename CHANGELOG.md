# Changelog

## 3.8.4 — Reading Unit Reader Polish

- Anchored the narrow Reading Companion closer to the left edge and widened the Qur’an reading surface.
- Renamed the panel to Reading Companion and reordered its sections so Reading Progress appears before Study Resources.
- Changed the top-bar progress to represent only the current reading unit; overall journey progress remains in the companion panel.
- Added refined spacing, typography, hover, focus, and transition states throughout the reader.
- Added a compact collapsible Reading Companion treatment for tablet and mobile layouts.
- Preserved deliberate Save My Place behavior and all existing journey progress logic.

## 3.8.3 — Reading Journeys Experience

### Experience and education
- Rebuilt Reading Journeys as a calm, educational destination rather than a two-card index.
- Explained what Reading Journeys are, why two paths are available, and how each supports a different reading routine.
- Added prominent reassurance that Reading Unit Journey and Classic Journey both follow the Qur'an in its traditional order.
- Clarified that Reading Unit Journey organizes traditional-order reading into 294 natural stopping points; it is not thematic or rearranged.
- Clarified that Classic Journey can resume from any ayah and never requires completing a surah in one session.

### Active Reading Journey
- Added a prominent Active Journey summary with current position, progress ring, progress bar, Continue Reading, and View Journey actions.
- Added confirmation before changing the Active Reading Journey.
- Preserved separate Reading Unit and Classic progress while changing only which path powers Qur'an Home's Continue Reading experience.
- Updated Qur'an Home and navigation terminology from Journey/Journeys to Active Reading Journey/Reading Journeys.

### Visual and responsive polish
- Reused the standard Qur'an banner height and artwork with page-specific live overlay text.
- Added responsive journey detail cards, comparison guidance, information callouts, and mobile-safe actions consistent with Ummiby Companion's design language.

### Regression review
- Verified route coverage, JavaScript syntax, active-journey persistence, independent default progress, reader routes, Reading History, study resources, reading preferences, memorization routes, and existing Duaa functionality.

## 3.8.0 — Qur'an Home & Navigation Refinement

### Qur'an Home
- Added a wide landscape Qur'an hero with a light left overlay area and open-mushaf focal point.
- Rebuilt the home around Continue Reading, Weekly Consistency, the active Journey, and a timely Featured invitation.
- Friday and Ramadan features no longer replace the active journey card.

### Reading architecture
- Limited Journeys to Reading Unit Journey and Classic Journey.
- Renamed unrestricted Read by Surah navigation to Qur'an Navigator.
- Added Featured Readings for al-Kahf, al-Mulk, As-Sajdah & Al-Insan, Ayat al-Kursi, and the final two ayat of al-Baqarah.
- Kept Ramadan reading inside Ramadan Central and removed the standalone Study Library navigation concept.

### Consistency and history
- Added automatic daily-reading acknowledgement for Qur'an readers inside the app.
- Added a manual Record Today's Reading control for reading completed in a physical mushaf, masjid, or another app.
- Added a Qur'an Reading History view backed by the same local reading-day record.

### Regression protection
- Preserved Reading Unit, Classic Journey, memorization, contextual study resources, Arabic-size preferences, translation layout, reader mode, mobile navigation, and existing Duaa functionality.

## v3.7.3 — Duaa History Year and Banner Polish

- Simplified the History year selector to begin at the Duaa history launch year, 2026.
- The selector now shows every year from 2026 through the current year, plus one upcoming year. In 2026, it displays only 2027 and 2026.
- Preserved any genuinely imported history earlier than 2026 without generating arbitrary empty years.
- Added a new History banner featuring clocks and an hourglass, with no text embedded in the image so the app's live banner typography remains accessible and responsive.
- Removed the previous rolling ten-year helper and centralized the supported History start year.
- Preserved month navigation, Monthly Insights, KPI calculations, collection tabs, local-date handling, and responsive behavior.

## v3.7.2 — Duaa History Monthly Insights

- Rebalanced the five History KPI cards to a comfortable medium size between the original wide tiles and the overly compact v3.7.1 cards.
- Replaced Selected Day with Monthly Insights for the month currently shown in the calendar.
- Added active-days progress, longest monthly streak, most consistent week, most consistent weekday, and gentle rule-based encouragement.
- Added an intentional future-month empty state rather than presenting incomplete statistics.
- Added one upcoming year to the year selector; the list continues to advance automatically with the device's local year and retains any years found in saved history.
- Removed day-selection state and click handling because calendar dates no longer open a detail panel.
- Preserved existing history records, streak calculations, collection tabs, month navigation, and local-calendar date handling.

## v3.7.1 — Duaa History Navigation Polish

- Removed the History epigraph so the explanatory page heading appears higher.
- Kept the History introduction because it explains active days, completed days, and the “Every Duaa Counts” streak approach.
- Constrained and tightened the five KPI cards so they read as a compact summary group rather than full-width dashboard tiles.
- Added an accessible year selector to the calendar header for direct year navigation.
- Preserved previous/next month navigation, collection tabs, calendar states, selected-day details, and existing history records.

## 3.7.0 — Duaa History Experience

### Added
- Rebuilt Duaa History as a three-tab Morning, Evening, and Before Sleep experience.
- Added a responsive monthly calendar with active, fully completed, today, and selected-day states.
- Added Active Days, Completed Days, Completion Rate, Current Streak, and Longest Streak summaries.
- Added selected-day detail cards and honest legacy-record handling for activity saved before daily counts existed.
- Began recording daily completed and total counts for richer history from this release forward.

### Preserved
- Existing local-calendar consistency records and the `ummiby.duaa.v2.1` storage key.
- Existing tracked collection behavior, completion, memorization, reading progress, filters, ordering, and Read/Learn modes.

### Technical debt
- Centralized Duaa history record and streak calculations in the Duaa data service.
- Kept calendar rendering separate from persistence and summary calculations for future Supabase synchronization.


## 3.6.2 — Duaa Consistency Persistence

### Fixed
- Standardized Duaa consistency records on the user’s local calendar date instead of UTC dates.
- Fixed Weekly Consistency records that could appear missing or shifted after refresh, especially during Arizona evening hours.
- Ensured Morning, Evening, and Before Sleep remain independent daily records.
- Added guarded localStorage writes so persistence failures are surfaced instead of silently ignored.

### Preserved
- One completed duaa still counts as an active day.
- Manual Record Today controls continue to add or remove only the selected collection’s current-day record.
- Collection completion, memorization, Read/Learn preferences, filtering, ordering, and reading progress remain unchanged.
- Existing `ummiby.duaa.v2.1` data remains compatible; no storage-key reset or destructive migration was introduced.

### Technical debt
- Centralized local date-key creation and local week-boundary calculation.
- Removed duplicated UTC date slicing from consistency functions.
- Added a focused consistency-storage audit helper for regression testing and future History development.

## 3.6.1 — Duaa Read / Learn Polish

- Added an intentional centered Learn Mode placeholder for duas without segmented phrase data.
- Kept Learn selectable so the saved mode is respected across navigation; the placeholder can return directly to Read Mode.
- Standardized Duaa reader icons with Phosphor BookOpen, Student, CaretLeft, CaretRight, CheckCircle, ListBullets, and GearSix icons.
- Adopted the Phosphor SealCheck icon for existing memorization status controls.
- Preserved the existing segmented Learn layout and removed the previous forced-mode fallback logic.
- Added responsive styling for the unavailable Learn Mode card without changing the broader reader layout.
- Completed focused cleanup around Read/Learn rendering and retained filtered reading sequences, completion, memorization, and progress behavior.

## 3.6.0 — Duaa Read & Learn Modes

- Added Read and Learn tabs to Duaa Reading Mode.
- Read view presents the complete English and Arabic duaa in one uninterrupted two-column row.
- Learn view preserves the existing phrase-by-phrase English, transliteration, and Arabic layout.
- Read is the default for existing users; the selected mode persists across Previous and Next navigation and future sessions.
- Learn is disabled gracefully when segmented learning content is unavailable.
- Preserved filtered Qur’anic reading sequences, collection-specific virtues, completion controls, and Arabic-size preferences.


## 3.5.1 — Duaa Canonical Record Foundation

- Added canonical identities for supplications shared between Morning and Evening collections.
- Synced memorization status across every placement of the same duaa.
- Preserved collection-specific virtues and instructions on each placement.
- Changed the memorization-page global totals to count unique duaas.
- Added automatic migration from the previous collection-based memorization state.


## v3.5.0 — Duaa Memorization Map

- Added independent memorized status tracking for every duaa collection.
- Added a Memorized control to every duaa in collection lists.
- Added memorized totals and progress rings to collection index cards.
- Added the My Duaa Memorization page with summary metrics and collection badge walls.
- Added white unmemorized badges and filled collection-colored memorized badges.
- Made every badge open the matching duaa in Reading Mode.
- Preserved the existing completion, worship, custom order, Qur’anic filter, and Reading Mode behavior.


## v3.4.26 — Qur’anic Duaa Filtered Reading Sequence Fix

- Reading Mode now follows the currently filtered Qur’anic duaa list.
- Position, progress, Previous, Next, and end-of-set behavior now use the filtered result count.
- Returning to the collection still preserves filters and list position.

## v3.4.25 — Qur’anic Duaa Persistent Filter Dialog Polish

- Preserved prophet/speaker and purpose filters when entering Reading Mode and returning to the collection.
- Restored the previous list scroll position on return.
- Replaced nested dropdown scroll areas with floating multi-select dialogs.
- Added removable active-filter pills and per-group clear controls.
- Extended the Browse Collection blue header across the full card width.
- Kept the sidebar itself free of nested scrolling.

## v3.4.23 — Qur’anic Duaa Filter Sidebar Polish

- Moved the Qur’anic Duaa collection filters into a dedicated left-side card.
- Matched the card formatting to the existing “About This Duaa” panel.
- Removed the filter panel from above the list so the collection begins higher on the page.
- Temporarily hid context explanations while retaining them in the collection data for later review.
- Confirmed existing collection layouts remain unchanged.

## v3.4.21 — Duaa Collections Card Gallery

- Replaced the compact alphabetical row index on `/duaa/collections` with a spacious visual card gallery.
- Reused the existing resized collection artwork from `assets/collection-index-images-v3411/`.
- Added rounded card corners, larger image areas, clearer spacing, subtle hover elevation, and consistent white-card styling.
- Added responsive three-column, two-column, and single-column layouts.
- Added a compact footer showing tracked progress or the number of duaas in each collection.
- Preserved all v3.4.20 Prayer and Fasting sidebar placeholders and routes.

## v3.4.20 — Prayer and Fasting Sidebar Placeholders

- Added Prayer and Fasting to the global sidebar with distinct SVG icon-font symbols.
- Added working placeholder routes at `/prayer` and `/fasting`.
- Added future-scope cards for prayer learning, study resources, prayer times, year-round fasting records, guidance, and history.
- Kept the new unfinished modules off App Home for now.
- Preserved Ramadan Central as the dedicated Ramadan experience.

## v3.4.19 — Duaa Collection Page Composition Polish

- Tightened the reusable Duaa epigraph styling across all pages while preserving its clean, unboxed editorial treatment.
- Reduced excess vertical whitespace around context, quotation, citation, detail, source, and divider elements.
- Narrowed and centered the collection workspace so duaa rows no longer stretch across the full page.
- Rebuilt Today’s Status as a premium header-and-body card matching the visual language of About This Duaa.
- Grouped status, recording action, collection progress, and weekly consistency inside the unified card body.
- Refined collection rows with restrained borders, rounding, spacing, and subtle depth for easier scanning.
- Improved desktop, tablet, and mobile layout behavior without changing tracking or reading functionality.

## v3.4.18 — Focus Mode Study Resources and Collection Ending

- Added a dedicated circular books icon to the Study Resources heading so it visually matches Evidence and Virtue / Benefit.
- Kept the Study Resources caret independent so only the caret rotates when the section opens.
- Replaced the empty final navigation slot with an “End of collection / Exit Focus Mode” link.
- Made the final action return directly to the current collection page.
- Preserved the compact icon-only footer behavior on small screens.

## v3.4.17 — Sayyid al-Istighfar Source Links and Data Standard

- Added verified direct links for Sahih al-Bukhari 6306 and 6323 in the shared source library.
- Updated both Morning and Evening Sayyid al-Istighfar entries to point to the primary evidence link.
- Kept Arabic, translation, and complete-entry verification flags unchanged pending separate review.
- Added `docs/DUAA-CONTENT-DATA-STANDARD.md` to standardize evidence, virtue, and Study Resource metadata.

## v3.4.16 — Duaa Focus Mode Rendered Text Alignment Correction

- Corrected the actual rendered phrase markup in Focus Mode instead of relying only on the parent column styles.
- Wrapped transliteration, English, and Arabic content in dedicated full-width text elements.
- Kept transliteration and English body text left-aligned.
- Right-aligned every wrapped Arabic duaa line while keeping all three column headings centered.
- Preserved responsive mobile labels and the existing Focus Mode layout.

# Changelog

## 3.7.0 — Duaa History Experience

### Added
- Rebuilt Duaa History as a three-tab Morning, Evening, and Before Sleep experience.
- Added a responsive monthly calendar with active, fully completed, today, and selected-day states.
- Added Active Days, Completed Days, Completion Rate, Current Streak, and Longest Streak summaries.
- Added selected-day detail cards and honest legacy-record handling for activity saved before daily counts existed.
- Began recording daily completed and total counts for richer history from this release forward.

### Preserved
- Existing local-calendar consistency records and the `ummiby.duaa.v2.1` storage key.
- Existing tracked collection behavior, completion, memorization, reading progress, filters, ordering, and Read/Learn modes.

### Technical debt
- Centralized Duaa history record and streak calculations in the Duaa data service.
- Kept calendar rendering separate from persistence and summary calculations for future Supabase synchronization.


## v3.4.22 — Qur’anic Duaa Collection

- Added the new **Qur’anic Duaas** collection to the Collections index.
- Populated the collection with 40 Qur’anic supplications.
- Added exact surah/ayah references, prophet or speaker attribution, purpose tags, and short contextual notes.
- Added combinable speaker and purpose filter chips with responsive horizontal scrolling on small screens.
- Added Qur’anic speaker/reference context to the Reading Mode sidebar.
- Added matching banner and collection-card artwork.
- Extended Collections navigation highlighting to include the new route.
- Bumped the visible release version to 3.4.22.


## v3.4.15 — Duaa Focus Mode Typography and Alignment Polish

- Switched Focus Mode Arabic text to Amiri Quran with Amiri/serif fallbacks.
- Right-aligned Arabic phrase text and the Arabic column heading.
- Reduced English and transliteration line spacing.
- Removed the repeat arrows icon so repeat guidance no longer resembles a clickable control.
- Moved the About This Duaa panel closer to the left page edge and widened it slightly.
- Re-centered the Previous / Mark Complete / Next group in the full blue footer.
- Reduced the width of the Mark Complete / Completed pill.

## v3.4.14 — Duaa Focus Mode Layout Stabilization

- Removed the legacy reader width constraint so Focus Mode uses the full desktop workspace.
- Stabilized the sticky top bar and centered the collection title, item count, and progress bar.
- Reduced and balanced the duaa summary title sizing.
- Rebalanced the left information panel and three-column reading area.
- Increased Arabic column width and prevented awkward word-by-word wrapping.
- Added safe bottom spacing so reading content is not hidden behind the sticky footer.
- Centered the Previous / completion / Next control group with reserved side slots.
- Improved responsive transitions for medium and small screens.

## v3.4.13 — Duaa Focus Mode Workspace Redesign

- Rebuilt Duaa Focus Mode as a framed reading workspace with matching sticky blue top and bottom bars.
- Centered the collection title and item count in the top bar and added a thin white progress indicator.
- Removed the duplicate collection label from the white reading area.
- Added a left-side “About This Duaa” panel with Evidence and Virtue always visible.
- Added one Study Resources dropdown with resources grouped by category and no nested category accordions.
- Reworked phrase-by-phrase reading into a lighter three-column layout: transliteration left, English center, Arabic right.
- Removed the heavy card/table treatment while retaining subtle phrase alignment and separators.
- Centered Previous, completion toggle, and Next in the sticky bottom bar.
- Preserved the reversible completion toggle: white “Mark Complete” and powder-blue “✓ Completed.”
- Preserved Arabic-size and display preferences through the settings gear.

## v3.4.12 — Duaa Collection Image Path Reliability

- Corrected Duaa collection image URLs so they resolve relative to the extracted project folder instead of the Live Server root.
- Restored banner-derived thumbnails on the Collections index and landscape banner crops on Duaa Home browse cards.
- Preserved hash-based refresh-safe routing from v3.4.10.
- Kept Morning, Evening, and Before Sleep icon-based on Duaa Home.

## v3.4.12 — Duaa Collection Banner Artwork

- Installed dedicated square crops of the appropriate page banners in the Collections index.
- Installed separate landscape banner crops in the Travel, Weather, and Prayer cards on Duaa Home.
- Preserved icon-based Morning, Evening, and Before Sleep dashboard cards.
- Retained the existing Istikharah illustration until a dedicated banner is created.
- Added versioned artwork paths to prevent stale browser caching.
- Preserved the site-wide static-host routing fix from v3.4.10.

# Changelog

## 3.7.0 — Duaa History Experience

### Added
- Rebuilt Duaa History as a three-tab Morning, Evening, and Before Sleep experience.
- Added a responsive monthly calendar with active, fully completed, today, and selected-day states.
- Added Active Days, Completed Days, Completion Rate, Current Streak, and Longest Streak summaries.
- Added selected-day detail cards and honest legacy-record handling for activity saved before daily counts existed.
- Began recording daily completed and total counts for richer history from this release forward.

### Preserved
- Existing local-calendar consistency records and the `ummiby.duaa.v2.1` storage key.
- Existing tracked collection behavior, completion, memorization, reading progress, filters, ordering, and Read/Learn modes.

### Technical debt
- Centralized Duaa history record and streak calculations in the Duaa data service.
- Kept calendar rendering separate from persistence and summary calculations for future Supabase synchronization.


## v3.4.22 — Qur’anic Duaa Collection

- Added the new **Qur’anic Duaas** collection to the Collections index.
- Populated the collection with 40 Qur’anic supplications.
- Added exact surah/ayah references, prophet or speaker attribution, purpose tags, and short contextual notes.
- Added combinable speaker and purpose filter chips with responsive horizontal scrolling on small screens.
- Added Qur’anic speaker/reference context to the Reading Mode sidebar.
- Added matching banner and collection-card artwork.
- Extended Collections navigation highlighting to include the new route.
- Bumped the visible release version to 3.4.22.


## 3.4.12 — Static Hosting Route Reliability

- Fixed `Cannot GET /...` refresh failures across the entire application.
- Replaced `history.pushState` clean routes with static-host-safe hash routes.
- Applied the routing fix centrally to every internal link marked with `data-route`.
- Preserved browser Back and Forward navigation with `hashchange`.
- Made copied links and links opened in new tabs safe on Live Server and ordinary static hosting.
- Updated password-reset redirects to return to the real application entry point.
- Updated application, cache, documentation, and release references to 3.4.12.

## 3.4.9 — Duaa Collection Artwork Reuse

- Updated Duaa Home “More Collections” cards to use the same resized page-banner artwork as the Collections index.
- Kept Morning, Evening, and Before Sleep icon-based because those are content-heavy daily tracking cards.
- Preserved the Istikharah illustration fallback until a dedicated Istikharah page banner exists.
- Centralized thumbnail selection so the Collections index and Duaa Home browse cards cannot drift apart.
- Updated application, cache, documentation, and release references to 3.4.9.

## 3.4.8 — Duaa Collections Library Refresh

- Replaced the Collections page card grid with a centered alphabetical library index.
- Added reusable collection list rows with square artwork, collection names, brief descriptions, and whole-row navigation.
- Generated optimized square thumbnails from each destination page banner without distorting the original artwork.
- Preserved Istikharah in the index with its existing collection illustration until dedicated page-banner artwork is available.
- Constrained the library to an 860px maximum width so rows do not stretch awkwardly across the page.
- Added responsive tablet and mobile sizing while preserving comfortable touch targets.
- Kept the Duaa Home Daily Companion cards icon-based and left the existing More Collections cards unchanged.
- Updated application, cache, documentation, and release references to 3.4.8.

## 3.4.7 — Duaa Epigraph Spacing and Source-Link Polish

- Added balanced spacing between the Duaa module navigation and each Page Epigraph without restoring unused breadcrumb space.
- Tightened multi-line quote leading from the earlier loose setting for a more cohesive quotation block.
- Replaced the Morning epigraph's detached icon-only link with a descriptive inline source link.
- Kept the Phosphor `arrow-square-out` icon on the same line and inside the same clickable element as the source text.
- Preserved the breadcrumb-free epigraph-first page hierarchy and unified Duaa accent color `#1F639F`.
- Updated application, cache, documentation, and release references to 3.4.7.

## 3.4.6 — Duaa Epigraph Alignment and Accent Unification

### Changed
- Audited every Duaa module route to keep the reusable Page Epigraph as the first page element beneath the module navigation.
- Removed the inherited top spacing that had been reserved by the global page layout despite Duaa pages not using breadcrumbs.
- Confirmed Duaa landing, collection library, history, tracked collection, and untracked collection pages do not render duplicate page titles or secondary subtitles above their epigraphs.
- Unified the Duaa solid accent token to `#1F639F`.
- Standardized the Duaa navigation bar, primary buttons, recorded-state buttons, active progress fills, weekly completion dots, and checked-circle backgrounds to the approved accent.
- Updated Page Epigraph and Duaa architecture documentation with the epigraph-first hierarchy and no-breadcrumb-spacing rule.
- Updated application and cache version references to 3.4.6.

## 3.4.5 — Duaa Page Epigraph System

### Added

- Added a centralized Duaa epigraph registry for consistent page-level quotation content.
- Added standardized epigraphs to Morning, Evening, Before Sleep, Travel, Weather, Prayer, Food & Drink, Clothing, Anxiety & Sadness, Collections, and History.
- Added stacked citation support for sources that require multiple lines.
- Added `docs/EPIGRAPH-STANDARD.md` with component, typography, spacing, and contributor guidance.

### Changed

- Extended the existing `pageEpigraph()` renderer to use one object-based API with `context`, `quote`, `citation`, `detail`, and `externalLink`.
- Standardized the quote as the italic visual focus and made context, citation, detail, link, and divider styling consistent across all pages.
- Tightened the space below the banner/module navigation before each epigraph.
- Preserved the existing Morning external source destination and diagonal-arrow treatment.
- Replaced legacy collection-specific quotation headers with the shared component.
- Removed the Morning-only spacing exception and consolidated duplicate epigraph CSS.
- Updated all application and cache version references to 3.4.5.

### Preserved

- Existing Duaa navigation, collection lists, completion tracking, weekly history, reading mode, source/resource displays, account controls, banner artwork, and banner positioning.

## 3.4.4.5 — Individual Banner Vertical Position Tuning

- Left the approved Food & Drink banner exactly as it appeared in v3.4.4.4.
- Raised Collections, History, Clothing, and Anxiety & Sadness from the full-bottom anchor so their foreground subjects are framed without sitting too low.
- Tuned each banner independently at desktop, tablet, and mobile breakpoints.
- Kept the approved source images, overlays, text, page content, and navigation unchanged.
- No new graphics were generated.

## 3.4.4.4 — Full-Image Bottom Banner Positioning Fix

- Kept the already-approved Collections, History, Food & Drink, Clothing, and Anxiety & Sadness artwork.
- Replaced the overly shallow pre-cropped banner derivatives with the full approved images so CSS positioning can reveal the lower foreground.
- Anchored all five banners to the bottom on desktop, tablet, and mobile.
- Added explicit background-size variables to the banner tuning file for easy future adjustment.
- No new graphics were generated and no page content or navigation was changed.

## 3.4.4.3 — Lower Foreground Banner Crop Tuning

### Changed

- Adjusted the existing Collections, History, Food & Drink, Clothing, and Anxiety & Sadness banners to display the lower portion of each image.
- Preserved the topic-specific foreground content at desktop, tablet, and mobile widths by changing the vertical banner anchor from center to bottom.
- Kept all approved artwork, overlays, page structure, and horizontal crop settings unchanged.
- Added no new graphics.

# Changelog

## 3.7.0 — Duaa History Experience

### Added
- Rebuilt Duaa History as a three-tab Morning, Evening, and Before Sleep experience.
- Added a responsive monthly calendar with active, fully completed, today, and selected-day states.
- Added Active Days, Completed Days, Completion Rate, Current Streak, and Longest Streak summaries.
- Added selected-day detail cards and honest legacy-record handling for activity saved before daily counts existed.
- Began recording daily completed and total counts for richer history from this release forward.

### Preserved
- Existing local-calendar consistency records and the `ummiby.duaa.v2.1` storage key.
- Existing tracked collection behavior, completion, memorization, reading progress, filters, ordering, and Read/Learn modes.

### Technical debt
- Centralized Duaa history record and streak calculations in the Duaa data service.
- Kept calendar rendering separate from persistence and summary calculations for future Supabase synchronization.


## v3.4.22 — Qur’anic Duaa Collection

- Added the new **Qur’anic Duaas** collection to the Collections index.
- Populated the collection with 40 Qur’anic supplications.
- Added exact surah/ayah references, prophet or speaker attribution, purpose tags, and short contextual notes.
- Added combinable speaker and purpose filter chips with responsive horizontal scrolling on small screens.
- Added Qur’anic speaker/reference context to the Reading Mode sidebar.
- Added matching banner and collection-card artwork.
- Extended Collections navigation highlighting to include the new route.
- Bumped the visible release version to 3.4.22.


## 3.4.4.2 — Collections, History, and Collection Page Banners

- Installed the approved Collections banner on `/duaa/collections`.
- Installed the approved History banner on `/duaa/history`.
- Added Food & Drink, Clothing, and Anxiety & Sadness collection routes and cards.
- Installed the previously approved banner artwork on each new collection page.
- Kept the new situational pages out of the Duaa module navigation bar; they are reached through Collections.
- Extended Banner Tuning with independent desktop, tablet, mobile, and overlay controls for all five banners.
- Added graceful content-ready states so no unverified supplication text is introduced before the dedicated content-verification pass.
- Added matching SVG collection icons and updated version/cache references.

## 3.4.4.1 — Before Sleep Banner and Banner Tuning

- Reduced the Before Sleep navy overlay so the moonlit sea, mosque, terrace, and warm porch lighting remain visible.
- Added `css/banner-tuning.css` as the single, clearly documented location for per-banner crop and overlay adjustments.
- Added separate desktop, tablet, and mobile focal-position variables for the current Duaa banners.
- Exposed readable opacity variables for Travel, Weather, Prayer, Evening, and Before Sleep overlays.
- Added a maintenance guide explaining how to make small banner adjustments safely.
- Preserved all approved banner artwork and unrelated application behavior.

# Changelog

## 3.7.0 — Duaa History Experience

### Added
- Rebuilt Duaa History as a three-tab Morning, Evening, and Before Sleep experience.
- Added a responsive monthly calendar with active, fully completed, today, and selected-day states.
- Added Active Days, Completed Days, Completion Rate, Current Streak, and Longest Streak summaries.
- Added selected-day detail cards and honest legacy-record handling for activity saved before daily counts existed.
- Began recording daily completed and total counts for richer history from this release forward.

### Preserved
- Existing local-calendar consistency records and the `ummiby.duaa.v2.1` storage key.
- Existing tracked collection behavior, completion, memorization, reading progress, filters, ordering, and Read/Learn modes.

### Technical debt
- Centralized Duaa history record and streak calculations in the Duaa data service.
- Kept calendar rendering separate from persistence and summary calculations for future Supabase synchronization.


## v3.4.22 — Qur’anic Duaa Collection

- Added the new **Qur’anic Duaas** collection to the Collections index.
- Populated the collection with 40 Qur’anic supplications.
- Added exact surah/ayah references, prophet or speaker attribution, purpose tags, and short contextual notes.
- Added combinable speaker and purpose filter chips with responsive horizontal scrolling on small screens.
- Added Qur’anic speaker/reference context to the Reading Mode sidebar.
- Added matching banner and collection-card artwork.
- Extended Collections navigation highlighting to include the new route.
- Bumped the visible release version to 3.4.22.


## 3.4.4 — Evening and Before Sleep Banner Integration

- Installed the approved sunset terrace artwork on Evening Duaas.
- Installed the approved moonlit porch artwork on Before Sleep Duaas.
- Exported both production assets at the official 1717 × 190 banner size.
- Tuned the Evening crop to preserve the glowing horizon, coastline, and illuminated mosque.
- Tuned the Before Sleep crop to preserve the moonlit sea, mosque, railing, and restful porch seating.
- Added collection-specific navy glass overlays with white typography and restrained gold eyebrow text.
- Added independent desktop, tablet, and mobile focal positioning for both banners.
- Preserved all Duaa content and non-banner behavior.

## 3.4.3.1 — Duaa Banner Presentation Polish

- Re-cropped the Travel banner so the winding coastal road remains clearly visible in the final 1717 × 190 strip.
- Re-cropped the Weather banner so both the softened cloud cover and rain-wet roadway remain visible.
- Re-cropped the Prayer banner so the Qur’an stand and prayer-space foreground remain visible.
- Replaced the overly dark situational overlays with lighter glass gradients and dark blue typography.
- Preserved responsive focal positioning and all non-banner behavior.

## 3.4.3 — Duaa Collection Banner Expansion

- Installed the approved coastal-road artwork on Travel Duaas.
- Installed the approved wet-road and softened-cloud artwork on Weather Duaas.
- Installed the approved mosque-terrace artwork on Prayer Duaas.
- Added collection-specific banner titles and descriptions.
- Added responsive image positioning and contrast overlays for readable banner typography.
- Exported each installed asset at the official 1717 × 190 banner size and optimized it for web delivery.
- Preserved all collection content, tracking, readers, navigation, and non-banner page styling.

## v3.4.2 — Morning Duaa Page Introduction

### Release correction
- Added local-preview route normalization so `/duaa/morning/` and `/duaa/morning` render the same Morning-specific banner and Page Introduction.
- Added v3.4.2 cache-busting references for the touched CSS and JavaScript entry files so local preview does not reuse the prior page presentation.

### Added

- Installed a dedicated Morning Duaa banner derived from the approved Duaa terrace composition, preserving the same mosque, sea, terrace, and camera position while shifting the atmosphere clearly into morning.
- Added the Morning quotation from Shaykh al-Islam Ibn Taymiyyah using the official centered Page Introduction Standard.
- Added an icon-only external source link immediately beside the attribution.

### Changed

- Updated the Morning banner overlay to `DUAA`, `Morning Duaas`, and “Begin your day with authentic remembrance.”
- Removed the old Morning collection heading and quote-card introduction from this page only.
- Extended the shared epigraph component to support an optional explanatory attribution line and accessible external-link icon.
- Updated release metadata and design documentation for the “Same Place, Different Time of Day” philosophy.

### Cleanup and validation

- Retained only the active Duaa Home and Morning banner assets.
- Avoided collection-specific duplicate quote styling by reusing the shared Page Introduction component.
- Verified JavaScript syntax, route-specific banner selection, responsive banner rules, external-link safety attributes, and unchanged Duaa collection/tracking behavior.

## v3.4.1 — Page Epigraph & Navigation Typography Polish

### Changed

- Replaced the Duaa Home reflection card with the new sitewide centered page-epigraph pattern.
- Removed the “Reflection” label and all quote background, border, and card styling.
- Added a reusable module-colored geometric divider beneath page-introduction quotations.
- Refined module navigation typography for clearer Windows/browser rendering using stronger contrast, moderate weight, whole-pixel-equivalent sizing, and flex alignment.
- Updated page-introduction and design-decision documentation.

### Preserved

- Approved Duaa Home banner artwork, banner copy, navigation routes, Duaa data, tracking, readers, account controls, and application services.

## v3.4.0 — Duaa Home Banner & Page Introduction Refresh

### Added

- Installed an intentionally composed, 190-pixel-tall Duaa Home banner using the approved blue coastal artwork.
- Added a route-specific Duaa Home banner treatment without changing banners on other Duaa pages.
- Added a concise Reflection section beneath the banner using Qur’an 40:60.

### Changed

- Simplified the Duaa Home banner overlay to `DUAA`, `Duaa Home`, and the purpose statement “Authentic supplications for every stage of your day.”
- Removed the duplicate editorial introduction from the Duaa Home content area.
- Applied a left-side readability gradient while preserving the mosque, lantern, and account control on the right.
- Updated the visible application version and release metadata to v3.4.0.

### Validation

- Confirmed the approved source artwork was cropped directly to the app’s 190-pixel banner height.
- Confirmed Duaa collection, reader, navigation, and account-menu behavior remain unchanged.

## v3.3.0 — Duaa Learning Reader & Global Knowledge Foundation — 2026-07-25

### Added

- Added shared global source and study-resource libraries for use across all Ummiby Companion modules.
- Added explicit `segments`, `sourceIds`, `virtue.sourceIds`, and `resourceIds` relationships to all 44 Duaa records.
- Added a three-column desktop learning view: Transliteration, English, and Arabic.
- Added an Arabic-first stacked mobile learning view.
- Added recitation-count, virtue, evidence, grade, and source-link presentation to Duaa Reading Mode.
- Added verified-link readiness; source citations display safely as Link pending until a URL is supplied.

### Preserved

- Preserved all 44 existing Duaa records, seven collections, completion state, worship history, custom ordering, reading preferences, resource content, routes, authentication, and account-menu behavior.

### Release QA

- Confirmed every Duaa has aligned learning segments.
- Confirmed all Duaa source IDs resolve to the shared source library.
- Updated application version metadata and documentation to v3.3.0.

## v3.2.2 — Account Menu Polish & Layout Fixes — 2026-07-25

### Fixed

- Prevented the account dropdown from being clipped by the module banner and covered by the sticky module navigation.
- Removed the overlapping-avatar appearance by increasing the trigger-to-menu spacing and strengthening the menu stacking order.
- Kept the dropdown fully visible on desktop and narrow screens.

### Changed

- Replaced the pill-shaped profile trigger with a simpler circular avatar and chevron.
- Increased the dropdown width, spacing, corner radius, and elevation.
- Added a subtle open animation and chevron rotation.
- Renamed the unauthenticated local state from Local Preview to Preview Mode.

### Release QA

- Preserved authenticated user details, profile dialogs, preferences, About, and Sign Out.
- Preserved all module routes, navigation, data keys, and Supabase startup behavior.
- Updated visible release metadata to v3.2.2.

## v3.2.1 — Account Menu Visibility Fix — 2026-07-25

### Fixed

- Fixed the profile circle being completely absent when the app ran without a local Supabase configuration.
- The shared banner now renders a clearly labeled Local Preview profile control so the account-menu UI can be seen and tested during local development.
- Authenticated sessions continue to use the real user name, email, initials, profile dates, and Sign Out action.
- Fixed outside-click closing so it continues working every time the account menu is reopened.

### Release QA

- Preserved login, signup, password reset, session restoration, and authenticated sign-out behavior.
- Preserved all existing modules, routes, navigation, Duaa records, reading settings, and local-storage keys.
- Updated release metadata and visible version references to v3.2.1.

## v3.2.0 — Account Menu & Session Management — 2026-07-25

### Added

- Added a reusable profile-circle control to the upper-right of every authenticated application banner.
- Added an account dropdown with My Profile, Preferences, About Ummiby Companion, and Sign Out.
- Added generated initials with display-name and email fallbacks for all users.
- Added read-only profile information sourced from the authenticated user and profile identity.
- Added accessible dialogs, Escape handling, outside-click closure, and a sign-out confirmation step.

### Changed

- Removed the temporary signed-in strip and its inline Sign Out button from module content.
- Established the account menu as the single shell-level home for user and session controls.
- Updated all release references to v3.2.0.

### Compatibility and regression protection

- Preserved email/password login, signup, reset, session restoration, and Supabase auth-state behavior.
- Preserved all existing routes, module navigation, Qur’an layouts, Ramadan layouts, Duaa data, completion records, worship history, custom ordering, and reading preferences.
- Preserved local-development rendering when Supabase configuration is absent.

## v3.1.0 — Application Services Foundation — 2026-07-25

### Added

- Added `js/supabase.js` as the single source of Supabase initialization and client access.
- Added `js/preferences.js` for centralized loading, in-memory access, clearing, and saving of account preferences.
- Added `docs/APPLICATION-SERVICES.md` with service boundaries and future implementation rules.
- Activated profile-backed application identity during startup.

### Refactored

- Reduced `js/auth.js` to authentication responsibilities only.
- Rebuilt startup around the ordered sequence: Initialize Supabase, Restore Session, Load Profile, Load Preferences, Initialize Identity, and Render Application.
- Reused one application-context loader for restored sessions and later authentication state changes.
- Removed duplicated Supabase configuration, client initialization, session restoration, and profile-loading responsibilities.

### Compatibility and regression protection

- Preserved the existing email/password authentication screens and actions.
- Preserved persistent sessions, password reset redirects, and sign-out behavior.
- Preserved local operation when Supabase configuration is absent.
- Preserved all existing routes, shell rendering, Qur’an layouts, Ramadan layouts, Duaa content, worship records, completion records, custom ordering, and reading preferences.
- Kept existing Duaa local-storage data in place without migration or key changes.

### Cleanup

- Removed the obsolete v3.0.0 identity note stating that identity was intentionally disconnected from startup.
- Established one client owner and one startup path to prevent future service duplication.
- Updated version and release references to v3.1.0.

## v3.0.0 — Supabase Milestone 1 Foundation — 2026-07-25

### Added

- Added ordered SQL migrations for application roles, profile upgrades, automatic profile creation, role helpers, RLS policies, and controlled admin functions.
- Preserved compatibility with the existing `user_id`-based profiles and app-preferences foundation.
- Added a vanilla-JavaScript identity module without activating login gating.
- Added permanent Supabase setup, database reference, and schema documentation.
- Established the rule that applied migrations are never edited; later changes receive new numbered migrations.

### Security

- New accounts default to the regular `user` role.
- Active users may read only their own profile unless they are the super admin.
- Sensitive role and active-status updates are reserved for controlled super-admin operations.
- No service-role credential is included in browser code.

### Compatibility

- Existing visible app behavior and module data remain unchanged while the database foundation is tested.

## v2.2.4 — Qur’an Reading Bar Alignment — 2026-07-25

- Removed the separate background behind **Exit Reading Mode**, allowing the rich green header color to remain uninterrupted.
- Centered the Reading Unit label and ayah range within a balanced three-part top bar.
- Expanded the top and bottom reading bars to the full page width, following the Duaa Reading Mode structure.
- Adopted the richer bottom-bar green for the top bar as well.
- Kept the bottom bar compact and shortened the centered unit or section progress indicator.
- Refined the Qur’an **Mark Complete** control to mimic the Duaa action-button treatment in the Qur’an color palette.

## v2.2.3 — Qur’an Reading Mode Refinement

- Changed the top-left reading control to clearly say **Exit Reading Mode** and return directly to Qur’an Home.
- Added a Qur’an reading settings dialog based on the Duaa reader, focused on Arabic text size while retaining the side-by-side English layout when space allows.
- Removed the upper unit and surah progress bars so reading progress appears only in the bottom navigation.
- Slimmed the bottom reading bar and centered a shorter progress indicator with a clear percentage label for the current unit or surah.
- Added a visible **Study Library below** cue between the reading passage and the green Study Library.
- Preserved the v2.2.2 Qur’an Home layout without further changes.

## v2.2.2 — Qur’an Home and Reading Workspace Polish

- Added **Switch Journey** to the Continue Reading feature card.
- Rebuilt the Qur’an Home as an aligned two-column layout whose supporting progress column ends at the same height as the main reading feature.
- Preserved the Friday behavior: Surah al-Kahf replaces the left Continue Reading feature while the right-side consistency and reading progress remain visible.
- Widened the shared Qur’an reading workspace and increased the Reading Unit label size in the green top bar.
- Removed the duplicate Reading Unit heading from the content area.
- Replaced topic pills with a connected bulleted Topics in this Unit list.
- Reworked the Qur’an Study Library to use the Duaa Study Library interaction and visual pattern with green theming.
- Rebuilt the bottom reading controls to match the Duaa action-bar pattern, including a prominent Mark Complete action and integrated passage progress bar.
- Preserved existing Duaa data, routes, and Qur’an vision-layout pages.

## v2.2.0 — Qur’an Vision Layouts

- Added a clickable rough draft of the redesigned Qur’an Home.
- Added Reading Journeys with Reading Unit and Classic Journey cards.
- Added Special Readings with Friday Reading, Ayat al-Kursī, the last two ayat of al-Baqarah, and Surah al-Mulk.
- Added shared visual reading workspaces for Reading Unit, Classic, Friday Reading, and Ramadan Reading.
- Moved the Ramadan Reading Journey into Ramadan Central while reusing the Qur’an reading workspace pattern.
- Preserved the completed Duaa module and inline Study Library behavior.

## v2.1.9 — Duaa Workspace Alignment

### Changed

- Removed the narrow centered desktop constraint from Duaa pages so collection content begins farther left and uses the available workspace more naturally.
- Rebuilt the collection grid’s left rail so Today’s Status is genuinely centered in the full white-space area rather than moved with a small transform.
- Further inset the Study Library category rows and capped their width so the pale-blue section remains clearly visible on both sides.

### Preserved

- All v2.1.7 functionality, 44 duaas, stable IDs, completion data, worship history, custom ordering, reading preferences, and the `ummiby.duaa.v2.1` storage key.

## v2.1.7 — Duaa Final Layout Alignment

### Changed

- Shifted the complete Today’s Status rail left from the collection grid rather than repositioning only its inner text.
- Centered the Today’s Status heading and status block within the left rail.
- Narrowed Study Library category rows slightly so the section’s blue background remains visible along both sides.

### Preserved

- All v2.1.6 functionality, 44 duaas, stable IDs, completion data, worship history, custom ordering, reading preferences, and the `ummiby.duaa.v2.1` storage key.

## v2.1.6 — Duaa Experience Polish

### Added

- Added circular icons beside the tracked collection titles on Duaa Home.
- Added a reversible **Mark Done / Done Today** action directly on every tracked collection card.
- Added accessible information tooltips for weekly-consistency and drag-order guidance.
- Added a Reading Preferences dialog opened from a gear in the Reading Mode bar.
- Added persistent Arabic font-size, English translation, and transliteration preferences.
- Added rich Study Library category rows, internal category views, resource counts, empty states, and external-resource notices.

### Changed

- Moved Today’s Status farther left and widened the duaa list column.
- Standardized collection-row height by visually truncating long descriptions to one line.
- Changed the Reading Mode bar to the same dark blue used by Duaa navigation, with white controls and progress text.
- Removed the Duaa Settings item from module navigation because reading controls now live inside Reading Mode.
- Replaced the sterile Study Library table with the approved Option 2 rich-row presentation and a clearer visual transition from reading to study.

### Preserved

- All 44 duaas, stable IDs, completion data, worship history, custom ordering, and the `ummiby.duaa.v2.1` storage key.

## v2.1.5 — Duaa Visual Refinement

### Changed

- Reduced the dashboard-card appearance of tracked collection status and progress areas.
- Refined Daily Companion card spacing, hierarchy, weekly consistency, and recorded-state color.
- Improved Duaa row alignment, long-title wrapping, hover behavior, focus visibility, and mobile spacing.
- Reworked Reading Mode into a stable, full-width sticky band with fixed progress alignment.
- Improved Arabic, transliteration, meaning, source, controls, and Study Library spacing.
- Added stronger keyboard focus states and reduced-motion handling.
- Consolidated the visual polish in a dedicated versioned CSS section without changing collection data or stored worship records.

### Preserved

- All 44 restored duaas and their stable IDs.
- Completion, worship history, custom ordering, Reading Mode order, and the `ummiby.duaa.v2.1` storage key.

## v2.1.4 – Duaa Interaction Polish

- Added a familiar six-dot SVG drag handle and restricted reordering to the handle.
- Added grab and grabbing cursor feedback and removed the obsolete up/down reorder controls.
- Reordered each Duaa row to drag handle, completion control, title, and Read action.
- Changed completion styling to gray outlined checks for incomplete items and dark blue filled checks for completed items; titles no longer turn green.
- Replaced the one-way daily worship action with a reversible Record Today / Recorded for Today toggle.
- Returned weekly consistency to the bottom of each tracked Daily Companion card and removed the separate Home consistency section.
- Kept the Study Library visible in Reading Mode with zero-count Audio, Video, Articles, Books, and Tweets categories.
- Stabilized the Reading Mode header height and completed a focused cleanup of obsolete reorder code and CSS.

## v2.1.3 – Full Duaa Collection Restoration

- Restored all 44 duaas from the complete v0.5.5 collection package.
- Restored 16 Morning, 15 Evening, 3 Before Sleep, 2 Travel, 5 Weather, 2 Prayer, and 1 Istikharah entries.
- Preserved source references, repeat guidance, focus phrases, virtues, verification metadata, and resource arrays.
- Added compatible legacy ID migration for existing completion and custom-order state.
- Kept the established `ummiby.duaa.v2.1` storage key so worship history is not reset.
- Added `js/version.js` as the single source for the visible app version.
- Moved collection content into `js/data/duaa-collections.js` to reduce technical debt in the behavior layer.
- Added a complete data-integrity audit and regression tests for collection counts, required fields, duplicate IDs, saved-order behavior, and legacy completion migration.

## v2.1.1 – Duaa Navigation & Collection Polish

- Moved the sticky Duaa module navigation beneath the hero so every normal route opens with the hero first.
- Replaced active-tab underlines with a quiet background highlight.
- Removed the local Supabase setup reminder from the app workspace.
- Restored the Weekly Consistency overview on Duaa Home.
- Consolidated Travel, Weather, Prayer, and Istikharah under a single Collections navigation item and added a visual collection-library page.
- Flattened and shifted the tracked collection progress area left so it no longer appears as a card.
- Replaced Reading Mode module navigation with a dedicated colored top band and ensured all route changes start at the top.
- Added persistent user-controlled duaa ordering with drag handles and accessible up/down controls.


## v2.1.0 – Duaa Collection & Reading Experience

- Added sticky Duaa module navigation with mobile horizontal scrolling.
- Removed breadcrumbs from Duaa pages.
- Added tracked Morning, Evening, and Before Sleep collection pages.
- Separated collection completion from the daily worship record; one duaa counts.
- Added manual daily worship recording and Sunday–Saturday consistency display.
- Added untracked Travel, Weather, Prayer, and Istikharah collections.
- Replaced the old modal/focus concept with dedicated full-page Reading Mode.
- Reading Mode hides the global sidebar, retains subdued module navigation, and supports Previous/Next navigation.
- Added local persistence for completion and worship-record state.
- Updated version labels and documentation.

## v2.0.3 — App Shell Polish Pass 2A: Banner & Canvas Refinement

- Replaced the temporary illustrated shell hero with a restrained complementary module-color background.
- Reduced banner title scaling so longer module headings remain on one line at desktop widths.
- Reduced banner subtitle size and prevented desktop wrapping.
- Shifted the main application canvas to a clean warm white.
- Preserved responsive wrapping on smaller screens.
- Documented the preferred future imagery direction based on the established Duaa module visuals.

## v2.0.2 — App Shell Polish Pass 2: Bright & Welcoming

- Reworked the Brand Panel and App Sidebar to use bright white and near-white surfaces.
- Retained the circular U brand mark with a lighter, friendlier presentation.
- Replaced the wide sidebar selection pill with a more compact active tile and removed the dark dashboard styling.
- Kept Phosphor sidebar icons at 36px and expanded the sidebar label to “Names of Allah.”
- Added a simple, text-free shared hero illustration sized to the existing 190px module banner area.
- Kept banner headings and descriptions as accessible HTML, separate from the artwork.
- Updated the App Home greeting to “Welcome” with a concise description of the companion.
- Brightened the canvas, borders, card shadows, and responsive shell presentation.
- Completed a focused cleanup and version consistency pass.

## v2.0.1 — App Shell Polish Pass 1

### Changed

- Replaced the temporary hand-drawn sidebar SVG set with consistent Phosphor Regular icons.
- Standardized desktop sidebar icons at 36px.
- Selected House, Book Open Text, Heart, Star, Moon, and Gear icons.
- Reworked the sidebar into a crisp dark-blue navigation rail inspired by Momentum while preserving Ummiby Companion’s warmer personality.
- Removed the vertical active-item accent line.
- Added a bright rounded active card with stronger contrast and clearer hover states.
- Brightened canvas, cards, borders, and module theme colors to reduce the previous matte appearance.
- Simplified the Module Banner by removing decorative ring/blob effects.
- Refined typography, content spacing, card rhythm, navigation spacing, and mobile behavior.
- Added the visible release number to the Brand Panel.
- Added reduced-motion support for shell navigation transitions.

### Preserved

- Semantic HTML, modular CSS, and native JavaScript architecture.
- Existing client-side routing, Supabase authentication boundary, module registry, and placeholder module views.
- Memorization remains inside the Qur’an module rather than becoming a separate app-sidebar destination.

## v2.0.0 — App Shell Foundation

### Added

- Clean Version 2 repository and source structure.
- Permanent two-by-two App Shell with Brand Panel, Module Banner, App Sidebar, and Module Workspace.
- Sticky Module Nav Bar and shared Module Content area.
- Responsive desktop and mobile layouts.
- Central design tokens and module theme system.
- Configuration-driven module registry.
- App Home, Qur'an, Duaa, Names of Allah, Ramadan, and Settings registrations.
- Client-side History API navigation with browser back/forward support.
- Shared placeholder Content Views for the foundation release.
- Supabase email/password sign-in, registration, persistent sessions, sign-out, and password reset foundation.
- Password-manager-friendly form autocomplete attributes.
- Protected local Supabase configuration template.
- Foundational `profiles` and `app_preferences` tables with Row Level Security.
- Automatic creation of profile and preference rows for new users.
- Architecture and App Shell vocabulary documentation.

### Intentionally deferred

- Final app logo and banner artwork.
- Production Supabase credentials and hosted deployment configuration.
- Full feature migration from Version 1.
- Module-specific database tables.
- Offline caching and realtime multi-device updates.


## 2.1.9 — Duaa Inline Study Library

- Narrowed Duaa Home independently from collection pages.
- Added a light card cue around Today's Status.
- Converted Study Library categories to expandable in-page sections with inline resources and empty states.
## v3.4.24 — Qur’anic Duaa Filter Dropdown Polish
- Widened and left-aligned the Browse Collection sidebar.
- Added independent sidebar scrolling.
- Replaced visible filter chips with multi-select dropdown checklists.
- Added compact selection summaries and retained clear-filter behavior.

## 3.7.4 — Duaa History Layout and Banner Polish

- Refined the Morning, Evening, and Before Sleep history selector into substantial rounded rectangular controls.
- Matched Monthly Insights to the Monthly Record calendar height on desktop while preserving natural stacked heights on smaller screens.
- Reworked the accepted light clock artwork into a sharper panoramic banner that fills the standardized banner area.
- Removed obsolete Selected Day styling left from earlier History iterations.

### v3.8.0 Qur'an Home shell correction
- Restored the established 190px panoramic banner contract on Qur'an Home.
- Prevented the Qur'an hero from overflowing its app-shell grid row and covering the module navigation.
- Restored visibility of the global sidebar and Qur'an module navigation beneath the hero.
- Re-cropped the Qur'an hero artwork for the shallow application banner rather than a standalone large hero.
- Returned hero typography to the global banner scale and responsive safe zones.

### Startup correction

- Corrected a JavaScript string syntax error in the Reading Journeys copy that could leave Live Server on the opening screen.
- Updated release asset cache keys to v3.8.3 so older JavaScript modules are not mixed with the new build.
- Added a safe local-preview `js/config.js` placeholder.


## v3.8.3 – Reader Framework & Reading Unit Experience
- Introduced the reusable Ummiby Reader Framework.
- Redesigned the Reading Unit reader with matching Qur’an top and bottom bars.
- Added a sticky About This Reading Unit companion panel with topics, study resources, and progress.
- Preserved the Previous / primary action / Next control group.
- Added deliberate Save My Place behavior; scroll position is never treated as proof an ayah was read.
- Added saved-place resume guidance and persistent local progress.
- Added responsive desktop and mobile reader layouts.
