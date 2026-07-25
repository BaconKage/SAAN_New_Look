import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

/**
 * robots.txt
 *
 * Non-production environments emit `Disallow: /`. This is the first of three
 * independent guards against a staging deployment being indexed (the others
 * are the `X-Robots-Tag` header in next.config.ts and platform-level
 * deployment protection). An indexed staging site creates duplicate content
 * against the live site and can cost a launch.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
