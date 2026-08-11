import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export const GET: APIRoute = async () => {
  const sections = await getCollection('sections');
  const pages = await getCollection('pages');

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
    ...pages.map((entry) => ({
      title: entry.data.title,
      url: entry.data.permalink,
      body: (entry.body ?? '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim(),
      tags: '',
      date: 'January 1, 1970',
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
