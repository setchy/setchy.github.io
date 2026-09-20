export interface HomepageCard {
  permalink: string;
  title: string;
  icon: string;
  blurb: string;
}

export const cards: HomepageCard[] = [
  { permalink: 'about', title: 'About', icon: 'fa-solid fa-user', blurb: 'About me, my interests and skills' },
  { permalink: 'open-source', title: 'Open Source', icon: 'fa-solid fa-code-branch', blurb: 'Open source software projects which I enjoy working on' },
  { permalink: 'industry', title: 'Industry', icon: 'fa-solid fa-microphone', blurb: 'Industry contributions through conference presentations, webinars and case studies' },
  { permalink: 'radars', title: 'Radars', icon: 'fa-solid fa-satellite-dish', blurb: 'Technology radars, Thoughtworks radar volumes and enhancements' },
  { permalink: 'library', title: 'Library', icon: 'fa-solid fa-book', blurb: 'My favorite technology resources: blogs, podcasts and ebooks' },
  { permalink: 'travel', title: 'Travel', icon: 'fa-solid fa-plane', blurb: "Our world Skratch map and global adventures" },
];
