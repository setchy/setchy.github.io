import githubCacheJson from './github-cache.json';

export interface GithubRepoMeta {
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  license: string | null;
  archived: boolean;
  /** ISO timestamp of the oldest commit on the default branch (null for org aggregates) */
  first_commit_at: string | null;
}

export type GithubCache = Record<string, GithubRepoMeta>;

export const githubCache: GithubCache = githubCacheJson;
