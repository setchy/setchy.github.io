import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects, ROLE_LABELS } from '../data/projects';
import { githubCache } from '../data/github-cache';
import { industryItems, TYPE_LABELS as INDUSTRY_TYPES } from '../data/industry';
import { libraryItems, TYPE_LABELS as LIBRARY_TYPES } from '../data/library';
import { skillCategories } from '../data/skills';
import { travelStats } from '../data/travel';

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const strip = (s: string) =>
  s
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const totalStars = Object.values(githubCache).reduce((s, r) => s + (r.stargazers_count ?? 0), 0);

const openSourceBody = strip(
  projects
    .map((p) => {
      const key = p.repo ? `${p.owner}/${p.repo}` : p.owner;
      const meta = key && githubCache[key] ? githubCache[key] : null;
      return [p.repo ? `${p.owner}/${p.repo}` : `${p.owner} (organization)`, p.category, ROLE_LABELS[p.role].label, meta?.description ?? p.note ?? '', meta?.homepage ?? ''].join(' — ');
    })
    .join('\n') +
    `\nTotal GitHub stars across projects: ${totalStars}. Followers of Adam Setch, open-source maintainer and contributor.`,
);

const industryBody = strip(
  industryItems.map((item) => `${item.title} — ${item.topic} — ${INDUSTRY_TYPES[item.type].label}`).join('\n'),
);

const libraryBody = strip(
  libraryItems.map((item) => `${item.title} — ${item.topic} — ${LIBRARY_TYPES[item.type].label}`).join('\n'),
);

const aboutBody = strip(
  skillCategories.flatMap((c) => [c.title, ...c.skills.map((s) => s.name)]).join(', ') +
    '\nCurrently Distinguished Engineer & Senior Director at Cisco; former VP at World Fuel (Fortune 100). Advisory & interests: Software Health (dependencies, SBOM, LeanIX, Renovate, Dependency-Track), Developer Experience, Engineering Productivity, Federated API Strategy (GraphQL, Apollo, AsyncAPI), Career Development (guilds, communities of practice, Skills Framework for the Information Age / SFIA), Software Security (supply chain), Technology Strategy (tech radars, emerging technology trends).',
);

const travelBody = `Where we have traveled — ${travelStats.countries} countries, ${travelStats.territories} territories, ${travelStats.regions} regions, ${travelStats.cities} cities and ${travelStats.attractions} attractions. The Skratch map and travels on Instagram @cassbtravels.`;

export const GET: APIRoute = async () => {
  const sections = await getCollection('sections');

  const items = [
    ...sections.map((entry) => ({
      title: entry.data.title,
      url: `/${entry.data.permalink}`,
      body: strip(entry.body ?? ''),
      tags: entry.data.tags.join(' '),
      date: dateFmt.format(entry.data.date),
    })),
    {
      title: 'About',
      url: '/about',
      body: aboutBody,
      tags: 'about adam setch interests skills developer experience dx career pathways graphql apis rest asyncapi dependency management renovate sbom tech radars innovation',
      date: '',
    },
    {
      title: 'Open Source',
      url: '/open-source',
      body: openSourceBody,
      tags: 'open source github projects repositories stars forks maintainer contributor created',
      date: '',
    },
    {
      title: 'Industry',
      url: '/industry',
      body: industryBody,
      tags: 'industry talks presentations webinars case studies graphql launchdarkly owasp dependency track',
      date: '',
    },
    {
      title: 'Library',
      url: '/library',
      body: libraryBody,
      tags: 'library books podcasts blogs ebooks technology resources architecture apis engineering leadership',
      date: '',
    },
    {
      title: 'Travel',
      url: '/travel',
      body: travelBody,
      tags: 'travel map skratch instagram wander atlas countries cities regions attractions cassandra',
      date: '',
    },
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};