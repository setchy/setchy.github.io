import { travelStats } from './travel';

/**
 * Single source of truth for page identity: the browser/h1 title, the page
 * description, and the Font Awesome icon shown in each page header.
 * Consumers: page headers ([...slug], and via ContentPageLayout), the
 * open-graph route, and homepage cards. Optional `ogTitle`/`ogDescription`
 * keep the tuned, shorter copy used on open-graph images.
 */
export interface PageMeta {
  /** Page/browser title and header heading. */
  title: string;
  /** Page description used for meta tags and (usually) the header subtitle. */
  description: string;
  /** Font Awesome icon class used by the page header badge. */
  icon: string;
  /** Optional shorter title for open-graph images. */
  ogTitle?: string;
  /** Optional shorter description for open-graph images. */
  ogDescription?: string;
}

/**
 * Page metadata keyed by permalink. Covers the static routes plus the
 * content sections rendered through [...slug].astro.
 */
export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: "Hi, I'm Adam",
    description: 'Distinguished Engineer · Chief Architect · Technology Advisor',
    icon: 'fa-solid fa-house',
    ogDescription:
      'Distinguished Engineer & Chief Architect — building engineering organizations, open source, and communities that scale.',
  },
  about: {
    title: 'About me',
    description: 'Distinguished Engineer · Chief Architect · Technology Advisor',
    icon: 'fa-solid fa-user',
    ogTitle: 'About',
    ogDescription: 'Interests, skills and how I work',
  },
  'open-source': {
    title: 'Open Source Projects',
    description: 'A collection of open source software projects which I enjoy working on',
    icon: 'fa-solid fa-code-branch',
    ogTitle: 'Open Source',
    ogDescription: 'Creator, Maintainer, Contributor',
  },
  industry: {
    title: 'Industry',
    description:
      'A collection of my industry contributions through conference presentations, webinars and case studies',
    icon: 'fa-solid fa-microphone',
    ogDescription: 'Talks, webinars and case studies',
  },
  radars: {
    title: 'Radars',
    description: 'Thoughtworks Technology Radar volumes',
    icon: 'fa-solid fa-satellite-dish',
  },
  library: {
    title: 'Library',
    description:
      'A collection of my favorite technology resources that I use to keep up-to-date with the technology industry',
    icon: 'fa-solid fa-book',
    ogDescription: 'Favorite technology resources',
  },
  blogs: {
    title: 'Blogs',
    description: 'A collection of favorite blogs',
    icon: 'fa-solid fa-newspaper',
  },
  travel: {
    title: 'Travel',
    description: 'Our holiday travels in stats and on the map',
    icon: 'fa-solid fa-plane',
    ogDescription: `Our holiday travels — ${travelStats.countries} countries, on the map and in numbers`,
  },
  tags: {
    title: 'Tag Index',
    description: 'All tags used across the site',
    icon: 'fa-solid fa-tags',
    ogTitle: 'Tags',
    ogDescription: 'Browse posts by tag',
  },
  404: {
    title: '404 — Page not found',
    description: 'The requested page could not be found',
    icon: 'fa-solid fa-compass',
    ogTitle: 'Page not found',
  },
};

/** Icon used when a page/section has no registry entry. */
export const pageMetaFallbackIcon = 'fa-solid fa-rss';