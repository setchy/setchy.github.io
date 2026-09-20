// Fetches GitHub metadata for each curated project and writes a cache file
// consumed by the /open-source page. Run: npm run fetch:github
//
// All API calls go through the `gh` CLI (your keyring token, or GH_TOKEN /
// GITHUB_TOKEN in CI). The script fails fast with an error if gh is missing or
// unauthenticated, and a failed run never clobbers the existing cache.
//
// The "since" date per repo is setchy's OLDEST authored commit on the primary
// branches (default + main + master), so it reflects when the site owner first
// contributed rather than when the repository was created.
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { projects } from '../src/data/projects.ts';

const CACHE_OUT = new URL('../src/data/github-cache.json', import.meta.url);
const STATS_OUT = new URL('../src/data/stats.json', import.meta.url);

const AUTHOR = 'setchy'; // GitHub login whose first commits are tracked
const BRANCHES = ['main', 'master'];

// Fail fast unless we can reach the GitHub API as an authenticated gh user.
try {
  if (spawnSync('gh', ['--version'], { stdio: 'ignore' }).status !== 0) {
    console.error('fetch:github requires the GitHub CLI (`gh`). Install it (`brew install gh`) and run `gh auth login`.');
    process.exit(1);
  }
  const probe = spawnSync('gh', ['api', 'rate_limit', '--jq', '.resources.core.limit'], { encoding: 'utf8' });
  if (probe.status !== 0) {
    console.error('fetch:github cannot reach the GitHub API with the authenticated `gh` CLI. Run `gh auth login` or set GH_TOKEN/GITHUB_TOKEN.');
    process.exit(1);
  }
} catch (err) {
  console.error(`fetch:github: unexpected gh CLI failure: ${err.message}`);
  process.exit(1);
}

// Run a GraphQL query via the `gh` CLI (no user authorization scopes beyond gh's token required).
function apiGraphql(query) {
  const res = spawnSync('gh', ['api', 'graphql', '--input', '-'], {
    encoding: 'utf8',
    input: JSON.stringify({ query }),
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) return null;
  try {
    return JSON.parse(res.stdout);
  } catch {
    return null;
  }
}

// Sum of setchy's PUBLIC contributions across every year GitHub tracks.
// Each year is fetched as a separate alias in a single batched query.
// Reacts to GraphQL failures by returning undefined (caller keeps prior data).
async function totalPublicContributions(author) {
  const meta = apiGraphql(
    `query { user(login: ${JSON.stringify(author)}) { contributionsCollection { contributionYears } } }`,
  );
  const years = meta?.data?.user?.contributionsCollection?.contributionYears;
  if (!Array.isArray(years) || years.length === 0) return undefined;

  let q = 'query {';
  for (const year of years) {
    q += ` y${year}: user(login: ${JSON.stringify(author)}) { contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T00:00:00Z") { contributionCalendar { totalContributions } } }`;
  }
  q += ' }';
  const res = apiGraphql(q);
  if (!res?.data) return undefined;

  let total = 0;
  for (const [key, value] of Object.entries(res.data)) {
    if (!key.startsWith('y')) continue;
    total += value?.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
  }
  return total;
}

// GET an API resource via the `gh` CLI. Returns { ok, status, body, link }.
function apiGet(pathAndQuery, { includeHeaders = false } = {}) {
  const args = ['api'];
  if (includeHeaders) args.push('-i');
  args.push(pathAndQuery);
  const res = spawnSync('gh', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const statusFrom = (s) => {
    const m = /HTTP[^\d]{0,5}(\d{3})/.exec(s || '');
    return m ? Number(m[1]) : null;
  };
  if (res.status !== 0) {
    return { ok: false, status: statusFrom(res.stderr) ?? statusFrom(res.stdout) ?? 0, body: null, link: null };
  }
  if (includeHeaders) {
    const m = /\r?\n\r?\n/.exec(res.stdout);
    const sep = m ? m.index : -1;
    const headerText = sep === -1 ? res.stdout : res.stdout.slice(0, sep);
    const link = /^link:\s*(.+)$/im.exec(headerText)?.[1] ?? null;
    let body = null;
    try {
      body = JSON.parse(sep === -1 ? '' : res.stdout.slice(sep + m[0].length));
    } catch {
      body = null;
    }
    const status = statusFrom(res.stdout) ?? 200;
    return { ok: status >= 200 && status < 300, status, body, link };
  }
  let body = null;
  try {
    body = JSON.parse(res.stdout);
  } catch {
    body = null;
  }
  return { ok: true, status: 200, body, link: null };
}

// setchy's OLDEST authored commit on one branch, or null when he has none there.
// Returns undefined when the query itself failed (caller should keep prior data).
async function oldestSetchyCommitOnBranch(owner, repo, branch) {
  const path = (extra) =>
    `repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=1&author=${AUTHOR}&sha=${encodeURIComponent(branch)}${extra}`;

  const r1 = await apiGet(path(''), { includeHeaders: true });
  if (!r1.ok) return undefined;
  if (!Array.isArray(r1.body) || r1.body.length === 0) return null;

  const last = r1.link && /[?&]page=(\d+)>;\s*rel="last"/i.exec(r1.link);
  const lastPage = last ? Number(last[1]) : 1;
  if (lastPage <= 1) return r1.body[0]?.commit?.author?.date ?? null;

  const r2 = await apiGet(path(`&page=${lastPage}`));
  if (!r2.ok) return undefined;
  if (!Array.isArray(r2.body) || r2.body.length === 0) return null;
  return r2.body[0]?.commit?.author?.date ?? null;
}

// oldest setchy-authored commit across default + main + master.
// undefined means every query failed (keep the previously cached value).
async function firstSetchyCommit(owner, repo, defaultBranch) {
  const branches = [...new Set([defaultBranch, ...BRANCHES].filter(Boolean))];
  let earliest = null;
  let anyFailed = false;
  for (const branch of branches) {
    const d = await oldestSetchyCommitOnBranch(owner, repo, branch);
    if (d === undefined) {
      anyFailed = true;
    } else if (d && (!earliest || Date.parse(d) < Date.parse(earliest))) {
      earliest = d;
    }
  }
  return anyFailed && !earliest ? undefined : earliest;
}

// For org aggregates: oldest setchy-authored commit across the org's public repos.
async function firstSetchyCommitInOrg(org, repos) {
  let earliest = undefined;
  for (const repo of repos) {
    const d = await firstSetchyCommit(org, repo.name, repo.default_branch);
    if (d === undefined) {
      continue;
    }
    if (d && (!earliest || Date.parse(d) < Date.parse(earliest))) earliest = d;
  }
  return earliest ?? null;
}

// Load the existing cache so a failed (or rate-limited) refresh keeps prior entries.
let cache = {};
try {
  cache = JSON.parse(readFileSync(CACHE_OUT, 'utf8'));
} catch {
  cache = {};
}

for (const p of projects) {
  // Org aggregate: when a project has no single repo, sum stats across the
  // organization's public repos and store them under the owner key. The entry
  // keeps the GithubRepoMeta shape so the cache type stays unchanged.
  if (!p.repo) {
    const key = p.owner;
    try {
      const res = await apiGet(`orgs/${encodeURIComponent(p.owner)}/repos?per_page=100`);
      if (!res.ok) {
        console.warn(`  ${res.status} ${key} (skipped)`);
        continue;
      }
      const repos = (res.body ?? []).filter((r) => !r.archived);
      const stars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
      const forks = repos.reduce((s, r) => s + (r.forks_count ?? 0), 0);
      const since = await firstSetchyCommitInOrg(p.owner, repos);
      cache[key] = {
        description: null,
        html_url: p.url ?? `https://github.com/${p.owner}`,
        homepage: `${repos.length} public repos`,
        language: null,
        stargazers_count: stars,
        forks_count: forks,
        topics: [],
        license: null,
        archived: false,
        first_commit_at: since,
      };
      console.log(`  ok  ${key} ★${stars} (${repos.length} public repos)` + (since ? ` since ${new Date(since).getFullYear()}` : ''));
    } catch (err) {
      console.warn(`  err ${key}: ${err.message}`);
    }
    continue;
  }

  const key = `${p.owner}/${p.repo}`;
  try {
    const res = await apiGet(`repos/${key}`);
    if (!res.ok) {
      console.warn(`  ${res.status} ${key} (skipped)`);
      continue;
    }
    const data = res.body;
    const since = await firstSetchyCommit(p.owner, p.repo, data.default_branch);
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
      // keep the previously cached date when this run couldn't determine one
      first_commit_at: since === undefined ? (cache[key]?.first_commit_at ?? null) : since,
    };
    console.log(`  ok  ${key} ★${data.stargazers_count}` + (since ? ` since ${new Date(since).getFullYear()}` : ''));
  } catch (err) {
    console.warn(`  err ${key}: ${err.message}`);
  }
}

writeFileSync(CACHE_OUT, JSON.stringify(cache, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(cache).length} entries to ${CACHE_OUT.pathname.split('/').slice(-1)}`);

// Fetch user stats (followers + all-time public contributions)
try {
  const res = await apiGet('users/setchy');
  const contributions = await totalPublicContributions('setchy');
  if (res.ok) {
    const user = res.body;
    const previous = readFileSync(STATS_OUT, 'utf8');
    let prevContributions = 0;
    try {
      prevContributions = JSON.parse(previous).github?.contributions ?? 0;
    } catch {
      prevContributions = 0;
    }
    const statsData = {
      github: {
        followers: user.followers,
        // keep the previously cached value when this run couldn't determine one
        contributions: contributions ?? prevContributions,
      },
      wakatime: { hours: 2879 },
    };
    writeFileSync(STATS_OUT, JSON.stringify(statsData, null, 2) + '\n');
    console.log(
      `Wrote stats to ${STATS_OUT.pathname.split('/').slice(-1)} (followers: ${user.followers}, contributions: ${contributions})`,
    );
  }
} catch (err) {
  console.warn(`  err fetching user stats: ${err.message}`);
}