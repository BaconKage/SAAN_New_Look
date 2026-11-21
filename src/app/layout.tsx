import type { Metadata, Viewport } from 'next';
import { Archivo, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Preloader } from '@/components/layout/preloader';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { site } from '@/content/site';

import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'SAAN Protocol Experts | Enterprise AV, Video Conferencing & LED Walls, Bengaluru',
    template: '%s | SAAN Protocol Experts',
  },
  description: site.description,
  applicationName: 'SAAN Protocol Experts',
  keywords: [
    'AV integrator Bengaluru',
    'video conferencing solutions',
    'boardroom AV',
    'LED video wall',
    'digital signage',
    'smart classroom',
    'professional audio',
    'Microsoft Teams Rooms',
    'AMC AV support',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SAAN Protocol Experts',
    title: 'SAAN Protocol Experts | Spaces that connect',
    description: site.description,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'SAAN Protocol Experts' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: process.env.NEXT_PUBLIC_SITE_ENV === 'production' ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#08090b',
  colorScheme: 'dark',
};

/* Runs before paint: marks JS as available and skips the loader under reduced motion. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('skip-loader')}catch(e){}})();`;

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.legalName,
  alternateName: 'SAAN',
  url: site.url,
  telephone: site.phone.e164,
  email: site.email,
  foundingDate: String(site.founded),
  slogan: site.tagline,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 215, Shree Hari Complex, 1st Floor, 6th Block, 2nd Stage, Outer Ring Road, Nagarbhavi',
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: 'IN',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body id="top">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-full bg-signal-500 px-5 py-3 font-medium text-ink-950 transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
