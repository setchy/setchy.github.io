## ADDED Requirements

### Requirement: Homepage stats strip
The homepage hero SHALL display a strip of key stats (GitHub stars, OSS project count, talks count, countries visited) derived from existing site data at build time.

#### Scenario: Stats render on homepage
- **WHEN** a visitor opens the homepage
- **THEN** the hero shows a stats strip with the derived numbers

#### Scenario: Stats link to sections
- **WHEN** a visitor clicks a hero stat
- **THEN** the visitor is taken to the relevant section page

### Requirement: Navigation iconography
The site navigation SHALL use consistent vector icons (icon font or inline SVG) for controls and branding, rather than emoji glyphs.

#### Scenario: Nav controls use vector icons
- **WHEN** a visitor opens the site on any viewport
- **THEN** search, theme-toggle, and menu controls render vector icons

## MODIFIED Requirements

### Requirement: Brand color scheme
The site SHALL use a cohesive brand color palette built around a single signature accent color, applied consistently across the page background, text, links, navigation, cards, and footer in both light and dark themes.

#### Scenario: Links use brand accent
- **WHEN** a visitor hovers over a link
- **THEN** the link changes to the brand hover accent

#### Scenario: Accent is consistent
- **WHEN** a visitor moves across pages
- **THEN** interactive highlights (links, active nav, focus rings) consistently use the signature accent family

### Requirement: Cover-image hero banners
Every top-level section page SHALL display a full-width cover image behind the page title and subtitle; the homepage SHALL instead use a typographic hero without a cover image.

#### Scenario: Section pages show heroes
- **WHEN** a visitor opens About, OSS, Industry, Radars, Library, Travel, or Blogs
- **THEN** each page shows its cover image behind the title, treated consistently

#### Scenario: Homepage uses typographic hero
- **WHEN** a visitor opens the homepage
- **THEN** a typographic hero renders the name, positioning statement, and stats strip without a cover image

### Requirement: Card-based homepage layout
The homepage SHALL present the site's sections (About, OSS, Industry, Radars, Library, Travel) as a responsive grid of cards below the hero, styled consistently with the rest of the design.

#### Scenario: Section cards link correctly
- **WHEN** a visitor clicks a homepage section card
- **THEN** the visitor is taken to that section's page

#### Scenario: Cards available on mobile
- **WHEN** a visitor opens the homepage on a narrow viewport
- **THEN** the card grid reflows to fit the viewport without horizontal overflow

### Requirement: Dark mode
The site SHALL provide a dark mode that switches the entire visual theme (backgrounds, text, navigation, cards, footer) to a re-tuned dark palette in which the signature accent stays legible, honoring the user's system preference and allowing a manual toggle that persists.

#### Scenario: System prefers dark
- **WHEN** the visitor's OS is set to dark mode
- **THEN** the site renders in dark mode by default

#### Scenario: Manual toggle
- **WHEN** a visitor toggles dark mode in the navigation
- **THEN** the site switches between light and dark and persists the choice

### Requirement: Custom typography
The site SHALL use a defined self-hosted font pairing — a serif display face for headings, a sans-serif face for body/UI, and a monospace face for technical metadata — with no external font CDN dependency.

#### Scenario: Fonts load on all pages
- **WHEN** any page renders
- **THEN** headings use the display face, body uses the sans face, and technical metadata uses the mono face

#### Scenario: Fonts require no external CDN
- **WHEN** a page loads
- **THEN** the font files are served from the site's own assets

### Requirement: Subtle animations
The site SHALL include subtle, tasteful animations (card hover effects, fade-in on hero, smooth scroll) and clear focus-visible feedback that do not interfere with content readability and honor reduced-motion preferences.

#### Scenario: Card hover animation
- **WHEN** a visitor hovers over a homepage card
- **THEN** the card shows a subtle elevation or transform effect

#### Scenario: Keyboard focus visible
- **WHEN** a visitor tabs through the page
- **THEN** focused interactive elements show a clear focus ring

#### Scenario: Reduced motion honored
- **WHEN** the visitor prefers reduced motion
- **THEN** decorative animation is suppressed