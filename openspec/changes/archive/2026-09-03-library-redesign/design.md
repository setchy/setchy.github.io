## Context

The Library page currently lives as static markdown (`src/content/sections/library.md`) with raw HTML links organized under headings. The OSS page (`src/pages/open-source.astro`) already demonstrates a data-driven approach with TypeScript data, Astro rendering, CSS grid cards, and client-side JS filtering. This change follows that same pattern for the Library page, adapting it for simpler card content (no GitHub metadata enrichment needed).

## Goals / Non-Goals

**Goals:**
- Match the OSS page's interactivity and visual consistency
- Keep library items as a simple TypeScript data array (no external API/cache)
- Reuse the same filtering UX pattern (pill buttons + `data-` attributes + visibility toggling)
- Compact card design lighter than OSS cards

**Non-Goals:**
- Auto-fetching RSS feed metadata or any external data source
- Descriptions or rich metadata on cards
- Topic filtering (only content type filtering; topics remain as section headings)
- Modifying the OSS page in any way

## Decisions

### 1. Data model: flat TypeScript array (like `projects.ts`)

**Decision:** Define a `LibraryItem` interface and export a `libraryItems` array from `src/data/library.ts`.

**Rationale:** Mirrors the OSS pattern. No JSON cache or API calls needed since library items are static links with no dynamic metadata.

```ts
type LibraryType = 'blog' | 'podcast' | 'ebook';

interface LibraryItem {
  title: string;
  url: string;
  type: LibraryType;
  topic: string;
}

export const TYPE_LABELS: Record<LibraryType, { label: string; icon: string }> = {
  blog:   { label: 'Blogs',   icon: '📰' },
  podcast:{ label: 'Podcasts', icon: '🎧' },
  ebook:  { label: 'eBooks',  icon: '📚' },
};
```

**Alternatives considered:**
- JSON data file: adds a build step for no benefit since items are static
- Markdown with frontmatter: harder to filter client-side, less consistent with OSS

### 2. Page: standalone Astro component (like `open-source.astro`)

**Decision:** Create `src/pages/library.astro` which takes routing priority over the markdown content collection route.

**Rationale:** The markdown `library.md` still exists but the Astro page wins on routing priority (same pattern as OSS).

### 3. Filtering: single filter bar for content type

**Decision:** One filter bar with buttons: All, Blogs, Podcasts, eBooks. Uses `data-type` attributes on cards and `data-type-filter` on buttons.

**Rationale:** Follows the OSS role filter pattern exactly. Topic sections remain as structural groupings (h2 headings), not filters.

### 4. Card design: minimal rows

**Decision:** Cards are lightweight — type icon + title (linked) + topic badge. No description, no bottom metadata row.

```
┌──────────────────────────────────────┐
│ 📰  The Architect Elevator           │
│     Architecture                     │
└──────────────────────────────────────┘
```

**Alternatives considered:**
- Full OSS-style cards: too heavy for items with only a title and URL
- Plain list rows: loses the visual grid consistency with OSS

### 5. Filtering JS: extend `site.ts` (same pattern as OSS)

**Decision:** Add a library-specific filter block in `site.ts` that queries `[data-type-filter]` buttons and `[data-type]` cards, toggling visibility. Same pattern as the OSS role filter.

**Rationale:** Consistency. The two filter blocks are independent (different selectors) and won't conflict.

## Risks / Trade-offs

- **[Risk]** Markdown `library.md` still exists and could confuse the content collection → **Mitigation:** It's harmless; the Astro page takes priority. Can be removed later.
- **[Trade-off]** No topic filtering → Topics are structural groupings, not filters. This keeps the filter bar simple (1 bar instead of 2) but means users can't cross-filter by topic + type. Acceptable given the ~75 items.
