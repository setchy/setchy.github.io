## Purpose

Keeps the existing Google Analytics and Cloudflare Analytics tracking working across every page of the rebuilt Astro site.

## ADDED Requirements

### Requirement: Load Google Analytics
The site SHALL load Google Analytics (GTM ID `G-1KRZQ6HQZ6`) on every page so traffic is tracked as it is today.

#### Scenario: GA script present on pages
- **WHEN** any page is served
- **THEN** the Google Analytics gtag script is included in the page head

### Requirement: Load Cloudflare Analytics
The site SHALL load the Cloudflare Analytics beacon on every page.

#### Scenario: Cloudflare beacon present on pages
- **WHEN** any page is served
- **THEN** the Cloudflare Analytics beacon script is included

### Requirement: Respect privacy and performance
Analytics scripts SHALL not block page rendering (loaded with defer or async where supported) and SHALL not be included on pages that opt out.

#### Scenario: Analytics do not block first paint
- **WHEN** a page loads
- **THEN** analytics scripts load without blocking page content rendering
