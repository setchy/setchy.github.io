// Fetches GitHub metadata for each curated project and writes a cache file
// consumed by the /open-source page. Run: npm run fetch:github
import { writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';

const GITHUB_API = 'https://api.github.com';
const CACHE_OUT = new URL('../src/data/github-cache.json', import.meta.url);
const STATS_OUT = new URL('../src/data/stats.json', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'setchy.io',
};

// Optional: GITHUB_TOKEN env var raises the rate limit from 60 to 5000 req/hr
if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
}

// Fetch repo cache
const cache = {};

for (const p of projects) {
  if (!p.repo) continue;
  const key = `${p.owner}/${p.repo}`;
  try {
    const res = await fetch(`${GITHUB_API}/repos/${key}`, { headers });
    if (!res.ok) {
      console.warn(`  ${res.status} ${key} (skipped)`);
      continue;
    }
    const data = await res.json();
    cache[key] = {
      description: data.description,
      html_url: data.html_url,
      homepage: data.homepage,
      language: data.language,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      topics: data.topics ?? [],
      license: data.license?.spdx_id ?? null,
      archived: data.archived,
    };
    console.log(`  ok  ${key} ★${data.stargazers_count}`);
  } catch (err) {
    console.warn(`  err ${key}: ${err.message}`);
  }
}

writeFileSync(CACHE_OUT, JSON.stringify(cache, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(cache).length} entries to ${CACHE_OUT.pathname.split('/').slice(-1)}`);

// Fetch user stats (followers)
try {
  const res = await fetch(`${GITHUB_API}/users/setchy`, { headers });
  if (res.ok) {
    const user = await res.json();
    const stats = {
      github: { followers: user.followers },
      wakatime: { hours: 2879 },
    };
    writeFileSync(STATS_OUT, JSON.stringify(stats, null, 2) + '\n');
    console.log(`Wrote stats to ${STATS_OUT.pathname.split('/').slice(-1)} (followers: ${user.followers})`);
  }
} catch (err) {
  console.warn(`  err fetching user stats: ${err.message}`);
}
