# Build Report — v3.42.0

## Scope

Cement Companion Home navigation continuity while preserving the accepted Home page and Daily Rhythm experience.

## Navigation rule

Every journey launched from Companion Home retains a clear route back to Companion Home at every level, while normal step-by-step module navigation remains available.

## Labels

- Companion Home: the main Ummiby Companion Station.
- Duaa Home: the Duaa module landing page.
- Qur’an Home: the Qur’an module landing page.

## Implementation

- Daily Rhythm action links record Companion Home as the entry context.
- Destination pages render a contextual trail beginning with Companion Home.
- Module Home remains a separate intermediate destination.
- Reading modes include the same clear Companion Home escape route.
- Returning to Companion Home clears the temporary navigation context.
