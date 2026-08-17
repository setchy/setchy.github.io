export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'OSS', href: '/open-source' },
  { label: 'Industry', href: '/industry' },
  { label: 'Radars', href: '/radars' },
  { label: 'Library', href: '/library' },
];
