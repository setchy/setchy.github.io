import { stats } from './stats';
import { projects } from './projects';
import { industryItems } from './industry';
import { travelStats } from './travel';

export interface HeroStats {
  contributions: number;
  projects: number;
  talks: number;
  countries: number;
}

/**
 * Aggregate stats for the homepage hero, derived at build time from the
 * typed data files (stats.json, projects.ts, industry.ts, travel.json).
 * `projects` count mirrors the OSS page "All" total (`cards.length`).
 */
export const heroStats: HeroStats = {
  contributions: stats.github.contributions,
  projects: projects.length,
  talks: industryItems.length,
  countries: travelStats.countries,
};