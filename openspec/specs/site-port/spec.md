## Purpose

Rebuilds the setchy.io personal site as an Astro static site while preserving all existing URLs, content, and the production deployment.

## ADDED Requirements

### Requirement: Preserve public URLs
The site SHALL serve every existing public URL under the same paths as the Jekyll site: `/`, `/about/`, `/open-source`, `/industry`, `/radars`, `/library`, `/blogs`, and `/tags`.

#### Scenario: About page URL unchanged
- **WHEN** a visitor requests `/about/`
- **THEN** the site returns the About page with HTTP 200

#### Scenario: Section page URLs unchanged
- **WHEN** a visitor requests `/open-source`, `/industry`, `/radars`, `/library`, or `/blogs`
- **THEN** the site returns the corresponding section page with HTTP 200

#### Scenario: Custom 404 for unknown paths
- **WHEN** a visitor requests a path that does not exist
- **THEN** the site returns the custom 404 page with HTTP 404

### Requirement: Deploy to production unchanged
The site SHALL deploy to the setchy.io domain via Netlify, with the same deploy site URL as the current site.

#### Scenario: Production build succeeds
- **WHEN** Netlify runs the site build
- **THEN** the build completes successfully and the site is served at https://setchy.io

### Requirement: Generate SEO and discovery artifacts
The site SHALL generate `sitemap.xml`, `robots.txt`, and an RSS feed so that search engines and feed readers can discover content.

#### Scenario: Sitemap is generated
- **WHEN** a visitor requests `/sitemap.xml`
- **THEN** the site returns a sitemap listing the site's public pages

#### Scenario: RSS feed is generated
- **WHEN** a visitor requests `/feed.xml`
- **THEN** the site returns an RSS feed of site content

### Requirement: Provide search across site content
The site SHALL allow visitors to search across all page content from a search control in the navigation.

#### Scenario: Search returns matching pages
- **WHEN** a visitor searches for a term present on one or more pages
- **THEN** the site displays the matching pages with titles and links

### Requirement: Retain per-page metadata
Each page SHALL retain its title, tags, and last-updated date so it can be listed, searched, and linked the same way as on the Jekyll site.

#### Scenario: Section pages carry tags
- **WHEN** the Radars, Library, Open Source, Industry, or Blogs pages are rendered
- **THEN** their tags are available and linked from the tags index
