import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

/**
 * Metadata builder.
 *
 * Every page's metadata is produced here rather than hand-written, so a page
 * cannot ship without a canonical URL, an Open Graph image or a description.
 * Length limits match docs/SEO_PLAN.md §2.
 */

export interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/solutions". Use "/" for the homepage. */
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  /** Set for placeholder content and anything carrying an unresolved marker. */
  noindex?: boolean;
}

/**
 * No default image constant.
 *
 * When `ogImage` is omitted, the `images` key is left off entirely so Next's
 * `opengraph-image` file convention supplies the generated default. Naming a
 * static path here previously produced a 404 for every social crawler.
 */

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalised === '/' ? '' : normalised}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  noindex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  // The homepage title stands alone; every other page is suffixed.
  const fullTitle =
    path === '/' ? title : `${title} | ${siteConfig.displayName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.displayName,
      locale: siteConfig.locale,
      type,
      // Omitted unless overridden, so the generated opengraph-image applies.
      ...(ogImage !== undefined
        ? {
            images: [
              { url: ogImage, width: 1200, height: 630, alt: fullTitle },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(ogImage !== undefined ? { images: [ogImage] } : {}),
    },
  };
}

/** Root metadata, extended by every page. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.displayName} — Professional AV, Digital Signage and Meeting Room Solutions`,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.positioning,
  applicationName: siteConfig.displayName,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};
