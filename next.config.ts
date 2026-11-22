import type { NextConfig } from 'next';

import imageSizes from './src/lib/image-sizes.json';

/**
 * The site is a fully static export (`out/`) served by Cloudflare Workers static
 * assets. Legacy WordPress redirects and security headers live in
 * public/_redirects and public/_headers, which Cloudflare reads at the edge.
 *
 * Build environment: Cloudflare's builder sets WORKERS_CI_BRANCH (Workers) or
 * CF_PAGES_BRANCH (Pages). A build of `main` there is production and any other
 * branch is a preview; everywhere else it is development. NEXT_PUBLIC_SITE_ENV
 * and NEXT_PUBLIC_SITE_URL override both. Anything but production is noindex.
 */
const branch = process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH;
const siteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV ||
  (branch ? (branch === 'main' ? 'production' : 'preview') : 'development');
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (siteEnv === 'production'
    ? 'https://saanpro.com'
    : 'http://localhost:3000');

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_SITE_ENV: siteEnv,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: imageSizes.deviceSizes,
    imageSizes: imageSizes.imageSizes,
  },
};

export default nextConfig;
