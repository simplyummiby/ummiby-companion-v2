# Page Epigraph Standard

## Purpose

Page Epigraphs create a calm, recognizable transition between a page banner and its functional content. Across the Duaa module, they provide a short authentic quotation or reminder without introducing another card, panel, or competing page header.

Every Duaa landing or collection page should use the shared Page Epigraph renderer rather than page-specific quotation markup.

## Component Structure

The reusable renderer is `pageEpigraph()` in `js/shell.js`. It accepts one configuration object:

- `context` — optional introductory sentence shown above the quotation.
- `quote` — required main quotation.
- `citation` — required source attribution. It may be a string or an array of strings for stacked citation lines.
- `detail` — optional explanatory or transmission note.
- `externalLink` — optional source object with `label` and `url`, rendered as one inline source-text link with a Phosphor external-link icon.

Only populated fields are rendered. Optional fields must not reserve space when omitted.

## Shared Markup Classes

- `.page-epigraph` — centered component container.
- `.page-epigraph-context` — optional introductory context.
- `.page-epigraph-quote` — primary quotation.
- `.page-epigraph-citation` — citation wrapper and stacked citation layout.
- `.page-epigraph-detail` — optional explanatory note.
- `.page-epigraph-source` — optional source-line wrapper.
- `.page-epigraph-link` — inline source text and Phosphor `arrow-square-out` icon contained in one clickable element.
- `.page-epigraph-divider` — shared decorative divider and content separation.

Do not create collection-specific quotation classes or duplicate the shared markup.

## Typography

### Context

- `0.9rem`
- Semibold (`600`)
- Duaa accent color
- Normal, not italic
- `10px` below the context

### Quote

- Serif face
- Italic
- Desktop: `1.3rem`
- Tablet: `1.2rem`
- Mobile: `1.1rem`
- Weight approximately `400–500`
- Line height approximately `1.7`
- Maximum line width approximately `680px`

### Citation

- `0.95rem` desktop
- Muted gray
- Medium weight (`500`)
- Begins approximately `18px` below the quotation
- Multiple lines stack with restrained spacing

### Detail

- `0.85rem`
- Muted gray
- Line height approximately `1.5`
- Begins approximately `10px` below the citation

### External Link

- Small diagonal-arrow control
- Uses the Duaa accent color
- Begins approximately `10px` below the citation group
- Opens in a new tab with an accessible label

## Spacing

- Component width: up to `780px`, matching the main content rhythm.
- Use approximately 24–28px of total breathing room between the module navigation and the epigraph. Duaa pages do not currently render breadcrumbs, so this spacing is visual breathing room—not a reserved breadcrumb row.
- Divider begins approximately `24px` after the epigraph text.
- Divider includes approximately `32px` of separation before page content.
- The overall component bottom margin remains compact and consistent across pages.

The intended page rhythm is:

1. Banner
2. Module navigation
3. Page Epigraph
4. Page content

## Adding Future Epigraphs

1. Add the page configuration to `DUAA_EPIGRAPHS` in `js/shell.js`.
2. Use a stable key that matches the collection or page route.
3. Supply only the fields the page needs.
4. Use an array for citations that should appear on separate lines.
5. Preserve exact source wording and punctuation.
6. Do not add manual `<br>` elements, empty strings for spacing, or page-specific CSS.
7. Use an external link only when a trusted destination has been selected.
8. Confirm desktop, tablet, and mobile wrapping before release.

## Regression Guidance

When changing the component, verify that:

- Pages without context, detail, or links contain no blank vertical gaps.
- Multi-line citations remain centered and readable.
- The Morning external source link remains keyboard accessible.
- Collection controls, history tracking, navigation, and reader routes remain unchanged.
- The shared divider appears once on each epigraph page.


## Duaa page hierarchy

Duaa pages use this order:

1. Banner
2. Module navigation
3. Page Epigraph
4. Page content

Do not add a breadcrumb placeholder, duplicate page title, secondary subtitle, or introductory heading between the module navigation and the epigraph. The banner identifies the page and the epigraph is the first element inside page content.

## Approved Duaa accent

The single approved solid Duaa accent is `#1F639F`. Primary navigation, primary buttons, active completion circles, progress fills, and other solid blue interaction states must resolve to this value through the shared Duaa theme tokens. Lighter backgrounds may continue to use derived soft tints.

### External source links

When an epigraph includes an external source, provide both a descriptive `label` and a `url`. The source label and Phosphor `arrow-square-out` icon must render inside the same `inline-flex` anchor. Do not use a detached icon-only row, and do not underline the source when the icon is present. The icon may never wrap onto a line by itself.

### Quote leading

Use a desktop/tablet line-height near `1.5` and a mobile line-height near `1.55`. This keeps multi-line quotations cohesive while preserving readability.
