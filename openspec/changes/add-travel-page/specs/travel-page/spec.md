## Purpose

Defines the Travel page at `/travel`, which showcases travels through wander-atlas high-level stats, an embedded Skratch travel map, and a link to the travel Instagram account.

## ADDED Requirements

### Requirement: Travel page renders with hero
The site SHALL provide a `/travel` page rendered with the standard page layout: a full-width cover hero behind the page title.

#### Scenario: Travel page shows hero
- **WHEN** a visitor opens `/travel`
- **THEN** the page displays the "Travel" title over a full-width cover image

### Requirement: Travel stats displayed from committed data
The Travel page SHALL display high-level travel stats (countries, territories, regions, cities, attractions) sourced from committed site data populated from the public Skratch share API, with countries and territories counted separately. World coverage (world regions visited and percent of the world's countries) SHALL be shown.

#### Scenario: Stats render from travel data
- **WHEN** a visitor opens `/travel` and the committed travel data file contains stat values
- **THEN** the page displays a row of stat badges with countries, territories, regions, cities, and attractions as separate counts

#### Scenario: World coverage shown
- **WHEN** a visitor opens `/travel`
- **THEN** the page shows how many of the world regions have been visited and the share of the world's countries visited

#### Scenario: Stats reflect committed data
- **WHEN** the committed travel data file is updated
- **THEN** the next site build reflects the updated values on the Travel page

### Requirement: Skratch map embedded
The Travel page SHALL embed the Skratch travels map from the public share URL `https://share.skratch.world/N0cBlEVoB8/visited` inside the page.

#### Scenario: Map iframe renders
- **WHEN** a visitor opens `/travel`
- **THEN** a lazy-loaded iframe displays the Skratch map at the share URL

#### Scenario: Fallback link to full map
- **WHEN** a visitor cannot load or interact with the embedded map
- **THEN** a link is available that opens the full Skratch map in a new tab

### Requirement: Travel Instagram link
The Travel page SHALL provide a link to the travel Instagram account at `https://www.instagram.com/cassbtravels/`.

#### Scenario: Instagram link opens in new tab
- **WHEN** a visitor clicks the Instagram link on the Travel page
- **THEN** the cassbtravels Instagram profile opens in a new tab