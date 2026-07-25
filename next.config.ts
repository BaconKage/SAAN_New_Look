import type { NextConfig } from 'next';

import { redirects } from './src/lib/redirects';

/**
 * Security headers applied to every response.
 *
 * CSP is intentionally omitted here in Phase 2: it is added in Phase 8 once the
 * full set of embedded resources is known, and it starts in report-only mode so
 * a mistake cannot take the site down.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

/**
 * Non-production deployments must never be indexed. This header is a second
 * guard alongside `robots.ts`, because an indexed staging site creates
 * duplicate content against the live site.
 */
const noindexHeader = {
  key: 'X-Robots-Tag',
  value: 'noindex, nofollow',
};

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Canonical URLs never carry a trailing slash. Legacy trailing-slash URLs are
  // normalised by a redirect rule — see src/lib/redirects.ts.
  trailingSlash: false,

  /**
   * `typedRoutes` is deliberately off.
   *
   * It only resolves after `next build` has generated `.next/types`, which
   * makes `npm run typecheck` order-dependent in CI. Internal link validity is
   * instead guaranteed by src/tests/unit/routes.test.ts, which checks every
   * navigation href against the actual `page.tsx` files on disk — the same
   * guarantee, with no build prerequisite.
   */
  typedRoutes: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProduction
          ? securityHeaders
          : [...securityHeaders, noindexHeader],
      },
    ];
  },

  async redirects() {
    return redirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
