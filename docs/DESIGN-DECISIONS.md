# Design Decisions

Living document recording major UX and visual decisions with rationale, alternatives considered, outcome, and status. Initial entries include artwork philosophy, banner standard, typography safe zone, module identities, reflections, authentic architecture, lighting philosophy, and situation-based banners.

## DD-011 — Install the Final Visible Crop

### Decision

Banner artwork is installed as the final shallow crop that users will see, rather than as a tall source image relying on browser cropping.

### Reasoning

This makes the composition intentional, keeps focal elements predictable, and prevents responsive `background-size: cover` behavior from deciding the artwork. The Duaa Home banner established the initial 190-pixel desktop standard.

Status: Active

## DD-012 — Sitewide Centered Page Epigraph

### Decision

Major module home pages use a centered English quotation with no heading, card, background, or border. A small geometric divider in the active module color completes the introduction.

### Reasoning

The quotation should feel like a page epigraph and a brief pause before interaction, not another dashboard component. Shared structure creates a recognizable sitewide rhythm while module-colored accents preserve orientation.

Status: Active

## DD-013 — Crisp Module Navigation Typography

### Decision

Module navigation uses system-rendered sans-serif text at a whole-pixel-equivalent size, moderate bold weight, increased white contrast, and flex alignment.

### Reasoning

The previous extra-heavy, partially transparent text could appear soft or blurry on some Windows/browser combinations. The revised treatment prioritizes legibility and crisp rendering without changing navigation structure.

Status: Active

