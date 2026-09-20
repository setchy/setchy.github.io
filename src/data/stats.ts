import statsJson from './stats.json';

export interface GithubStats {
  followers: number;
  /** All-time public GitHub contributions, summed across every tracked year */
  contributions: number;
}

export interface WakatimeStats {
  hours: number;
}

export interface Stats {
  github: GithubStats;
  wakatime: WakatimeStats;
}

export const stats: Stats = statsJson;
