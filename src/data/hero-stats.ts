import { githubCache } from './github-cache';
import { projects } from './projects';
import { industryItems } from './industry';
import { travelStats } from './travel';

export interface HeroStats {
  stars: number;
  projects: number;
  talks: number;
  countries: number;
}

/**
 * Aggregate stats for the homepage hero, derived at build time from the
 * typed data files (github-cache.json, projects.ts, industry.ts, travel.json).
 * `projects` count mirrors the OSS page "All" total (`cards.length`).
 */
export const heroStats: HeroStats = {
  stars: Object.values(githubCache).reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0),
  projects: projects.length,
  talks: industryItems.length,
  countries: travelStats.countries,
};