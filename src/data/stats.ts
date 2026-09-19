import statsJson from './stats.json';

export interface GithubStats {
  followers: number;
}

export interface WakatimeStats {
  hours: number;
}

export interface Stats {
  github: GithubStats;
  wakatime: WakatimeStats;
}

export const stats: Stats = statsJson;
