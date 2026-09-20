// Curated section-heading icons for Library / Industry / OSS group headers
// and About page sections / skill categories.
// Keys are the exact topic/category strings used in the section headings.
// All icons must exist in src/styles/icons.css (generated FA mask set).
export const sectionIcons: Record<string, string> = {
  // OSS categories
  'API Frameworks': 'fa-solid fa-network-wired',
  'DevSecOps Tooling': 'fa-solid fa-shield-halved',
  'Dining': 'fa-solid fa-utensils',
  'Methodologies': 'fa-solid fa-book',
  'Productivity Tooling': 'fa-solid fa-keyboard',
  'Technology Radars': 'fa-solid fa-satellite-dish',
  'Travel': 'fa-solid fa-plane',
  // Industry topics
  'GraphQL': 'fa-solid fa-bolt',
  'LaunchDarkly': 'fa-solid fa-chart-line',
  'OWASP Dependency Track': 'fa-solid fa-shield-halved',
  // Library topics
  'API': 'fa-solid fa-network-wired',
  'APIs': 'fa-solid fa-network-wired',
  'Architecture': 'fa-solid fa-landmark',
  'Cloud': 'fa-solid fa-city',
  'Engineering': 'fa-solid fa-bolt',
  'Identity': 'fa-solid fa-lock',
  'Other': 'fa-solid fa-compass',
  'Product Delivery': 'fa-solid fa-plane',
  'Product Management': 'fa-solid fa-chart-line',
  'Tech Leadership': 'fa-solid fa-compass',
  'Tech Orgs': 'fa-solid fa-city',
  'Thought Leaders': 'fa-solid fa-lightbulb',
  'WoW': 'fa-solid fa-handshake',
  // About sections
  'Advisory & interests': 'fa-solid fa-compass',
  'Career history': 'fa-solid fa-briefcase',
  'Skills': 'fa-solid fa-gauge-high',
  // Skills categories (About page)
  'Languages': 'fa-solid fa-code',
  'Frameworks & Libraries': 'fa-solid fa-layer-group',
  'State & Data': 'fa-solid fa-database',
  'Backend': 'fa-solid fa-server',
  'APIs & Integrations': 'fa-solid fa-network-wired',
  'Package Management': 'fa-solid fa-box',
  'Build & Quality': 'fa-solid fa-hammer',
  'DevOps': 'fa-solid fa-gears',
  'Tools': 'fa-solid fa-wrench',
};

export const sectionIconFallback = 'fa-solid fa-map';