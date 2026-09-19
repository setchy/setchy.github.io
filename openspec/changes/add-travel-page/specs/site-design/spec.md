## MODIFIED Requirements

### Requirement: Cover-image hero banners
Every top-level page SHALL display a full-width cover image behind the page title and subtitle.

#### Scenario: Homepage shows hero
- **WHEN** a visitor opens the homepage
- **THEN** a full-width cover image is displayed with the site title and subtitle overlaid

#### Scenario: Section pages show heroes
- **WHEN** a visitor opens About, OSS, Industry, Radars, Library, Blogs, or Travel
- **THEN** each page shows its own cover image behind the title

### Requirement: Card-based homepage layout
The homepage SHALL present the site's sections (OSS, Industry, Radars, Library, Blogs, Travel) as a responsive grid of cards rather than a plain text list.

#### Scenario: Section cards link correctly
- **WHEN** a visitor clicks a homepage section card
- **THEN** the visitor is taken to that section's page

#### Scenario: Travel card present
- **WHEN** a visitor opens the homepage
- **THEN** a Travel card is visible in the card grid with a link to `/travel`