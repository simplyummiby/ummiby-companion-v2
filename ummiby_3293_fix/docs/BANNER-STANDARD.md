# Banner Standard

Defines panoramic banner composition, typography safe zone (35–40% left), crop-safe design, lighting, detail level, realism, and restrictions (no embedded text, logos, people, animals).

## Design for the Visible Banner

Banner assets must be prepared for the actual visible banner dimensions rather than treated as full landscape photographs. For the current desktop shell, the target visible height is 190 pixels. The approved source artwork should be cropped into the final banner asset before installation so the repository asset itself represents what users will see.

The larger generation canvas exists only to enable composition and crop selection. It is not the final application asset. Important architecture, atmosphere, and foreground details must remain readable in the final shallow strip.



## Same Place, Different Time of Day — v3.4.2

A related page may use a time-of-day variation of an established banner when the setting itself provides useful continuity. The variant must preserve:

- the same location and architectural landmarks
- the same camera position and composition
- the same horizon and major foreground placement
- the same crop-safe text and account-control zones

Only environmental qualities should shift: daylight direction and warmth, sky color, haze, reflections, and the overall time-of-day mood.

Morning Duaas is the first implementation. It uses the Duaa Home terrace, mosque, sea, composition, and camera position with a distinctly brighter morning treatment. The final repository asset remains cropped to the visible 190-pixel banner height.

## Earlier-Morning Treatment (v3.4.3)

The Morning Duaa implementation uses a softer, slightly dimmer early-morning color treatment rather than a bright late-morning appearance, while retaining the same-place composition.


## v3.4.3 Situational Collection Artwork

Travel, Weather, and Prayer now use dedicated situational banners rather than the generic Duaa module artwork. Each production asset is exported at 1717 × 190 pixels. The artwork may change by collection while the overlay typography, readable contrast treatment, and responsive composition remain consistent.


## v3.4.3.1 Visible-Subject Crop Validation

Situational banner artwork must be re-cropped from the approved source when the collection-defining subject falls outside the final shallow strip. Travel retains the winding road, Weather retains both softened clouds and wet pavement, and Prayer retains the Qur’an stand and prayer-space foreground. Overlay strength must support readability without obscuring those subjects.


## v3.4.4 Evening and Before Sleep Variants

Evening and Before Sleep extend the “Same Place, Different Time of Day” family. Evening preserves the sunset horizon, coastal silhouette, and illuminated mosque. Before Sleep preserves the moonlit sea, mosque, terrace railing, and restful porch seating. Because these scenes are naturally darker, they use individually tuned navy glass overlays with light typography rather than the pale daytime treatment. The overlay must support text contrast without flattening the atmospheric light or concealing the collection-defining details.


## v3.4.4.1 Banner Tuning Standard

Banner presentation values are centralized in `css/banner-tuning.css`. This file is the approved first stop for visual adjustments after installing artwork. Each supported Duaa banner has clearly labeled desktop, tablet, and mobile focal positions. Banners that require an overlay also expose readable alpha variables.

For a quick adjustment:

- change `--banner-position-*` to move the visible crop
- lower an `--overlay-*-alpha` value to reveal more artwork
- raise an `--overlay-*-alpha` value to increase text contrast
- make small changes, usually about `.05`, and verify desktop and mobile

The Before Sleep overlay is intentionally lighter beginning in v3.4.4.1 so the night atmosphere remains peaceful and visible rather than becoming visually heavy.


## Collection discovery pages

The Collections and History pages use their own banners. Situational collections that are intentionally omitted from the module navigation still receive full page banners and remain associated with the Collections navigation state.
