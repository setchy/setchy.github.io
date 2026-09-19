## Context

The current site is Jekyll + Beautiful Jekyll 6.0.1 (see proposal.md — Why). The content is tiny and static: 461 lines of markdown across five section pages and the About page, mostly bullet-point link lists. All six content files carry the same lightweight frontmatter shape (`title`, `date`, `tags`, `published`, `permalink`), with the About page being a plain page (`permalink: /about/`).

Existing production behavior to preserve:
- URLs: `/`, `/about/`, `/open-source`, `/industry`, `/radars`, `/library`, `/blogs`, `/tags`
- Google Analytics `G-1KRZQ6HQZ6`; Cloudflare Analytics beacon present in the current output
- RSS feed, sitemap, robots.txt, custom 404 with `this-is-fine.png`
- Netlify deployment to setchy.io, domain via CNAME
- Navbar search across all pages

## Goals / Non-Goals

**Goals:**
- Replace the Ruby/Jekyll stack with Astro, keeping all URLs, content, analytics, and deployment intact
- Ship the four design upgrades (brand colors + cover heroes, card homepage, content polish, dark mode + typography + animations) as native Astro design work
- Keep the repo a static, low-maintenance markdown-driven site

**Non-Goals:**
- No new content or restructuring of existing page content (e.g., we are not writing new posts)
- No interactive web app features beyond search + dark mode toggle
- No multi-repo monorepo or headless CMS — content stays in this repo as markdown
- Not preserving Beautiful Jekyll's exact visual styling; the design is intentionally rebuilt

## Decisions

### 1. Astro over Eleventy or staying on Jekyll
Chosen: **Astro** (see proposal exploration). Rationale: content-collections make the markdown migration near-free, it ships zero client JS by default, dark mode is trivial via CSS variables + `prefers-color-scheme`, and interactive bits (search, dark toggle) are small islands. Eleventy considered as lighter alternative but would require assembling more tooling (search index, RSS, sitemap) by hand. Jekyll rejected because the theme fights the design goals.

### 2. Content architecture: static pages + one section collection
The five section pages are effectively pages, not blog posts. Design:
- `src/pages/index.astro` — homepage (hero + card grid)
- `src/pages/about.astro` or `src/content/pages/about.md` — About
- A **single section collection** `src/content/sections/` holding `blogs`, `industry`, `library`, `open-source`, `radars` as markdown entries with frontmatter `{ title, date, tags, permalink }`
- A catch-all renderer or five thin page wrappers that query the collection by slug and render the markdown
- `src/pages/tags.astro` — tag index built from the collection

Rationale: one collection keeps tags/search/RSS generation uniform and avoids five near-identical hand-maintained layouts. Alternative considered: five standalone `.astro` pages with hardcoded content — rejected because tags/search/RSS would need duplication.

### 3. URL mapping
The Jekyll `permalink` frontmatter drives the public path. Astro supports explicit routing via filesystem or by generating pages from slugs:
- `/` → index
- `/about/` → about page
- `/open-source`, `/industry`, `/radars`, `/library`, `/blogs` → `getStaticPaths()` over the sections collection using each entry's `permalink`
- `/tags` → tag index
- `/404` → custom 404

All paths match the existing Jekyll output exactly, so no redirects are needed for the five section slugs. (The old `redirect_from` entries for `/case-studies/`, `/vids/`, `/podcasts/`, `/ebooks/` are commented out in the source and are not live routes — not carried over.)

### 4. Dark mode strategy
- CSS custom properties define the palette: `--bg`, `--text`, `--link`, `--hover`, `--card`, `--border`, `--nav-bg`, etc.
- Two themes via `data-theme="light|dark"` on `<html>`
- Default selection: `prefers-color-scheme` via a small inline script that reads a `localStorage` override first (avoids FOUC)
- Toggle button in the navbar flips `data-theme` and persists to `localStorage`
- No Tailwind dependency decision required yet; plain CSS + CSS vars is sufficient for this scope and keeps the bundle tiny

### 5. Cover images
- The theme's `cover-img` frontmatter concept is preserved as `cover` in section frontmatter, defaulting to a per-section image in `src/assets/` (or `public/`)
- Homepage + each section page render the cover as a full-width hero with an overlay gradient and the title/subtitle overlaid
- Images chosen at implementation time; low-effort option is themed gradient placeholders so no external asset sourcing is required

### 6. Search implementation
The Jekyll site used simple-jekyll-search with a pre-built JSON index. Astro equivalent: build a search index at build time from the sections collection + pages into `public/search.json` (or inline), and add a small vanilla-JS island for the search overlay. Keeps the exact same UX with zero framework JS.

### 7. Analytics
- Google Analytics: `@astrojs/partytown` or a plain gtag snippet in the layout head (async). Since the site is static and we already ship the gtag snippet, a plain `defer` script in `BaseLayout.astro` is simplest.
- Cloudflare Analytics: add the beacon script to the layout head (present today in production output).
- Both as configurable constants so they're easy to spot/remove.

### 8. Styling approach
- Plain CSS with custom properties (no Tailwind) to keep the design dependency-free and reviewable, unless implementation reveals a strong need
- Global stylesheet `src/styles/global.css` + per-component scoped styles
- Subtle animations: hover lift on cards, hero fade-in via CSS `@keyframes`, smooth scrolling — all CSS-only
- Typography: a system font stack or a self-hosted pair chosen at implementation time (e.g., Inter for UI + a serif for headings, or keep Lora/Open Sans for continuity)

### 9. Tooling and config
- `package.json`, Astro 5.x, TypeScript where convenient
- Plugins: RSS (`@astrojs/rss`), sitemap (`@astrojs/sitemap`)
- `astro.config.mjs`: `site: "https://setchy.io"`, output `static`
- Netlify build command: `npm run build`; publish dir: `dist`; no runtime functions needed
- Keep `.ruby-version`? No — removed. Node version pinned via `.nvmrc` or Netlify config

## Risks / Trade-offs

- **Visual regression on section pages** → The markdown bodies (custom spans, icon classes like `.icon rss`, octicon calls) reference Jekyll-specific classes and a Jekyll octicon plugin. Mitigation: audit each page's inline HTML during migration and replace `{% octicon %}` and `.icon` classes with native equivalents (emoji or inline SVGs); the radars page's long list is a candidate for a table layout (part of the design goals anyway).
- **Search index staleness** → Built at deploy time from the same content collections, so it cannot drift from the pages.
- **FOUC on dark mode** → Inline pre-hydration script in `<head>` reads `localStorage`/media query before CSS applies.
- **Netlify config drift** → Preserve the deploy site ID (`9abe65ca-...` badge) and keep the domain settings; add `netlify.toml` with build command/publish dir so the pipeline is reproducible from the repo.
- **Favicon/404 regressions** → Port the existing `favicon.ico` and `this-is-fine.png` into the Astro `public/` directory; recreate the 404 page with the same image.
- **Lost RSS/sitemap if forgotten** → Explicit tasks exist to add `@astrojs/rss` and `@astrojs/sitemap`, covered by the site-port spec scenarios.

## Migration Plan

1. Scaffold Astro app in place (`package.json`, `astro.config.mjs`, `tsconfig.json`).
2. Move content: `_posts/*.md` → `src/content/sections/*.md` (strip Jekyll frontmatter fields, normalize to Astro schema); `pages/about.md` → About page; rewrite Jekyll-only inline HTML (octicons, icon classes).
3. Build core layout: navbar, footer, fonts, dark mode, analytics, search island.
4. Build homepage (hero + cards), section pages, tags page, 404.
5. Add RSS, sitemap, robots.txt.
6. Port assets (avatar, this-is-fine, favicon); add cover images.
7. Remove Jekyll files; verify build; update Netlify to `npm run build` / `dist`.
8. Rollback: the git history preserves the full Jekyll site; Netlify keeps prior deploys — reverting is a checkout + Netlify redeploy away.
