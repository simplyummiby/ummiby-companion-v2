# Ummiby Companion v3.35.0 Build Report

## Integrated Masthead and Today’s Prayer

### Home-only changes
- Integrated the module navigation into the upper masthead between the Ummiby brand and account controls.
- Enlarged module icons and placed each icon above its label.
- Removed the separate Home navigation bar from the page flow.
- Increased the live status strip height and icon size; divided current prayer, next prayer, location, and weather into clearer groups.
- Kept saved location labels in the status strip and retained the existing weather service/fallback behavior.
- Reduced the greeting size and kept “As-salāmu ʿalaykum” on one line across supported breakpoints.
- Renamed the compact Home prayer section to “Today’s Prayer.”
- Moved Today’s Prayer above the three daily companion cards.
- Reduced the prayer section height and internal row spacing while retaining current/next highlights and completion controls.
- Preserved the full-page courtyard artwork and Developer Preview control.

### Regression checks
- App Home retains all six previewable daily experiences.
- Dynamic artwork background remains a dedicated element.
- Other module shells, banners, sidebars, content widths, readers, sticky headers, and sticky footers were not modified.
- All new visual overrides remain scoped beneath `.dynamic-home-page`.
- Desktop, tablet, and mobile responsive rules are included.
