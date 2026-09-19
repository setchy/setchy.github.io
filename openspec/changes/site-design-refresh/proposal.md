## Why

The site is functional but generic — it reads like a stock portfolio template rather than the personal site of a distinguished engineer. Dated font pairing (Lora/Open Sans), emoji-as-icons, a default blueprint-blue link color, a CV slash-stack subtitle, and a homepage that jumps straight to a card grid all undersell the author and the work. The opportunity is a focused visual refresh — "editorial bones + modern finish" — that conveys credibility and craft without a rebuild. The underlying architecture (Astro, design tokens, dual themes) is solid and ready to be restyled.

## What Changes

- **Typography**: Replace Lora/Open Sans with a self-hosted trio — a serif display face (headings), a modern sans (body/UI), and a monospace face for technical metadata (dates, stats, labels). Remove the Google Fonts runtime dependency.
- **Brand palette**: Introduce a single signature accent color threaded through the design tokens; re-tune both light and dark palettes around it. Dark mode stays, including system-preference default and manual toggle.
- **Homepage hero**: Rebuild the hero as a typographic statement — name, a crafted one-line positioning statement (replacing the slash-dump subtitle), and a stats strip (GitHub stars, OSS projects, talks, countries) derived at build time from existing data (github-cache, industry content, travel.json).
- **Homepage section cards**: Keep the responsive card grid below the hero but restyle it to match the new editorial language.
- **Navigation & footer**: Replace emoji glyphs (☰ 🔍 🌙 and card emojis) with Font Awesome icons (already a dependency) and subtle SVG marks; add a proper wordmark; refine active states and mobile behavior.
- **Section pages**: Unify the page-hero treatment across About, OSS, Industry, Radars, Library, Travel, and Blogs.
- **Polish**: Typography/spacing pass on prose, tables, lists, cards, tags, and footer; refined focus-visible states and selection color; tasteful hover/micro-interactions; preserve `prefers-reduced-motion` support.
- **Fix stats automation**: The weekly "Refresh GitHub stats" workflow has never succeeded — it runs `npm ci` against a pnpm-managed repo. Fix the install step (pnpm setup + `pnpm install --frozen-lockfile`) and extend the same workflow to also run `fetch:travel`, so `travel.json` refreshes on the same weekly schedule. Both fetches land in the existing auto-PR pattern.
- `stats.json` shape is unchanged (keeps the `wakatime.hours` field per the `typed-data` spec); the frozen WakaTime value is simply not featured on the page and is out of scope to wire up.
- No breaking changes to routes, content, or data shape. Static output unchanged.

## Capabilities

### New Capabilities

- None. All behavior changes live within the existing `site-design` capability.

### Modified Capabilities

- `site-design`: Brand color scheme (signature accent + re-tuned dual palettes), hero banners (typographic homepage hero + unified section-page heroes), homepage layout (stats strip added above the card grid), dark mode (same behavior, new palette), custom typography (self-hosted trio), subtle animations (refined hover/focus/micro-interactions) — plus new requirements for the homepage stats strip and navigation iconography.

## Impact

- `src/styles/global.css` — design tokens and component styles reworked.
- `src/layouts/BaseLayout.astro` — font loading (self-hosted), theme init.
- `src/components/Navbar.astro`, `Footer.astro` — icons, wordmark.
- `src/pages/index.astro` — hero + stats strip; section pages get unified hero treatment.
- `src/data/*` — a small build-time helper aggregating hero stats from existing `github-cache.json`, industry content, and `travel.json`.
- `package.json` — add self-hosted font packages (e.g. `@fontsource/*`); remove the Google Fonts `<link>`s.
- `.github/workflows/refresh-github-stats.yml` — fix the install step for pnpm; add `fetch:travel` and `travel.json` to the weekly refresh + auto-PR.
- No changes to routing, content collections, or the fetch scripts' output shapes.