import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { pageMeta } from '../../data/page-meta';

// Titles/descriptions for the static pages derive from the shared page
// metadata registry (ogTitle/ogDescription keep the shorter OG copy).
const staticPages = Object.fromEntries(
  Object.entries(pageMeta).map(([key, meta]) => [
    key,
    { title: meta.ogTitle ?? meta.title, description: meta.ogDescription ?? meta.description },
  ]),
);

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
      title: { color: [23, 29, 43], size: 70, weight: 'SemiBold' },
      description: { color: [107, 114, 128], size: 36 },
    },
    fonts: [
      './node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2',
      './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
    ],
  }),
});