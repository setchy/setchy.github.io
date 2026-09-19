import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { travelStats } from '../../data/travel';

const staticPages = {
  home: {
    title: "Hi, I'm Adam",
    description: 'Distinguished Engineer & Chief Architect — building engineering organizations, open source, and communities that scale.',
  },
  about: { title: 'About', description: 'Interests, skills and how I work' },
  'open-source': { title: 'Open Source', description: 'Creator, Maintainer, Contributor' },
  industry: { title: 'Industry', description: 'Talks, webinars and case studies' },
  radars: { title: 'Radars', description: 'Thoughtworks Technology Radar volumes' },
  library: { title: 'Library', description: 'Favorite technology resources' },
  blogs: { title: 'Blogs', description: 'A collection of favorite blogs' },
  travel: {
    title: 'Travel',
    description: `Our holiday travels — ${travelStats.countries} countries, on the map and in numbers`,
  },
  tags: { title: 'Tags', description: 'Browse posts by tag' },
  404: { title: 'Page not found', description: 'The requested page could not be found' },
};

const sections = await getCollection('sections');
const sectionPages = Object.fromEntries(
  sections.map((entry) => [
    entry.data.permalink.replace(/\/$/, ''),
    { title: entry.data.title, description: entry.data.description ?? 'setchy.io' },
  ]),
);

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...sectionPages },
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description ?? '',
    bgGradient: [
      [251, 251, 253],
      [240, 242, 252],
    ],
    border: { color: [79, 70, 229], width: 12 },
    font: {
      title: { color: [23, 29, 43], size: 70, weight: 600 },
      description: { color: [107, 114, 128], size: 36 },
    },
    fonts: [
      './node_modules/@fontsource/newsreader/files/newsreader-latin-600-normal.woff2',
      './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
    ],
  }),
});