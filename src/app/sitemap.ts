import type { MetadataRoute } from 'next';

import { site } from '@/content/site';
import { solutions } from '@/content/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/solutions', '/products', '/about', '/contact'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
