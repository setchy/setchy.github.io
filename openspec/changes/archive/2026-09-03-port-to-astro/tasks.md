## 1. Scaffold Astro project

- [x] 1.1 Initialize Astro app in place: `package.json`, `astro.config.mjs` (`site: "https://setchy.io"`, static output), `tsconfig.json`
- [x] 1.2 Add dependencies: `astro`, `@astrojs/rss`, `@astrojs/sitemap`, and a markdown renderer for content collections
- [x] 1.3 Add `netlify.toml` with build command `npm run build` and publish dir `dist`; pin Node version (`.nvmrc`)
- [x] 1.4 Verify `npm run build` produces a `dist/` with an index page

## 2. Migrate content into collections

- [x] 2.1 Create `src/content/sections/` with entries for blogs, industry, library, open-source, radars — copy markdown bodies from `_posts/`, normalize frontmatter (`title`, `date`, `tags`, `permalink`, `cover`)
- [x] 2.2 Define the sections content collection schema (zod) and content config
- [x] 2.3 Port the About page content to `src/pages/about.astro` (or `src/content/pages/about.md`) preserving `permalink: /about/`
- [x] 2.4 Replace Jekyll-only inline HTML across bodies: `{% octicon %}` → native equivalent, `.icon rss/web/youtube/pdf/github/radar` classes → inline SVGs or emoji, keeping external links `target="_blank"`
- [x] 2.5 Verify all content renders via `npm run dev` with links and icons intact

## 3. Core layout

- [x] 3.1 Build `BaseLayout.astro`: HTML head, meta tags, fonts, Google Analytics (`G-1KRZQ6HQZ6`) + Cloudflare Analytics beacon scripts, global CSS
- [x] 3.2 Build navbar component (site brand → home, links to About/OSS/Industry/Radars/Library, search control, dark mode toggle, avatar)
- [x] 3.3 Build footer component (social links: rss, facebook, github, twitter/x, youtube, linkedin, untappd + edit-page link)
- [x] 3.4 Implement dark mode: CSS custom properties, `data-theme` on `<html>`, inline pre-hydration script (localStorage + `prefers-color-scheme`), toggle island persisting to localStorage
- [x] 3.5 Implement client-side search: build `search.json` index from content at build time, add vanilla-JS search overlay island wired to the navbar search control

## 4. Pages

- [x] 4.1 Build homepage (`index.astro`): hero with avatar, name, subtitle, and a responsive card grid for the five sections
- [x] 4.2 Build section pages: render each `sections` collection entry at its `permalink` with a cover-image hero (title/subtitle overlay)
- [x] 4.3 Build tags index page (`/tags`): grouped, linked tags with counts from the sections collection
- [x] 4.4 Build custom 404 page using existing `this-is-fine.png`
- [x] 4.5 Verify all public URLs (`/`, `/about/`, `/open-source`, `/industry`, `/radars`, `/library`, `/blogs`, `/tags`) resolve in the build output

## 5. Visual design

- [x] 5.1 Define brand color palette as CSS custom properties and apply across background, text, links, navbar, footer, cards
- [x] 5.2 Add cover images per top-level page (homepage + sections) as full-width hero banners with overlay gradient
- [x] 5.3 Add custom typography pairing for headings and body
- [x] 5.4 Add subtle CSS animations: card hover lift, hero fade-in, smooth scroll; verify they respect `prefers-reduced-motion`
- [x] 5.5 Add content presentation polish: OSS page as cards with status markers, radars page volume links as a clean table, About skills icon gallery grouped

## 6. SEO, feeds, and assets

- [x] 6.1 Add `@astrojs/rss` feed at `/feed.xml` from sections collection
- [x] 6.2 Add `@astrojs/sitemap` (`/sitemap.xml`) and `public/robots.txt`
- [x] 6.3 Port assets to `public/`: `avatar.png`, `this-is-fine.png`, `favicon.ico`; add any cover images
- [x] 6.4 Confirm GA + Cloudflare analytics snippets present in built output on all pages

## 7. Decommission Jekyll and finalize

- [x] 7.1 Remove Jekyll artifacts: `_config.yml`, `_posts/`, `_includes/`, `_layouts/`, `_plugins/`, `_site/`, `Gemfile`, `Gemfile.lock`, `.ruby-version`, `index.md`, `tags.html`, `404.html`
- [x] 7.2 Run `npm run build`; check for warnings and verify all pages, sitemap, feed, and 404 render
- [x] 7.3 Update README (tech stack, local dev: `npm install && npm run dev`, deploy notes)
- [x] 7.4 Manual smoke test locally: nav links, dark mode toggle + persistence, search, mobile responsive layout, external links open new tabs
- [ ] 7.5 Push to main and confirm Netlify build + deploy to setchy.io succeeds; spot-check production URLs
