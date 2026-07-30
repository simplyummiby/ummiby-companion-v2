# Duaa Focus Mode

## Layout

Focus Mode is a dedicated reading workspace framed by sticky blue top and bottom bars.

- The top bar contains Exit Reading Mode, the centered collection title and item count, a thin progress bar, and reading preferences.
- The left panel contains Evidence and Virtue / Benefit at all times.
- Study Resources use one expandable section. Inside it, resources are grouped by category without nested accordions.
- The main reading area contains only the duaa summary title, repetition guidance when applicable, and phrase-by-phrase text.
- Phrase columns remain Transliteration on the left, English in the center, and Arabic on the right.
- The bottom bar contains a centered Previous / completion toggle / Next control group.

## Completion Toggle

- Incomplete: white `Mark Complete` pill.
- Complete: powder-blue `✓ Completed` pill.
- The control is reversible and updates the current duaa's completion state.

## Responsive Behavior

On narrower screens, the reading area appears first and the About This Duaa panel follows it. Phrase columns stack with labels while preserving Arabic right alignment.


## v3.6.0 Read and Learn modes

- **Read** is the everyday view: complete English on the left and complete Arabic on the right in one uninterrupted row.
- **Learn** keeps the three-column phrase-by-phrase layout for transliteration, English, and Arabic.
- The selected mode persists while moving through the collection and across sessions.
- If segmented content is unavailable, Learn is disabled rather than rendering an incomplete layout.
