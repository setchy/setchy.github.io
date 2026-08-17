export type IndustryType = 'web' | 'youtube' | 'pdf';

export interface IndustryItem {
  title: string;
  url: string;
  type: IndustryType;
  topic: string;
  date?: string;
}

export const TYPE_LABELS: Record<IndustryType, { label: string; icon: string }> = {
  web: { label: 'Articles', icon: '🌐' },
  youtube: { label: 'Videos', icon: '📺' },
  pdf: { label: 'Slides', icon: '📄' },
};

export const industryItems: IndustryItem[] = [
  // GraphQL
  { title: 'Apollo GraphOS: Power digital transformations', url: 'https://www.apollographql.com/enterprise?wvideo=4fu2lsjssc', type: 'web', topic: 'GraphQL' },
  { title: 'GraphQL Summit 2023: it\'s all about the people', url: 'https://youtu.be/090IWEcHbJc?si=tUn4F0oNSPoliVXs', type: 'youtube', topic: 'GraphQL' },
  { title: 'Apollo GraphQL Summit November 2021 // A Champion\'s Guide to Building Your Unified Graph', url: 'https://www.apollographql.com/events/roundtable/graphql-summit-november-2021/a-champions-guide-to-building-your-unified-graph', type: 'web', topic: 'GraphQL' },
  // LaunchDarkly
  { title: 'World Kinect increases release velocity by 400% (original article)', url: 'https://launchdarkly.com/case-studies/world-kinect/', type: 'web', topic: 'LaunchDarkly', date: 'March, 2024' },
  { title: 'World Kinect increases release velocity by 400% (re-post)', url: 'https://www.world-kinect.com/blog/world-kinects-digital-transformation-launchdarkly-success-story', type: 'web', topic: 'LaunchDarkly', date: 'August, 2024' },
  // OWASP Dependency Track
  { title: 'OWASP Dependency Track Community Meeting - 2024/05/08 (recording)', url: 'https://youtu.be/MS2DlMdUI7Q?si=snb68IN7F1eGBSRW', type: 'youtube', topic: 'OWASP Dependency Track', date: '2024/05/08' },
  { title: 'OWASP Dependency Track Community Meeting - 2024/05/08 (slides)', url: 'https://github.com/DependencyTrack/community/blob/main/community-meetings%2F2024-05-08.pdf', type: 'pdf', topic: 'OWASP Dependency Track', date: '2024/05/08' },
];
