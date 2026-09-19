## Purpose

Defines the visual design of the Astro site: brand colors, cover-image hero banners, a card-based homepage, dark mode, typography, and subtle animations.

## ADDED Requirements

### Requirement: Brand color scheme
The site SHALL use a cohesive brand color palette applied across the page background, text, links, navbar, and footer.

#### Scenario: Links use brand color
- **WHEN** a visitor hovers over a link
- **THEN** the link changes to the brand hover color

### Requirement: Cover-image hero banners
Every top-level page SHALL display a full-width cover image behind the page title and subtitle.

#### Scenario: Homepage shows hero
- **WHEN** a visitor opens the homepage
- **THEN** a full-width cover image is displayed with the site title and subtitle overlaid

#### Scenario: Section pages show heroes
- **WHEN** a visitor opens About, OSS, Industry, Radars, Library, or Blogs
- **THEN** each page shows its own cover image behind the title

### Requirement: Card-based homepage layout
The homepage SHALL present the five sections (OSS, Industry, Radars, Library, Blogs) as a responsive grid of cards rather than a plain text list.

#### Scenario: Section cards link correctly
- **WHEN** a visitor clicks a homepage section card
- **THEN** the visitor is taken to that section's page

### Requirement: Dark mode
The site SHALL provide a dark mode that switches the entire visual theme (backgrounds, text, navbar, cards) to a dark palette, honoring the user's system preference and allowing manual toggle.

#### Scenario: System prefers dark
- **WHEN** the visitor's OS is set to dark mode
- **THEN** the site renders in dark mode by default

#### Scenario: Manual toggle
- **WHEN** a visitor toggles dark mode in the navigation
- **THEN** the site switches between light and dark and persists the choice

### Requirement: Custom typography
The site SHALL use a defined font pairing for headings and body text.

#### Scenario: Fonts load on all pages
- **WHEN** any page renders
- **THEN** headings and body text use the site's chosen font family

### Requirement: Subtle animations
The site SHALL include subtle, tasteful animations (e.g., card hover effects, fade-in on hero, smooth scroll) that do not interfere with content readability.

#### Scenario: Card hover animation
- **WHEN** a visitor hovers over a homepage card
- **THEN** the card shows a subtle elevation or transform effect

### Requirement: Responsive layout
The site SHALL render correctly on mobile, tablet, and desktop viewports.

#### Scenario: Mobile navigation usable
- **WHEN** a visitor opens the site on a narrow viewport
- **THEN** navigation collapses into a usable menu and content reflows without horizontal overflow
