export type ProjectRole = 'created' | 'maintain' | 'contribute';

export interface Project {
  owner: string;
  repo: string;
  role: ProjectRole;
  category: string;
  note?: string;
  /** Override the default https://github.com/{owner}/{repo} link (e.g. org pages) */
  url?: string;
}

export const ROLE_LABELS: Record<ProjectRole, { label: string; icon: string }> = {
  created: { label: 'Created', icon: '💡' },
  maintain: { label: 'Maintain', icon: '👑' },
  contribute: { label: 'Contribute', icon: '🤝' },
};

export const projects: Project[] = [
  // Productivity Tooling
  { owner: 'setchy', repo: 'atlassify', role: 'created', category: 'Productivity Tooling', note: 'Atlassian notifications on your menu bar. Available on macOS, Windows & Linux.' },
  { owner: 'gitify-app', repo: 'gitify', role: 'maintain', category: 'Productivity Tooling', note: 'GitHub notifications on your menu bar. Available on macOS, Windows & Linux.' },
  // DevSecOps Tooling
  { owner: 'renovatebot', repo: 'renovate', role: 'contribute', category: 'DevSecOps Tooling', note: 'Automated dependency updates. Multi-platform and multi-language.' },
  { owner: 'CycloneDX', repo: 'cdxgen', role: 'maintain', category: 'DevSecOps Tooling', note: 'Creates CycloneDX Bill of Materials (BOM) for your projects from source and container images.' },
  { owner: 'DependencyTrack', repo: 'frontend', role: 'contribute', category: 'DevSecOps Tooling', note: 'Frontend UI for Dependency-Track.' },
  { owner: 'DependencyTrack', repo: 'dependency-track', role: 'contribute', category: 'DevSecOps Tooling', note: 'Dependency-Track is an intelligent Component Analysis platform that allows organizations to identify and reduce risk in the software supply chain.' },
  // Technology Radars
  { owner: 'setchy', repo: 'thoughtworks-tech-radar-volumes', role: 'created', category: 'Technology Radars', note: 'CLI and complete collection of Thoughtworks Technology Radar datasets (JSON, CSV and Google Sheets).' },
  { owner: 'thoughtworks', repo: 'build-your-own-radar', role: 'contribute', category: 'Technology Radars', note: 'A library that generates an interactive radar, inspired by thoughtworks.com/radar.' },
  // API Frameworks
  { owner: 'Netflix', repo: 'dgs-framework', role: 'contribute', category: 'API Frameworks', note: 'GraphQL for Java with Spring Boot made easy.' },
  { owner: 'setchy', repo: 'dgs-extended-formatters', role: 'created', category: 'API Frameworks', note: 'A set of DGS Directives for common formatting use-cases.' },
  { owner: 'graphql-java', repo: 'graphql-java-extended-scalars', role: 'contribute', category: 'API Frameworks', note: 'A library of extended scalars for graphql-java.' },
  { owner: 'graphql-java', repo: 'graphql-java-extended-validation', role: 'contribute', category: 'API Frameworks', note: 'Validation library for graphql-java input.' },
  { owner: 'chentsulin', repo: 'awesome-graphql', role: 'maintain', category: 'API Frameworks', note: 'Awesome list of GraphQL.' },
  { owner: 'tailrocks', repo: 'graphql-java-datetime', role: 'contribute', category: 'API Frameworks', note: 'GraphQL ISO Date is a set of RFC 3339 compliant date/time scalar types to be used with graphql-java.' },
  { owner: 'graphql-java-kickstart', repo: '', role: 'maintain', category: 'API Frameworks', note: 'GraphQL and GraphiQL Spring Framework Boot Starters.', url: 'https://github.com/graphql-java-kickstart' },
  // Methodologies
  { owner: 'setchy', repo: 'meme-driven.dev', role: 'created', category: 'Methodologies', note: 'Meme Driven Development (MDD) - A novel (and fun) approach to modern software development.' },
  // Travel
  { owner: 'setchy', repo: 'guidealong-maps', role: 'created', category: 'Travel', note: 'Global GuideAlong tour visualization.' },
];
