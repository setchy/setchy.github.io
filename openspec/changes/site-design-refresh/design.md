## Context

The site is an Astro 7 static build (`site: setchy.io`, static output). All styling lives in one token-driven stylesheet — `src/styles/global.css` (~1,145 lines) with `:root` (light) and `[data-theme="dark"]` token blocks. Fonts load from Google Fonts CDN in `BaseLayout.astro`. Font Awesome is already bundled (`@fortawesome/fontawesome-free/css/all.min.css`). Navigation, cards, and data files use emoji glyphs. The homepage is a hero + responsive card grid; section pages use cover-image heroes.

The stats pipeline is broken: `.github/workflows/refresh-github-stats.yml` runs `npm ci` against a pnpm-managed repo (no `package-lock.json`), so every run has failed; `travel.json` has no automation at all. `stats.json` shape is pinned by the `typed-data` spec (`github.followers`, `wakatime.hours`) — so that shape stays, and the frozen WakaTime literal is simply never surfaced. See proposal.md — Why for motivation.

## Goals / Non-Goals

**Goals:**
- Introduce one signature accent (indigo family) threaded through the token system, both themes re-tuned.
- Replace Lora/Open Sans with a self-hosted editorial trio; remove the Google Fonts runtime dependency.
- Restructure the homepage hero (typographic: name + positioning statement + stats strip) with the card grid below it.
- Unify section-page hero treatment; replace emoji with Font Awesome/vector iconography across nav, cards, about, and data-driven ROLE_LABELS/TYPE_LABELS.
- Fix the stats automation: pnpm install in CI, add `fetch:travel` to the same weekly refresh/PR flow.

**Non-Goals:**
- No route, content, or page-structure changes; no content migration.
- No WakaTime API integration (requires a token; `wakatime.hours` stays as-is and unused in UI).
- No changes to `src/data/*.json` shapes or the `typed-data` spec.
- No framework swaps, no new runtime JS beyond existing scripts; stays static-first.

## Decisions

### D1. Font trio — Newsreader + Inter + JetBrains Mono (self-hosted)
- **Headings/display:** Newsreader (serif, 400/500/600 + 400 italic) — editorial and contemporary without being trendy.
- **Body/UI:** Inter (400/500/600/700) — neutral, crisp, high legibility at small sizes.
- **Metadata:** JetBrains Mono (400/500) — for stats, dates, tags, technical labels.
- **Distribution:** `@fontsource/*` packages (`font-display: swap` by default; Vite bundles the needed subsets; remove the two Google Fonts `<link>` tags and preconnects from `BaseLayout.astro`).
- **Alternatives considered:** Fraunces + Instrument Sans (trendier, less durable); keeping Lora/Open Sans (safest but keeps the dated signal). Chosen trio optimizes for "clean, modern, durable".

### D2. Signature accent — indigo family
- Light: `--accent: #4f46e5` (indigo-600), `--accent-hover: #4338ca` (indigo-700).
- Dark: `--accent: #818cf8` (indigo-400), `--accent-hover: #a5b4fc` (indigo-300) — lighter in dark for contrast.
- Soft tint tokens for chips/backgrounds: `--accent-soft` (~8–12% alpha of accent, defined per theme).
- **Alternatives considered:** deep teal (`#0d9488`, calm/technical), warm amber (`#d97706`, distinctive but a bigger departure). Indigo wins: it already exists as the tag accent (`--tag-text: #4f46e5`) and fits the tech-radar/engineering association.

### D3. Token evolution, not rewrite
- Keep existing token names (`--bg`, `--text`, `--card-bg`, …) so component rules stay valid; add `--accent`, `--accent-hover`, `--accent-soft`, `--accent-contrast`, `--gradient-accent`, radii scale (`--radius-sm/md/lg`), refined shadow scale (`--shadow-sm/md/lift`), `--font-display`/`--font-mono` (alongside `--font-heading`/`--font-body`), and a `--container` width token (960px → 1040px; prose stays ~720px).
- The gradient is used sparingly: hero flourish and the OSS sponsor button (already gradient) only.

### D4. Homepage: typographic hero + stats strip
- `index.astro` restructured to: avatar, name, positioning line, stats strip, then the card grid.
- Positioning line (copy to confirm during implementation): *"Hi, I'm Adam. Distinguished Engineer & Chief Architect — I build engineering organizations, open source that developers depend on, and communities that scale."*
- **Stats** computed at build in a small helper (e.g. `src/data/hero-stats.ts`), all from existing typed data:
  - GitHub stars → sum of `stargazers_count` across `github-cache.json`
  - OSS projects → `projects.length` from `projects.ts`
  - Talks/contributions → `industryItems.length` from `industry.ts`
  - Countries → `travelStats.countries` from `travel.ts`
  - Each stat links to its section (`/open-source`, `/open-source`, `/industry`, `/travel`).
- Hero uses the existing fade-in keyframe; stats strip styled with mono numerals.

### D5. Section-page heroes
- Keep cover images but unify: consistent height (`min-height` token), overlay via a CSS pseudo-element (already the pattern in `.hero::after`), consistent `h1` scale. The homepage moves to the typographic hero (D4) and no longer uses `.hero`/cover. This matches the spec delta ("Cover-image hero banners" modified).

### D6. Emoji → Font Awesome / vector icons
- Navbar: `☰` → `fa-bars`, `🔍` → `fa-magnifying-glass`, `🌙`/`☀️` → `fa-moon`/`fa-sun` (swapped by the existing theme-toggle script), avatar stays as the brand mark; optional wordmark text.
- Homepage cards: change `homepage.ts` `HomepageCard.icon` values from emoji to Font Awesome classes (e.g. `fa-solid fa-user`…). `homepage.ts` shape is NOT covered by the `typed-data` spec (only skills/stats/github-cache are), so no spec delta is required.
- About interests and `ROLE_LABELS`/`TYPE_LABELS` icon values swap to FA classes; values change, shapes don't.

### D7. Stats automation fix
- `refresh-github-stats.yml`:
  - Replace `actions/setup-node@v4` `cache: npm` + `npm ci` with `pnpm/action-setup` + `pnpm install --frozen-lockfile` (repo is pnpm; Node 24 from `.nvmrc`).
  - Add an `npm run fetch:travel` step (no auth needed for the Skratch share API).
  - Add `src/data/travel.json` to `add-paths` so the existing auto-PR pattern covers both files.
  - Rename workflow to reflect the broader scope ("Refresh site stats"), optional.
- WakaTime: intentionally untouched (see Non-Goals); the literal stays in `fetch-github.mjs`/`stats.json`.

### D8. Polish pass
- Selection color = `--accent-soft`/accent tint; `:focus-visible` ring = 2px accent + offset, radius-aware.
- Card/stat-badge hover: existing lift pattern refined with the new shadow scale. Keep `prefers-reduced-motion` global override (already present).
- Dark palette re-tuned so the accent reads legibly on `#0f172a` surfaces.

## Risks / Trade-offs

- **Font swap alters metrics/line-height site-wide** → pin explicit `line-height` on headings/body tokens; visually check every page in light and dark during the task.
- **CI failure root cause is inferred, not proven** (run logs expired) → the automation task must trigger `workflow_dispatch` and confirm both fetches succeed before merging.
- **Auto-PR still requires a manual merge** → stats may lag up to a week; acceptable cadence for stars/countries; document in PR body.
- **Indigo in dark mode can feel vivid** → use the lighter indigo-400 accent + soft tints, and cap accent usage (links, active states, focus).
- **@fontsource adds ~0.5–1 MB of font assets** (static HTML/CSS) → swap-display, only needed weights, browser caching; verifiable with a quick build audit.
- **Emoji→icon sweep can miss glyphs** (e.g. untappd, skratch) → audit `socials.ts`/FA set; fall back to inline SVG for anything Font Awesome lacks.

## Migration Plan

Static site, single deploy target (Netlify). Flow: implement tasks → `pnpm build` + `astro check` → spot-check light/dark on all pages → validate stats workflow via `workflow_dispatch` → merge to `main` → Netlify publishes. Rollback = revert the merge commit. No data migration; no feature flags needed.

## Open Questions

- **Hero copy**: exact wording of the positioning line (design intent above; final copy to be confirmed during implementation — doesn't change specs).
- **Hero stats labels/formatting**: e.g. "54.5k" vs "54,532" for stars, number formatting for four digits — cosmetic, deferrable.