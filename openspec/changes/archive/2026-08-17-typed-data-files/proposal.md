## Why

The `src/data/` directory mixes TypeScript modules (`homepage.ts`, `projects.ts`, `library.ts`, `industry.ts`, `nav.ts`, `socials.ts`) with raw JSON files (`skills.json`, `stats.json`, `github-cache.json`). The JSON files are imported directly into Astro components with no type safety, so a shape change in a JSON file silently breaks rendering or requires manual, duplicated interfaces (e.g. `RepoMeta` in `open-source.astro`). We want every data file to expose strong, shared types that components consume, so shape drift is caught at build/type-check time.

## What Changes

- Introduce shared TypeScript interfaces/type guards for each JSON-backed data file (`skills`, `stats`, `github-cache`) so their imported shapes are fully typed in components.
- Convert the raw JSON data files into typed TS modules (or pair each JSON with a `.d.ts`/type module) so consumers import a single typed source instead of re-declaring local interfaces.
- Replace the locally-duplicated `RepoMeta` interface in `open-source.astro` with a shared, imported type.
- Ensure components (`about.astro`, `open-source.astro`, `index.astro`, and all data-driven pages) consume the shared types rather than ad-hoc inline shapes.
- Add a type-check/build verification so the data shapes remain consistent with component usage.
- Keep the existing generated-file pipeline (`scripts/fetch-github.mjs`, `scripts/generate-skills-badge.mjs`) working — those scripts write `stats.json`, `github-cache.json`, and read `skills.json`.

## Capabilities

### New Capabilities
- `typed-data`: Strong, shared TypeScript types for every data file under `src/data/`, consumed by components so data-shape changes are caught at type-check/build time instead of failing at runtime.

### Modified Capabilities
<!-- None - openspec/specs/ has no existing synced capabilities yet. -->

## Impact

- **Code**: `src/data/` (all files), `src/components/` (Navbar, SocialLinks), `src/pages/` (index, about, open-source, industry, library).
- **Scripts**: `scripts/fetch-github.mjs` and `scripts/generate-skills-badge.mjs` — must continue to work against the new typed data shape (output writers may need to keep emitting the same shape).
- **Build**: `astro build` / `astro check` becomes the verification gate for data-shape integrity.
- **No runtime dependencies added**; this is a type-safety refactor.
