import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const sections = (await getCollection('sections')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'setchy.io',
    description: 'Personal site of Adam Setch',
    site: context.site ?? 'https://setchy.io',
    items: sections.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description ?? entry.data.title,
      link: `/${entry.data.permalink}`,
    })),
    customData: '<language>en-us</language>',
  });
}
