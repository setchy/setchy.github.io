export interface HomepageCard {
  permalink: string;
  title: string;
  icon: string;
  blurb: string;
  cover: string;
}

export const cards: HomepageCard[] = [
  { permalink: 'about', title: 'About', icon: 'fa-solid fa-user', blurb: 'About me, my interests and skills', cover: '/covers/home.svg' },
  { permalink: 'open-source', title: 'Open Source', icon: 'fa-solid fa-code-branch', blurb: 'Open source software projects which I enjoy working on', cover: '/covers/oss.svg' },
  { permalink: 'industry', title: 'Industry', icon: 'fa-solid fa-microphone', blurb: 'Industry contributions through conference presentations, webinars and case studies', cover: '/covers/industry.svg' },
  { permalink: 'radars', title: 'Radars', icon: 'fa-solid fa-satellite-dish', blurb: 'Technology radars, Thoughtworks radar volumes and enhancements', cover: '/covers/radars.svg' },
  { permalink: 'library', title: 'Library', icon: 'fa-solid fa-book', blurb: 'My favorite technology resources: blogs, podcasts and ebooks', cover: '/covers/library.svg' },
  { permalink: 'travel', title: 'Travel', icon: 'fa-solid fa-plane', blurb: "Where we've traveled — stats, the Skratch map and adventures", cover: '/covers/travel.svg' },
];
