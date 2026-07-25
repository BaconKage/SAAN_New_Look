import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/config/site';
import { rootMetadata } from '@/lib/metadata';

import '@/styles/globals.css';

/**
 * One superfamily across three registers — display, text and mono.
 *
 * `next/font` self-hosts both files and generates a size-adjusted fallback, so
 * there is no third-party request on the critical path and no layout shift when
 * the webfont swaps in.
 */
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  // Mono is used only for eyebrows and technical labels, never in the LCP
  // element, so it is not worth a preload slot.
  preload: false,
});

export const metadata = rootMetadata;

export const viewport = {
  themeColor: '#1a1917',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink />
        <SiteHeader />

        {/* Single `main` landmark. `tabIndex={-1}` makes it a valid target for
            the skip link in every browser. */}
        {/* `min-w-0` is defensive: it stops a flex item taking its automatic
            minimum size from an intrinsically wide descendant. The 320px
            horizontal-scroll test in navigation.spec.ts is the real guard. */}
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 outline-none"
        >
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
