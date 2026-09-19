## 1. Foundations — tokens, fonts, typography

- [x] 1.1 Add `@fontsource/newsreader`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (needed weights) to `package.json`; remove Google Fonts `<link>`s and preconnects from `BaseLayout.astro`; verify `pnpm build` succeeds and no `fonts.googleapis.com` request appears in the browser network tab
- [x] 1.2 Rework token blocks in `global.css`: add `--accent`, `--accent-hover`, `--accent-soft`, `--accent-contrast`, `--gradient-accent` per theme, radii scale, refined shadow scale, `--font-display`/`--font-mono`, and `--container` (1040px); verify both `:root` and `[data-theme="dark"]` resolve every new token and existing page styles still render
- [x] 1.3 Apply new font families to base rules (headings, body, and a mono utility for metadata) with explicit line-heights; verify text renders with the new faces in both themes on a sample page

## 2. Navigation and footer

- [ ] 2.1 Replace navbar emoji (`☰`, `🔍`, `🌙`) with Font Awesome icons (`fa-bars`, `fa-magnifying-glass`, `fa-moon`/`fa-sun` swapped by the existing theme toggle) and add the wordmark; verify the nav keeps its `aria-label`s, mobile toggle still opens the menu, and no emoji glyphs remain in `Navbar.astro`
- [ ] 2.2 Audit and polish footer/social icons (including Untappd and Skratch) for consistent rendering; verify every social link in `socials.ts` renders its icon in the footer in both themes

## 3. Homepage hero and stats strip

- [ ] 3.1 Add a build-time hero stats helper (e.g. `src/data/hero-stats.ts`) aggregating from typed data: total stars (sum of `stargazers_count` in `github-cache.json`), project count (`projects.length`), talks count (`industryItems.length`), countries (`travelStats.countries`); verify the helper returns the expected values from current data and passes `astro check`
- [ ] 3.2 Restructure `index.astro` hero: typographic layout (avatar, name, positioning line, stats strip) with each stat linking to its section (`/open-source`, `/industry`, `/travel`); verify the homepage renders the hero + stats strip and all stat links resolve to existing routes
- [ ] 3.3 Update `homepage.ts` card icons from emoji to Font Awesome classes and restyle the card grid to the new editorial language; verify all six section cards render their icons and link correctly on desktop and mobile

## 4. Section pages and content styling

- [x] 4.1 Unify the section-page hero treatment across About, OSS, Industry, Radars, Library, Travel, and Blogs (consistent height, overlay, title scale); verify every section page shows the same hero style with its cover image
- [x] 4.2 Swap emoji to Font Awesome in `about.astro` interests and in `ROLE_LABELS` (`projects.ts`) and `TYPE_LABELS` (`industry.ts`) values; verify the About page, OSS page, and Industry page render icons instead of emoji
- [x] 4.3 Typography and spacing pass at the new 1040px container on prose, tables, tags, library cards, project cards, radars list, and stat badges; verify pages reflow cleanly without odd orphaned lines at desktop and tablet widths

## 5. Polish and accessibility

- [x] 5.1 Add `:focus-visible` rings (2px accent, radius-aware) and accent-tinted selection color; verify tabbing through each page shows a clear focus ring on links, buttons, and inputs in both themes
- [x] 5.2 Refine hover/micro-interactions with the new shadow scale and confirm `prefers-reduced-motion` still suppresses decorative animation; verify hover states feel intentional and reduced-motion disables fades/elevations

## 6. Stats automation

- [x] 6.1 Fix `.github/workflows/refresh-github-stats.yml`: replace `npm ci`/`cache: npm` with `pnpm/action-setup` + `pnpm install --frozen-lockfile`; add an `npm run fetch:travel` step and `src/data/travel.json` to `add-paths`; rename the workflow to "Refresh site stats"; verify via `workflow_dispatch` that both fetches succeed and the auto-PR contains both data files
- [x] 6.2 Run `pnpm run fetch:github` and `pnpm run fetch:travel` locally so committed data reflects current sources; verify `git diff` on `stats.json`, `github-cache.json`, and `travel.json` contains no unexpected shape changes

## 7. Final verification

- [x] 7.1 Run `pnpm build` and `astro check`; verify both pass with no errors or type failures
- [x] 7.2 Spot-check every page in light and dark mode at desktop, tablet, and mobile widths; verify no horizontal overflow, nav works, and cards/grids reflow correctly
- [x] 7.3 Verify the hero stats strip numbers match their source data (stars sum, project count, talks count, countries) and each stat link lands on its section page