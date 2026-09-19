## 1. Travel stats data file

- [x] 1.1 Confirm which high-level stats the public Skratch share API exposes (user + map catalog endpoints) and how to split countries from territories and compute regions/world coverage; verify with a scratch run of the fetch script
- [x] 1.2 Add `src/data/travel.json` (countries, territories, regions, cities, world regions, % of world) and `src/data/travel.ts` typed accessor; verify importing them in a page compiles
- [x] 1.3 Add `scripts/fetch-travel.mjs` hitting the public Skratch API and a `fetch:travel` npm script; run it and verify `travel.json` is regenerated

## 2. Travel page

- [x] 2.1 Create `src/pages/travel.astro` using `PageLayout`: hero with "Travel" title + cover, the stat badge row (reusing the `stat-badge`/`stat-value`/`stat-label` classes), and the Instagram link to `https://www.instagram.com/cassbtravels/` opening in a new tab; verify `/travel` renders via `npm run dev`
- [x] 2.2 Add the Skratch map iframe to `travel.astro` (`https://share.skratch.world/N0cBlEVoB8/visited`, `loading="lazy"`, responsive width/height, `title`, `border: 0`) plus an "Open full map" fallback link; verify the iframe loads and the fallback link targets a new tab
- [x] 2.3 Add `public/covers/travel.svg` as a 1600x600 gradient cover matching the existing cover style; verify the hero uses it

## 3. Site integration

- [x] 3.1 Add `Travel` (→ `/travel`) to `src/data/nav.ts` and a Travel card (✈️ icon, blurb, cover) to `src/data/homepage.ts`; verify navbar shows the link and clicking the homepage card reaches `/travel`
- [x] 3.2 Add a static Travel entry to `src/pages/search.json.ts`; verify navbar search finds "travel"
- [x] 3.3 Add a Skratch link to the footer icons (`src/data/socials.ts`) using `fa-solid fa-map-location-dot`; verify the icon renders in the footer

## 4. Build verification

- [x] 4.1 Run `npm run build`; verify `dist/travel/index.html` is generated and `/travel` appears in the sitemap
- [x] 4.2 Smoke-test built output: hero, badges, coverage caption, iframe, Instagram link, nav/homepage/footer links, dark mode, and mobile layout all render correctly