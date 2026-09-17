import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export const GET: APIRoute = async () => {
  const sections = await getCollection('sections');

  const items = [
    ...sections.map((entry) => ({
      title: entry.data.title,
      url: `/${entry.data.permalink}`,
      body: (entry.body ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim(),
      tags: entry.data.tags.join(' '),
      date: dateFmt.format(entry.data.date),
    })),
    {
      title: 'Travel',
      url: '/travel',
      body: 'Where we have traveled — high-level travel stats, the Skratch map, and travels on Instagram',
      tags: 'travel map skratch instagram wander atlas countries cities',
      date: '',
    },
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
