# Ummiby Companion v3.37.0 — Home Prayer Status & Top-Right Layout

## Home layout
- Moved Today’s Prayer into the upper-right of the main content area on desktop.
- Raised the combined content region farther into the hero to support the one-screen Home goal.
- Reflowed the three activity cards into a large primary card with two compact supporting cards.
- Added responsive fallbacks that place Prayer above activities on narrower screens.

## Prayer presentation
- Removed boxes, outlines, and divider lines from individual prayers.
- Limited Home to the five obligatory prayers; Sunrise remains available in the Prayer module schedule.
- Each prayer now uses a vertical stack: status circle, time-of-day icon, prayer name, and prayer time.

## Prayer status interaction
- Clicking any prayer column opens a floating status card.
- Choices: Prayed on time, Prayed late, Missed, and Clear status when an entry exists.
- The menu closes without changing data when clicking outside or pressing Escape.
- Statuses are stored per local calendar day.
- Existing boolean completion entries migrate in place as `on_time` when read.

## Status styling
- Unrecorded: gray outlined circle with gray check.
- On time: Ancient Gold filled circle with white check.
- Late: muted gold filled circle with white clock.
- Missed: muted dusty tone with white X.
