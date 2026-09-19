## Context

See proposal.md - Why. The Astro site (on `refactor/astro-replatform`) has a repeatable page pattern: dedicated `.astro` pages under `src/pages/` wrap `PageLayout` with a hero and data-driven content, stat badges render from committed JSON (`src/data/stats.json` + `stats.ts`, refreshed by `scripts/fetch-github.mjs`), nav/homepage entries live in `src/data/nav.ts` / `homepage.ts`, and covers are 1600x600 gradient SVGs in `public/covers/`. Skratch's share URL is backed by the fully public API `api2.skratch.world/share-api` (no auth), and the share page headers permit iframing (no `X-Frame-Options` / `frame-ancestors`).

## Goals / Non-Goals

**Goals:**
- A `/travel` page that follows the existing page patterns (PageLayout hero, stat badges, cover) so it is visually and structurally consistent.
- Stats that render from committed site data, refreshed by a script hitting the public Skratch API — no secrets and no private-repo access.
- The Skratch map embedded live via public share URL, so it stays current with zero maintenance.

**Non-Goals:**
- Not building a custom self-hosted map renderer (iframe chosen deliberately).
- Not restructuring other pages or the sections collection.
- Not fetching Skratch data during the Netlify build — stats are committed via the refresh script, keeping builds hermetic.
- Not sourcing badges from wander-atlas (private repo; would require manual refresh with no CI access).

## Decisions

### 1. Dedicated `travel.astro` page (not a sections markdown entry)
The page needs custom markup (stat badge row, iframe, link) that a markdown body cannot express. Pattern follows `open-source.astro` / `industry.astro`.
**Alternative considered:** a `src/content/sections/travel.md` entry rendered by `[...slug].astro` — rejected because the iframe/badges would require markup abuse or a new renderer.

### 2. Committed stats data file + refresh script from the public Skratch API
New `src/data/travel.json` (committed) + `src/data/travel.ts` typed accessor, refreshed by `scripts/fetch-travel.mjs` from the public Skratch share API (`api2.skratch.world`, no auth) — the `fetch-github.mjs` → `stats.json` flow.
Data contract (countries split from territories, plus regions and world coverage):
```json
{
  "countries": 36,
  "territories": 7,
  "regions": 93,
  "cities": 384,
  "places": 269,
  "worldRegions": 7,
  "worldRegionsTotal": 10,
  "worldPct": 18
}
```
Countries and territories are split by matching the visited territory codes against Skratch's 195-entry country catalog (`/share-api/map`); codes not in the catalog (dependencies, islands) count as territories. `regions` is the marked sub-national region count, `cities` and `attractions` the marked city and place/attraction counts, and world coverage is derived from which of Skratch's 10 world regions contain visited countries. Values track the live map, so they can shift between refreshes.
**Alternatives considered:** (a) wander-atlas numbers — faithful to Triplt trip logs but private, demanding manual refreshes with no CI access; (b) fetching Skratch in the Astro build itself — rejected to keep builds deterministic; the committed JSON matches the existing stats-json pattern.

### 3. Skratch map via iframe
Embed `https://share.skratch.world/N0cBlEVoB8/visited` with `loading="lazy"`, `width: 100%`, fixed responsive height (~560px), `border: 0`, `title` for accessibility, plus a caption link "Open full map ↗" that targets the article in a new tab.
**Alternative considered:** render our own map from the public Skratch API data — rejected for scope (map library, markers, dark mode parity); the live iframe also self-maintains.

### 4. Stats `travel.ts` shape and badge rendering
Typed accessor exposing the numbers; the page renders a badge row copied from the `open-source.astro` stat-badge markup (`stat-badge` / `stat-value` / `stat-label` classes). Five headline badges: 🌍 countries, 🏝️ territories, 🗺️ regions, 🏙️ cities, 🏛️ attractions, followed by a muted caption with world coverage (`7 of 10 world regions · 18% of the world's countries`).

### 5. Nav + homepage + cover integration
- `nav.ts`: add `{ label: 'Travel', href: '/travel' }` after Library.
- `homepage.ts`: add card `{ permalink: 'travel', title: 'Travel', icon: '✈️', blurb: 'Where we've traveled — maps, stats and more', cover: '/covers/travel.svg' }`.
- `public/covers/travel.svg`: new 1600x600 gradient SVG matching the existing cover style (e.g. sky→teal gradient with translucent circles).

### 6. Search reachability
Extend `src/pages/search.json.ts` with a static Travel entry (title "Travel", url `/travel`, short body from the page description) so `/travel` is findable through navbar search. Kept to Travel only — not expanding to other dedicated pages in this change.

### 7. Footer link to Skratch map
Add `{ name: 'Skratch', href: 'https://share.skratch.world/N0cBlEVoB8/visited', icon: 'fa-solid fa-map-location-dot' }` to `src/data/socials.ts`, rendered by the existing `SocialLinks.astro` icon row. Font Awesome has no Skratch brand icon, so a solid map-pin icon is used (matching the `fa-brands`/`fa-solid` class convention already in use).

## Risks / Trade-offs

- [Iframe shows Skratch app chrome (tabs/header) instead of a clean map] → Verified embeddable via headers, but visual polish unconfirmed; caption + "Open full map" fallback link ensures usability regardless; eyeball in `npm run dev` during implementation (spike in tasks).
- [Skratch stats reflect map-marked places only (385 cities) and count microstates as countries, so they differ from Triplt/wander-atlas totals] → Accepted intentionally: the badges and map share one source and self-maintain; the page copy keeps the framing generic ("marked on our map").
- [Stats go stale if refresh script isn't run] → Committed JSON means the build never breaks; the script only needs the public API, so it can be automated (e.g. a weekly PR) later like `refresh-github-stats.yml`.
- [Iframe is a heavy client-side SPA] → `loading="lazy"` prevents render blocking; acceptable for a single travel page.
- [Work lives on unmerged Astro branch] → No production impact until the port ships; the page rolls back with the branch.

## Migration Plan

1. Implement on `refactor/astro-replatform`: add `travel.astro`, data files, script, cover, nav/homepage entries, search entry.
2. Run `scripts/fetch-travel.mjs` locally to populate `travel.json`, commit it.
3. `npm run dev` smoke test: /travel renders hero, badges, iframe, IG link; nav and homepage card link correctly.
4. `npm run build` and verify `/travel` in output + sitemap.
5. Ships when the Astro port merges/deploys. Rollback: revert the travel commits on the branch.

## Open Questions

- Whether the share-page iframe needs a custom background/wrapper for visual parity in dark mode — settled by the implementation smoke test.