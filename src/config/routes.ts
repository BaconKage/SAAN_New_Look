/**
 * Static route registry.
 *
 * Every fixed page on the site, with its sitemap priority. This is the single
 * list consumed by the sitemap and by the internal-link test, which checks each
 * entry against the `page.tsx` files actually on disk — so a link to a page
 * that does not exist fails the build rather than shipping as a 404.
 *
 * Dynamic routes (`/solutions/[slug]` and friends) are derived from the content
 * source instead, and are therefore always in step with published content.
 */

export interface StaticRoute {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency:
    'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Excluded from the sitemap, but still a valid internal link target. */
  readonly excludeFromSitemap?: boolean;
}

export const staticRoutes: readonly StaticRoute[] = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/partners', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/resources', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/recognition', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/support', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/plan-your-project', priority: 0.9, changeFrequency: 'yearly' },
  {
    path: '/privacy',
    priority: 0.2,
    changeFrequency: 'yearly',
    excludeFromSitemap: true,
  },
] as const;

/** Every valid internal link target that is a fixed page. */
export function getStaticPaths(): string[] {
  return staticRoutes.map((route) => route.path);
}
