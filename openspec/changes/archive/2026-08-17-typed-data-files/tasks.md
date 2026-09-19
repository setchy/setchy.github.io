## 1. Add typed wrapper modules for generated JSON data

- [x] 1.1 Create `src/data/skills.ts` exporting `Skill` and `SkillCategory` interfaces and a typed `skillCategories` value imported from `skills.json`.
- [x] 1.2 Create `src/data/stats.ts` exporting `GithubStats`, `WakatimeStats`, and `Stats` interfaces and a typed `stats` value imported from `stats.json`.
- [x] 1.3 Create `src/data/github-cache.ts` exporting a `GithubRepoMeta` interface and a typed `githubCache: Record<string, GithubRepoMeta>` value imported from `github-cache.json`.

## 2. Add named interfaces to existing typed modules

- [x] 2.1 In `src/data/nav.ts`, add and export a `NavLink` interface and type `navLinks` as `NavLink[]`.
- [x] 2.2 In `src/data/socials.ts`, add and export a `SocialLink` interface and type `socials` as `SocialLink[]`.

## 3. Update components to consume shared types

- [x] 3.1 Update `src/pages/about.astro` to import `skillCategories` from `../data/skills` (typed) instead of `../data/skills.json`.
- [x] 3.2 Update `src/pages/open-source.astro` to import `githubCache` from `../data/github-cache` and `stats` from `../data/stats`, and remove the local `RepoMeta` interface in favor of the shared `GithubRepoMeta` type.
- [x] 3.3 Confirm `index.astro` (cards), `library.astro`, `industry.astro`, `Navbar.astro`, and `SocialLinks.astro` use shared/typed data and interfaces without local inline duplicates.

## 4. Verify data-shape integrity at build/type-check

- [x] 4.1 Run the project's type-check/build (e.g. `astro check` / `astro build`) and confirm it passes with the typed data consumption.
- [x] 4.2 Confirm `scripts/fetch-github.mjs` and `scripts/generate-skills-badge.mjs` still read/write the same JSON shapes and remain functional.
