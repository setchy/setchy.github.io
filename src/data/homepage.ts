import { pageMeta } from './page-meta';

export interface HomepageCard {
  permalink: string;
  title: string;
  icon: string;
  blurb: string;
}

/** Short card labels that intentionally differ from the corresponding page h1s. */
const cardTitleOverrides: Record<string, string> = {
  about: 'About',
  'open-source': 'Open Source',
};

export const cards: HomepageCard[] = [
  { permalink: 'about', blurb: 'About me, my interests and skills' },
  { permalink: 'open-source', blurb: 'Open source software projects which I enjoy working on' },
  { permalink: 'industry', blurb: 'Industry contributions through conference presentations, webinars and case studies' },
  { permalink: 'radars', blurb: 'Technology radars, Thoughtworks radar volumes and enhancements' },
  { permalink: 'library', blurb: 'My favorite technology resources: blogs, podcasts and ebooks' },
  { permalink: 'travel', blurb: "Where we've traveled — stats, the Skratch map and adventures" },
].map((c) => ({
  permalink: c.permalink,
  title: cardTitleOverrides[c.permalink] ?? pageMeta[c.permalink].title,
  icon: pageMeta[c.permalink].icon,
  blurb: c.blurb,
}));