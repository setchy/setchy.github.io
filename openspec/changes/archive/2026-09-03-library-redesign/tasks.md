## 1. Data Model

- [x] 1.1 Create `src/data/library.ts` with `LibraryItem` interface and `TYPE_LABELS` constant
- [x] 1.2 Populate `libraryItems` array with all ~75 items from the existing markdown (blogs, podcasts, ebooks with their topics)

## 2. Page Component

- [x] 2.1 Create `src/pages/library.astro` with PageLayout, hero header, description, and topic sections
- [x] 2.2 Render content type filter bar (All, Blogs, Podcasts, eBooks) with counts and `data-type-filter` attributes
- [x] 2.3 Render topic sections (`<h2>` headings) with item cards in a responsive CSS grid
- [x] 2.4 Each card renders type icon, linked title, and topic badge with `data-type` attribute

## 3. Styling

- [x] 3.1 Add `.library-grid` responsive grid styles to `global.css`
- [x] 3.2 Add `.library-card` compact card styles (lighter than OSS cards — no description, no bottom metadata)
- [x] 3.3 Add `.type-badge` topic badge styles (reuse or mirror `.role-count` style)

## 4. Filtering

- [x] 4.1 Add library content type filter JS to `site.ts` (same pattern as OSS role filter — query `[data-type-filter]` buttons, toggle `[data-type]` card visibility, hide empty sections)
