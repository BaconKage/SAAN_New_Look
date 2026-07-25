/**
 * Navigation structure.
 *
 * Defined once and consumed by the desktop nav, the mobile drawer, the footer
 * and the sitemap, so the four can never disagree.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export interface NavSection {
  readonly label: string;
  readonly href: string;
  /**
   * When present, the item opens a panel listing its children.
   * Children are loaded from the content source at render time, so the panel
   * never drifts from the pages that actually exist.
   */
  readonly panel?: 'solutions' | 'industries' | 'services';
}

export const primaryNavigation: readonly NavSection[] = [
  { label: 'Solutions', href: '/solutions', panel: 'solutions' },
  { label: 'Industries', href: '/industries', panel: 'industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services', panel: 'services' },
  { label: 'Partners', href: '/partners' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const primaryCta = {
  label: 'Plan Your Project',
  href: '/plan-your-project',
} as const;

export const secondaryCta = {
  label: 'Explore Our Solutions',
  href: '/solutions',
} as const;

export const footerNavigation = {
  company: [
    { label: 'About SAAN', href: '/about' },
    { label: 'Recognition', href: '/recognition' },
    { label: 'Projects', href: '/projects' },
    { label: 'Partners', href: '/partners' },
    { label: 'Resources', href: '/resources' },
  ],
  support: [
    { label: 'Request support', href: '/support' },
    { label: 'Plan your project', href: '/plan-your-project' },
    { label: 'Contact us', href: '/contact' },
  ],
  legal: [{ label: 'Privacy policy', href: '/privacy' }],
} as const satisfies Record<string, readonly NavItem[]>;
