## Why

The site has no travel content, yet travel is a significant part of life and already has two data sources ready to surface: a wander-atlas stats profile and a live Skratch travel map. A dedicated Travel page showcases travels with high-level stats, the Skratch map, and a link to Cassie's travel Instagram — with no manual upkeep for the map, and near-zero upkeep for the stats.

## What Changes

- **New `/travel` page** on the Astro site: full-width hero cover, a row of high-level stat badges (from the public Skratch share API), an embedded Skratch map iframe, and a link to the travel Instagram account.
- **Travel stats in the site repo**: add a committed `src/data/travel.*` data file (JSON + typed accessor) populated by `scripts/fetch-travel.mjs` from the public Skratch share API (`api2.skratch.world`, no auth), following the existing `fetch-github.mjs` → `stats.json` pattern. No secrets or private-repo access needed.
- **Skratch map embedded** from the public share URL `https://share.skratch.world/N0cBlEVoB8/visited` via a lazy-loaded `<iframe>`, with a fallback link out to the full map.
- **Navigation and homepage integration**: add `Travel` to the navbar links and a Travel card to the homepage card grid.
- **Cover art**: add `public/covers/travel.svg` in the existing gradient-cover style.

## Capabilities

### New Capabilities
- `travel-page`: The `/travel` page capability — renders hero, stat badges (populated from the public Skratch share API), embedded Skratch map, and the travel Instagram link, backed by a committed stats data file.

### Modified Capabilities
- `site-design`: The "Cover-image hero banners" and "Card-based homepage layout" requirements enumerate the site's top-level pages and homepage cards; they now include Travel.

## Impact

- **Astro source** (`refactor/astro-replatform`): new `src/pages/travel.astro`, `src/data/travel.{ts,json}`, `scripts/fetch-travel.mjs`, `public/covers/travel.svg`; edits to `src/data/nav.ts`, `src/data/homepage.ts`, and `src/pages/search.json.ts`.
- **External services**: Skratch public share API (`api2.skratch.world/share-api/...`) read by the local fetch script to populate the committed stats; Skratch share page embedded as the map.
- **No production impact until the Astro port itself is deployed** (currently on an unmerged branch).