## Purpose

Migrates all setchy.io markdown content into Astro content collections with frontmatter-driven metadata, preserving the content, structure, and links of the existing Jekyll site.

## ADDED Requirements

### Requirement: Migrate all existing content
The site SHALL include the full content of the About, Open Source, Industry, Radars, Library, and Blogs pages, with all links, icons, and formatting intact.

#### Scenario: About page content present
- **WHEN** a visitor opens `/about/`
- **THEN** the page shows the About bio, interests, and the full skills icon gallery

#### Scenario: Open Source links intact
- **WHEN** a visitor opens `/open-source`
- **THEN** the page lists every project with its category, status marker (created/maintain/contribute), and GitHub link

#### Scenario: Radars volumes present
- **WHEN** a visitor opens `/radars`
- **THEN** the page lists the ThoughtWorks radar volumes and the enhanced radar links

### Requirement: Encode content as structured collections
All section content SHALL live in Astro content collections with typed frontmatter (title, date, tags, layout markers) so it can be queried, listed, and rendered.

#### Scenario: Content is queryable by collection
- **WHEN** a page lists section content
- **THEN** entries are read from an Astro content collection with their frontmatter intact

### Requirement: Preserve tags and tag index
Every section page's tags SHALL be preserved, and the `/tags` page SHALL group and link content by tag as on the Jekyll site.

#### Scenario: Tags page lists grouped content
- **WHEN** a visitor opens `/tags`
- **THEN** the page lists all tags with counts and the entries tagged under each

### Requirement: Keep external links and icons
External links (blogs, podcasts, ebooks, radar volumes, presentations) SHALL keep their URLs, target behavior, and the icon styling used on the Jekyll site.

#### Scenario: External links open in new tab
- **WHEN** a visitor clicks an external resource link
- **THEN** the link opens in a new tab and the associated icon is displayed
