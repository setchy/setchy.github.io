## Why

The Library page is currently a static markdown file with raw HTML links. The OSS page already demonstrates a richer, data-driven card layout with filtering — the Library should match that quality and interactivity to provide a consistent experience across content pages.

## What Changes

- Convert the Library page from static markdown to a data-driven Astro component with client-side filtering
- Introduce a unified content type filter (Blogs, Podcasts, eBooks) matching the OSS role filter pattern
- Render library items as compact cards (lighter than OSS cards) with type icon, title, and topic badge
- Maintain the existing topic groupings as section headings (like OSS category sections)
- Auto-hide empty sections when a content type filter is active

## Capabilities

### New Capabilities

- `library`: Data-driven library page with content type filtering and compact card layout

### Modified Capabilities

<!-- No existing capabilities are modified -->

## Impact

- New file: `src/data/library.ts` — data model for library items
- New file: `src/pages/library.astro` — replaces the markdown-based library page
- Modified file: `src/styles/global.css` — new card and filter styles for library
- Modified file: `src/scripts/site.ts` — add library filtering JS (or reuse OSS filter logic)
- Existing markdown `src/content/sections/library.md` becomes unused (routing priority goes to the new Astro page)
