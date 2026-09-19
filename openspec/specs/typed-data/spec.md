# typed-data Specification

## Purpose

Establishes strong, shared TypeScript types for every data file under `src/data/` so components consume typed data and shape drift is caught at type-check and build time instead of failing at runtime.

## Requirements

### Requirement: Every data file exposes strong shared types
The system SHALL expose a strongly-typed TypeScript interface for each data module under `src/data/`. Consumers MUST import these types from a single shared source rather than re-declaring local or inline shapes.

#### Scenario: Skills data is typed
- **WHEN** a component imports the skills data (`src/data/skills`)
- **THEN** the imported value is typed as an array of skill categories, each with a `title` and a list of skills having `slug`, `name`, and `url`.

#### Scenario: Stats data is typed
- **WHEN** a component imports the stats data (`src/data/stats`)
- **THEN** the imported value is typed with a `github.followers` number and a `wakatime.hours` number.

#### Scenario: GitHub cache data is typed
- **WHEN** a component imports the GitHub repository cache (`src/data/github-cache`)
- **THEN** each repository key is typed with `description`, `html_url`, `homepage`, `language`, `stargazers_count`, `forks_count`, `topics`, `license`, and `archived`, matching the shape written by the fetch script.

### Requirement: Components consume shared data types
Components and pages that render data-driven content SHALL consume the shared data types for `src/data` and MUST NOT duplicate those type definitions locally.

#### Scenario: Open-source page uses shared repo type
- **WHEN** `open-source.astro` renders the GitHub repo cache
- **THEN** it imports and uses the shared repository metadata type instead of defining its own local `RepoMeta` interface.

### Requirement: Data generation scripts keep producing valid typed data
The scripts that generate or read data (`scripts/fetch-github.mjs`, `scripts/generate-skills-badge.mjs`) SHALL continue to write and consume data matching the shared typed shapes, so the generated JSON remains type-valid.

#### Scenario: Generated data remains type-valid
- **WHEN** `fetch-github.mjs` writes `stats.json` and `github-cache.json`
- **THEN** the written files conform to the shared `stats` and `github-cache` types.

### Requirement: Build and type-check gate data-shape integrity
The project SHALL verify data-shape integrity as part of its build/type-check so a breaking change to a data file's shape is caught during development.

#### Scenario: Data shape change is caught at build
- **WHEN** a data file's shape changes such that a component's typed usage no longer matches
- **THEN** the type-check/build reports an error rather than failing silently at runtime.
