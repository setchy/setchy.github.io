## Why

The current site is built on Jekyll + Beautiful Jekyll 6.0.1, an aging stack (Bootstrap 4, jQuery, Font Awesome 5.12) that actively fights three of the four visual goals we want: dark mode (a paid plan feature), modern animations, and a card-based layout. The content is tiny (461 lines of markdown, mostly link lists) and fully portable, so migration cost is low while the payoff in design freedom, dark mode, and maintenance ergonomics is high.

## What Changes

- Replace the Jekyll + Beautiful Jekyll stack with an Astro static site.
- Migrate all existing content (About, OSS, Industry, Radars, Library, Blogs) to Astro content collections, preserving URLs (`/about/`, `/open-source`, `/industry`, `/radars`, `/library`, `/blogs`, `/tags`).
- Keep the existing domain (setchy.io), Netlify deployment, GA/Cloudflare analytics, RSS feed, sitemap, robots.txt, 404 page, and search functionality.
- **BREAKING**: Remove Jekyll-specific files (`_config.yml`, `_posts/*.md`, `Gemfile`, `Gemfile.lock`, `_site/`, theme overrides).
- **BREAKING**: Replace the Beautiful Jekyll theme markup/CSS with a custom Astro design.
- Apply the four jazz items as part of the new design:
  - Brand color scheme + cover-image hero banners on every page.
  - Homepage redesign with hero + card grid (replacing the plain link list).
  - Content presentation polish: OSS cards, cleaner radars tables, grouped About skills.
  - Dark mode toggle, custom typography, subtle animations.

## Capabilities

### New Capabilities
- `site-port`: Rebuilding the setchy.io personal site on Astro, including page structure, routing/URL preservation, and Netlify deployment.
- `content-management`: Migrating all markdown content into Astro content collections with frontmatter-driven metadata (tags, dates, perms), search index, and RSS feed generation.
- `site-design`: The visual layer — brand colors, cover images, homepage card grid, dark mode, typography, and animations.
- `analytics`: Keeping Google Analytics + Cloudflare Analytics working across all pages.

### Modified Capabilities
<!-- No existing specs — this is a greenfield site rebuild. -->

## Impact

- Removes the Ruby toolchain (Jekyll, Beautiful Jekyll gem, Bundler) and the `.ruby-version` / `Gemfile` ecosystem.
- Adds a Node.js toolchain (Astro, package.json) and `.astro` component architecture.
- Deletes `_config.yml`, `_posts/`, `_includes/`, `_layouts/`, `_plugins/`, `_site/`, `tags.html`, `404.html` (rewritten), `index.md`, `pages/`.
- Preserves `assets/` images (avatar, this-is-fine) and the CNAME/domain.
- Netlify build command changes from `jekyll build` to an Astro build; deployment URL and domain unchanged.
