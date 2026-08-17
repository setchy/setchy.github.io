export interface HomepageCard {
  permalink: string;
  title: string;
  icon: string;
  blurb: string;
  cover: string;
}

export const cards: HomepageCard[] = [
  { permalink: 'about', title: 'About', icon: '👤', blurb: 'About me, my interests and skills', cover: '/covers/home.svg' },
  { permalink: 'open-source', title: 'Open Source', icon: '💻', blurb: 'Open source software projects which I enjoy working on', cover: '/covers/oss.svg' },
  { permalink: 'industry', title: 'Industry', icon: '🎤', blurb: 'Industry contributions through conference presentations, webinars and case studies', cover: '/covers/industry.svg' },
  { permalink: 'radars', title: 'Radars', icon: '📡', blurb: 'Technology radars, Thoughtworks radar volumes and enhancements', cover: '/covers/radars.svg' },
  { permalink: 'library', title: 'Library', icon: '📚', blurb: 'My favorite technology resources: blogs, podcasts and ebooks', cover: '/covers/library.svg' },
];
