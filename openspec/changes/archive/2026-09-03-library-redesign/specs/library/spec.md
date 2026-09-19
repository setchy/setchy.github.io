## Purpose

Provides a data-driven Library page that renders blog, podcast, and ebook resources as compact filterable cards, grouped by topic.

## ADDED Requirements

### Requirement: Library data model
The system SHALL define library items with the following fields: `title` (string), `url` (string), `type` (one of `blog`, `podcast`, `ebook`), and `topic` (string).

#### Scenario: Item has all required fields
- **WHEN** a library item is defined in the data source
- **THEN** it SHALL include `title`, `url`, `type`, and `topic` with non-empty values

### Requirement: Content type filtering
The system SHALL provide a filter bar with buttons for "All", "Blogs", "Podcasts", and "eBooks". Clicking a filter SHALL show only items matching that type and hide the rest. Empty topic sections SHALL be hidden when no items match the active filter.

#### Scenario: Filter by content type
- **WHEN** user clicks the "Podcasts" filter button
- **THEN** only podcast items are visible and non-podcast items are hidden

#### Scenario: Empty sections hidden
- **WHEN** a content type filter is active
- **AND** a topic section contains no items of the selected type
- **THEN** that topic section SHALL be hidden

#### Scenario: Reset to all
- **WHEN** user clicks the "All" filter button
- **THEN** all items across all types are visible

### Requirement: Topic grouping
The system SHALL group items under topic section headings. Each topic heading SHALL be an `<h2>` element. Items within a topic are rendered in a responsive CSS grid.

#### Scenario: Topics are displayed
- **WHEN** the library page renders
- **THEN** each topic with at least one item SHALL appear as a section with an `<h2>` heading

### Requirement: Compact card layout
Each library item SHALL render as a compact card containing a type icon, the item title (linked to its URL), and a topic badge. Cards SHALL NOT include descriptions or metadata beyond type and topic.

#### Scenario: Card content
- **WHEN** a library item renders as a card
- **THEN** the card displays the type icon, a clickable title, and a topic badge

### Requirement: Type icons
The system SHALL display an icon for each content type: a feed/RSS icon for blogs, a headphones icon for podcasts, and a book/PDF icon for ebooks.

#### Scenario: Icon per type
- **WHEN** a card renders for a given type
- **THEN** the corresponding type icon is displayed

### Requirement: Page metadata
The library page SHALL include a hero header with the title "Library" and a description matching the existing page.

#### Scenario: Hero renders
- **WHEN** the library page loads
- **THEN** the hero header displays the title and description
