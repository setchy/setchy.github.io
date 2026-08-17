export type LibraryType = 'blog' | 'podcast' | 'ebook';

export interface LibraryItem {
  title: string;
  url: string;
  type: LibraryType;
  topic: string;
}

export const TYPE_LABELS: Record<LibraryType, { label: string; icon: string }> = {
  blog: { label: 'Blogs', icon: '📰' },
  podcast: { label: 'Podcasts', icon: '🎧' },
  ebook: { label: 'eBooks', icon: '📚' },
};

export const libraryItems: LibraryItem[] = [
  // Blogs - Architecture
  { title: 'The Architect Elevator', url: 'https://architectelevator.com/', type: 'blog', topic: 'Architecture' },
  { title: 'LeanIX: We love IT Architecture', url: 'https://www.leanix.net/en/blog', type: 'blog', topic: 'Architecture' },
  { title: 'Enterprise Architects', url: 'http://enterprisearchitects.com', type: 'blog', topic: 'Architecture' },
  { title: 'The Open Group', url: 'https://blog.opengroup.org', type: 'blog', topic: 'Architecture' },
  { title: 'AWS Cloud Enterprise Strategy » Posts by Gregor Hohpe', url: 'https://aws.amazon.com/blogs/enterprise-strategy/', type: 'blog', topic: 'Architecture' },
  // Blogs - APIs
  { title: 'GraphQL Foundation', url: 'http://graphql.org', type: 'blog', topic: 'APIs' },
  { title: 'Apollo GraphQL', url: 'https://www.apollographql.com/blog', type: 'blog', topic: 'APIs' },
  { title: 'Apollo GraphQL Stack (Medium)', url: 'https://blog.apollographql.com?source=rss----3804c1b351c9---4', type: 'blog', topic: 'APIs' },
  { title: 'Nordic APIs', url: 'https://nordicapis.com', type: 'blog', topic: 'APIs' },
  { title: 'The Guild', url: 'https://the-guild.dev', type: 'blog', topic: 'APIs' },
  { title: 'The Guild on Medium', url: 'https://medium.com/the-guild?source=rss----4737331fbdc0---4', type: 'blog', topic: 'APIs' },
  { title: 'GraphQL on Medium', url: 'https://medium.com/tag/graphql/latest?source=rss------graphql-5', type: 'blog', topic: 'APIs' },
  { title: 'API Handyman', url: 'https://apihandyman.io/', type: 'blog', topic: 'APIs' },
  { title: 'Hasura GraphQL', url: 'https://hasura.io/', type: 'blog', topic: 'APIs' },
  { title: 'KongHQ', url: 'https://konghq.com', type: 'blog', topic: 'APIs' },
  { title: 'AsyncAPI Initiative', url: 'https://www.asyncapi.com', type: 'blog', topic: 'APIs' },
  { title: 'Jerney.io', url: 'https://www.jerney.io/', type: 'blog', topic: 'APIs' },
  { title: 'GraphQL { me }', url: 'https://graphqlme.com', type: 'blog', topic: 'APIs' },
  { title: 'API Evangelist', url: 'https://apievangelist.com', type: 'blog', topic: 'APIs' },
  { title: 'The GraphQL Guide', url: 'https://blog.graphql.guide?source=rss----119a2b51b20---4', type: 'blog', topic: 'APIs' },
  { title: 'API Stylebook', url: 'http://apistylebook.com/', type: 'blog', topic: 'APIs' },
  { title: 'Matthew Reinbold', url: 'https://matthewreinbold.com/', type: 'blog', topic: 'APIs' },
  { title: 'Prisma Blog', url: 'http://prisma.io', type: 'blog', topic: 'APIs' },
  { title: 'APIs You Won\'t Hate', url: 'https://apisyouwonthate.com', type: 'blog', topic: 'APIs' },
  { title: 'OpenAPI Initiative', url: 'https://www.openapis.org', type: 'blog', topic: 'APIs' },
  // Blogs - Engineering
  { title: 'Whitesource', url: 'https://www.whitesourcesoftware.com', type: 'blog', topic: 'Engineering' },
  // Blogs - Tech Orgs
  { title: 'Airbnb Engineering and Data Science', url: 'https://medium.com/airbnb-engineering?source=rss----53c7c27702d5---4', type: 'blog', topic: 'Tech Orgs' },
  { title: 'Atlassian Developer', url: 'http://blogs.atlassian.com', type: 'blog', topic: 'Tech Orgs' },
  { title: 'DataDog', url: 'https://www.datadoghq.com/blog', type: 'blog', topic: 'Tech Orgs' },
  { title: 'Uber Engineering', url: 'https://eng.uber.com', type: 'blog', topic: 'Tech Orgs' },
  { title: 'LaunchDarkly', url: 'https://launchdarkly.com/blog/', type: 'blog', topic: 'Tech Orgs' },
  { title: 'Thoughtworks', url: 'https://www.thoughtworks.com/en-us/insights/blog', type: 'blog', topic: 'Tech Orgs' },
  { title: 'GitHub', url: 'https://github.blog/', type: 'blog', topic: 'Tech Orgs' },
  // Blogs - Product Management
  { title: 'Age-of-Product.com', url: 'https://age-of-product.com', type: 'blog', topic: 'Product Management' },
  { title: 'Mind the Product', url: 'https://www.mindtheproduct.com', type: 'blog', topic: 'Product Management' },
  { title: 'Product School', url: 'https://productschool.com', type: 'blog', topic: 'Product Management' },
  // Blogs - WoW
  { title: 'Elabor8', url: 'https://elabor8.com.au', type: 'blog', topic: 'WoW' },
  { title: 'Disruptive Thought', url: 'https://disruptivethought.com', type: 'blog', topic: 'WoW' },
  { title: 'Serious Scrum - Medium', url: 'https://medium.com/serious-scrum?source=rss----da549de9a1c2---4', type: 'blog', topic: 'WoW' },
  // Blogs - Thought Leaders
  { title: 'Neil Ford', url: 'http://memeagora.blogspot.com/', type: 'blog', topic: 'Thought Leaders' },
  { title: 'Martin Fowler', url: 'https://martinfowler.com', type: 'blog', topic: 'Thought Leaders' },

  // Podcasts - Product Management
  { title: 'Product School: The Product Podcast', url: 'https://open.spotify.com/show/1XBrhVLsQOIAv3KFBqnzrX', type: 'podcast', topic: 'Product Management' },
  { title: 'Mind the Product: The Product Experience', url: 'https://open.spotify.com/show/7pv0JHF2YGgXm8OGz1JnL0', type: 'podcast', topic: 'Product Management' },
  { title: 'Spotify: A Product Story', url: 'https://open.spotify.com/show/3L9tzrt0CthF6hNkxYIeSB', type: 'podcast', topic: 'Product Management' },
  // Podcasts - GraphQL
  { title: 'GraphQL.FM', url: 'https://open.spotify.com/show/7x6tdXvAgNSjy68wMyxRDE', type: 'podcast', topic: 'GraphQL' },
  { title: 'SpecNews', url: 'https://open.spotify.com/show/69vo1Wrlda6EP3EzIZnzjf', type: 'podcast', topic: 'GraphQL' },
  { title: 'Stellate: GraphQL Radio', url: 'https://open.spotify.com/show/6ufbqhuAvrpQ0YjPKVYw9W', type: 'podcast', topic: 'GraphQL' },
  // Podcasts - APIs
  { title: 'Stoplight: API Intersection', url: 'https://open.spotify.com/show/6Z5NXL8QaPFddd6HhnuB8O', type: 'podcast', topic: 'APIs' },
  { title: 'APIs You Won\'t Hate', url: 'https://open.spotify.com/show/2CX3HcPbl8hBMuve6YgzuU', type: 'podcast', topic: 'APIs' },
  { title: 'APIs over IPAs', url: 'https://open.spotify.com/show/4MIs86SowFKKV7ANcOuiax', type: 'podcast', topic: 'APIs' },
  { title: 'MuleSoft: APIs Unplugged', url: 'https://open.spotify.com/episode/3U8KNVVgfgcVK7gvmhOX5i', type: 'podcast', topic: 'APIs' },
  // Podcasts - Tech Leadership
  { title: 'AWS: Conversations with Leaders', url: 'https://open.spotify.com/show/1Qp5byBTSBeF20RdyWuIgd', type: 'podcast', topic: 'Tech Leadership' },
  { title: 'Tech Lead Journal', url: 'https://open.spotify.com/show/5suS91H6OfqDt14ZsOD4RV', type: 'podcast', topic: 'Tech Leadership' },
  { title: 'The Engineering Leadership Podcast', url: 'https://open.spotify.com/show/1wIytRQ4Ub8McXSP1iDwVX', type: 'podcast', topic: 'Tech Leadership' },
  // Podcasts - Architecture
  { title: 'LeanIX: Unleash IT: A Podcast about Continuous Transformation', url: 'https://open.spotify.com/show/5Q2NK97J6PYyz5zkuraCEJ', type: 'podcast', topic: 'Architecture' },
  // Podcasts - Engineering
  { title: 'Thoughtworks Technology Podcast', url: 'https://open.spotify.com/show/6RBb4pGRgOFTmtCDSfTWvu', type: 'podcast', topic: 'Engineering' },
  { title: 'Thoughtworks: Pragmatism in Practice', url: 'https://open.spotify.com/show/6j62vzYdGb5aoX9tj0XTuu', type: 'podcast', topic: 'Engineering' },
  { title: 'StaffEng', url: 'https://open.spotify.com/show/4GUCKSlaFqQiShJBOP4nEe', type: 'podcast', topic: 'Engineering' },
  { title: 'Code Story', url: 'https://open.spotify.com/show/0f5HGQ2EPd63H83gqAifXp', type: 'podcast', topic: 'Engineering' },
  { title: 'GitHub: The ReadME Project', url: 'https://open.spotify.com/show/660KitvdJDX2vUmioAbwSQ', type: 'podcast', topic: 'Engineering' },
  { title: 'The New Stack Podcast', url: 'https://open.spotify.com/show/2nj1mpDb9jxHxi9vjZvDdk', type: 'podcast', topic: 'Engineering' },
  // Podcasts - Identity
  { title: 'Auth0: Identity, Unlocked', url: 'https://open.spotify.com/show/1Y6XBZcVK45QijvV0o7RVs', type: 'podcast', topic: 'Identity' },
  // Podcasts - Cloud
  { title: 'Corey Quinn: AWS Morning Brief', url: 'https://open.spotify.com/show/3A04JNrNAcZMvn8cvDWpWU', type: 'podcast', topic: 'Cloud' },
  { title: 'Corey Quinn: Screaming in the Cloud', url: 'https://open.spotify.com/show/3fBA9eNkGliCzp3Xuy1GVd', type: 'podcast', topic: 'Cloud' },
  // Podcasts - Other
  { title: 'All-In', url: 'https://open.spotify.com/show/2IqXAVFR4e0Bmyjsdc8QzF', type: 'podcast', topic: 'Other' },

  // eBooks - Architecture
  { title: 'Gregor Hohpe: Cloud Strategy', url: 'https://leanpub.com/cloudstrategy', type: 'ebook', topic: 'Architecture' },
  { title: 'Gregor Hohpe: 37 Things One Architect Knows About IT Transformation', url: 'https://leanpub.com/37things', type: 'ebook', topic: 'Architecture' },
  { title: 'Gregor Hohpe: Platform Strategy', url: 'https://leanpub.com/platformstrategy', type: 'ebook', topic: 'Architecture' },
  // eBooks - Product Delivery
  { title: 'BaseCamp: Stop Running in Circles and Ship Work that Matters by Ryan Singer', url: 'https://basecamp.com/shapeup/shape-up.pdf', type: 'ebook', topic: 'Product Delivery' },
  { title: 'DevBridge: The Secret Source Book by Aurimas Adomavicius', url: 'https://sourceryacademy.com/secret-source/', type: 'ebook', topic: 'Product Delivery' },
  // eBooks - API
  { title: 'Apollo: Graph Champions Guide', url: 'https://www.apollographql.com/graph-champions/', type: 'ebook', topic: 'API' },
  { title: 'Apollo: Discover your path to a supergraph', url: 'https://www.apollographql.com/ebook/discover-your-path-to-a-supergraph', type: 'ebook', topic: 'API' },
  { title: 'Apollo: Make the switch from REST to Graph', url: 'https://www.apollographql.com/ebook/make-the-switch-from-rest-to-graphql', type: 'ebook', topic: 'API' },
];
