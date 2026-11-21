import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
