import type { NextConfig } from 'next';

/**
 * Legacy WordPress URLs from saanpro.com, mapped onto the new site so existing
 * links and search rankings carry over when the domain is switched.
 */
const SOL = '/solutions';
const legacyRedirects: Array<[string, string]> = [
  ['/about-us', '/about'],
  ['/contact-us', '/contact'],
  ['/awards', '/about#recognition'],
  ['/audio-systems', `${SOL}/professional-audio`],
  ['/av-accessories', '/products'],
  ['/av-mounting-kits', '/products'],
  ['/displays', '/products'],
  ['/projector', '/products'],
  ['/screen', '/products'],
  ['/video-conferences', `${SOL}/video-conferencing`],
  ['/vc-solutions', `${SOL}/video-conferencing`],
  ['/cloud-vc', `${SOL}/video-conferencing`],
  ['/meeting-room-devices', `${SOL}/video-conferencing`],
  ['/wps', `${SOL}/video-conferencing`],
  ['/clearone', `${SOL}/video-conferencing`],
  ['/poly', `${SOL}/video-conferencing`],
  ['/zoom', `${SOL}/video-conferencing`],
  ['/lifesize', `${SOL}/video-conferencing`],
  ['/boardroom', `${SOL}/boardrooms`],
  ['/automation', `${SOL}/control-automation`],
  ['/digital-signage', `${SOL}/digital-signage`],
  ['/video-wall-solutions', `${SOL}/led-video-walls`],
  ['/hello-world', '/'],
  ['/category/uncategorized', '/'],
  ['/wp-sitemap.xml', '/sitemap.xml'],
];

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 768, 1080, 1440, 1920, 2560],
    imageSizes: [96, 160, 256, 384, 640],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProduction
          ? securityHeaders
          : [...securityHeaders, { key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
