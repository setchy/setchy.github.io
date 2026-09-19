## Context

See proposal.md - Why.

The `src/data/` directory currently mixes two shapes:

- **Typed TS modules** already export interfaces and their data together (`homepage.ts`, `projects.ts`, `library.ts`, `industry.ts`, `nav.ts`, `socials.ts`).
- **Raw JSON files** (`skills.json`, `stats.json`, `github-cache.json`) are imported directly into Astro components with no type safety. `open-source.astro` even hand-declares a local `RepoMeta` interface to make sense of `github-cache.json`.

`stats.json` and `github-cache.json` are **generated artifacts** — `scripts/fetch-github.mjs` writes them, and `scripts/generate-skills-badge.mjs` reads `skills.json`. These scripts run in CI and must keep working against whatever shape the data files hold.

Astro's base tsconfig enables `resolveJsonModule`-style JSON imports (JSON modules can be imported directly and are typed structurally).

## Goals / Non-Goals

**Goals:**
- Every data file under `src/data/` exposes a shared, exported TypeScript type.
- Components/pages import data and types from a single shared source (no locally duplicated interfaces).
- The script-generated JSON files remain the source of truth for the data they hold.
- Data-shape drift is caught at build/type-check time.

**Non-Goals:**
- Not converting the raw JSON files to hand-maintained TS modules — the JSON is script-generated and is the durable artifact.
- Not adding a runtime validation/schema library (e.g. zod) — the ask is strong static typing, not runtime validation.
- Not restructuring the existing typed TS modules beyond adding any missing shared types.

## Decisions

### 1. Wrap generated JSON in typed TS modules rather than editing the JSON in place
Each generated JSON file gets a sibling typed module that imports the JSON and re-exports both the typed data and its interfaces:
- `stats.ts` → imports `stats.json`, exports `Stats` / `GitHubStats` / `WakatimeStats` interfaces and `stats`.
- `github-cache.ts` → imports `github-cache.json`, exports a `GithubRepoMeta` interface and a `githubCache: Record<string, GithubRepoMeta>` value.
- `skills.ts` → imports `skills.json`, exports `SkillCategory` / `Skill` interfaces and `skillCategories`.

**Why:** Keeps `scripts/fetch-github.mjs` and `generate-skills-badge.mjs` untouched (they still read/write the JSON), while giving components a single typed import point. Alternatives considered: (a) editing components to cast JSON inline — leaves no shared type and risks drift; (b) converting JSON to TS modules — breaks the scripts that write/read them.

### 2. Components import from the typed wrappers, not raw JSON
- `about.astro`: `import { skillCategories } from '../data/skills'`.
- `open-source.astro`: `import { githubCache } from '../data/github-cache'` and `import { stats } from '../data/stats'`; delete the local `RepoMeta` interface and use the shared `GithubRepoMeta`.

**Why:** One canonical type per data file; the duplicate `RepoMeta` in `open-source.astro` is the exact kind of drift this change removes.

### 3. Mirror existing typed-module conventions for the already-typed files
`homepage.ts`, `nav.ts`, and `socials.ts` already define exported interfaces where they exist. `nav.ts` and `socials.ts` currently export only `const` arrays without named interfaces; add named interfaces (`NavLink`, `SocialLink`) there so consumers reference a shared type rather than inline `typeof` shapes.

**Why:** Consistency across the directory and a shared type for every consumer.

### 4. Verify via the existing type-check/build
Run the project's type-check/build (the `astro check` / `astro build` pipeline) as the gate that every component consuming data still type-checks against the shared types.

## Risks / Trade-offs

- [JSON import typing] If a script writes a field with an unexpected type, the wrapper's type annotation and the imported JSON could disagree → Mitigation: keep wrapper types aligned with what `fetch-github.mjs` actually writes; the fetch script is the authoritative source of the shape.
- [Generated file shape changes] A future change to `fetch-github.mjs` could make `github-cache.json` not match `GithubRepoMeta` → Mitigation: the shared type lives beside the JSON, making it the obvious place to update when the script changes.
- [Emoji/icon fields remain `string`] `icon` fields in card/social data are plain strings, not union types → Mitigation: accepted trade-off; unions add little safety for display-only emoji/icon tokens.

## Migration Plan

Incremental, low-risk:
1. Add typed wrapper modules for `skills`, `stats`, `github-cache`; add named interfaces to `nav.ts` and `socials.ts`.
2. Update the importing components/pages to use the wrappers and shared types.
3. Run the build/type-check to confirm everything still compiles.
4. Rollback is trivial — revert the wrapper/component edits; generated JSON is unchanged.

## Open Questions

None — the approach is scoped by the specs and consistent with the existing typed modules.
