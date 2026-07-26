/**
 * Central site configuration — the single source of truth for every company
 * detail on the website.
 *
 * NOTHING in this file may be duplicated into a component. Phone numbers,
 * addresses, email addresses and the domain are read from here so that a
 * change is made once and is correct everywhere. An ESLint rule
 * (`no-restricted-syntax`) fails the build if a phone number or the domain is
 * written literally anywhere else in `src/`.
 *
 * Values fall into three states:
 *   verified()    — confirmed by SAAN in writing
 *   provisional() — observed on the current public site, needs confirmation
 *   missing()     — not supplied; renders a visible [CONTENT REQUIRED] marker
 *
 * See docs/CONTENT_TODO.md §2 for the outstanding items.
 */

import {
  missing,
  provisional,
  verified,
  type SiteValue,
} from '@/lib/content-required';

const LEGACY_SITE_NOTE =
  'Carried across from the current public website; re-verify before launch.';

export interface SiteAddress {
  readonly line1: string;
  readonly line2: string;
  readonly locality: string;
  readonly region: string;
  readonly postalCode: string;
  readonly country: string;
  readonly countryCode: string;
}

export interface SiteConfig {
  readonly legalName: string;
  readonly displayName: string;
  readonly brandPromise: string;
  readonly positioning: string;
  readonly canonicalDomain: string;
  readonly url: string;
  readonly locale: string;
  readonly language: string;
  readonly foundedYear: SiteValue;
  readonly address: SiteAddress;
  readonly contact: {
    readonly mainPhone: SiteValue;
    readonly salesPhone: SiteValue;
    readonly supportPhone: SiteValue;
    readonly whatsapp: SiteValue;
    readonly salesEmail: SiteValue;
    readonly supportEmail: SiteValue;
  };
  readonly businessHours: SiteValue;
  readonly registration: {
    readonly cin: SiteValue;
    readonly gstin: SiteValue;
  };
  readonly social: {
    readonly linkedin: SiteValue;
    readonly facebook: SiteValue;
    readonly instagram: SiteValue;
    readonly youtube: SiteValue;
    readonly twitter: SiteValue;
  };
}

/**
 * Canonical origin.
 *
 * Falls back to localhost so the application builds and runs with no
 * environment configuration at all — a requirement of the local-first
 * content architecture.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

export const siteConfig: SiteConfig = {
  legalName: 'Saan Protocol Experts Private Limited',
  displayName: 'SAAN',

  brandPromise:
    'The right solution. Professionally delivered. Reliably supported.',

  positioning:
    'SAAN designs, integrates and supports professional AV, digital-signage, meeting-room, display, projection, audio, video-wall and room-control systems for enterprises and institutions.',

  // Canonical host decision is pending (docs/CONTENT_TODO.md 1.2). Recommended:
  // the apex, matching how the current site links internally.
  canonicalDomain: 'saanpro.com',
  url: siteUrl,

  locale: 'en_IN',
  language: 'en-IN',

  foundedYear: provisional(
    '2007',
    'The current About page states December 2007. Confirm before publishing.'
  ),

  address: {
    line1: '#215, "Shree Hari" Complex',
    line2: '6th Block, 2nd Stage, Outer Ring Road, Nagarabhavi',
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560072',
    country: 'India',
    countryCode: 'IN',
  },

  contact: {
    // Retained for the record from the current public website, but NOT
    // published: `isPublic()` requires a verified value, so these two numbers
    // are invisible to visitors until SAAN confirms them. The client has
    // asked that only the number below be shown.
    mainPhone: provisional('+918023182011', LEGACY_SITE_NOTE),
    supportPhone: provisional('+918867138111', LEGACY_SITE_NOTE),

    // The single confirmed public contact — sales, support and WhatsApp.
    salesPhone: verified('+919342659932', 'Main public contact.'),
    whatsapp: verified('+919342659932', 'Same number as the main contact.'),

    // The current website publishes no email address anywhere and has no
    // contact form. Both addresses are genuinely unknown.
    salesEmail: missing('Confirmed sales email'),
    supportEmail: missing('Confirmed support email'),
  },

  businessHours: missing('Confirmed business hours'),

  registration: {
    cin: missing('Company CIN'),
    gstin: missing('Company GSTIN'),
  },

  social: {
    // The current site shows social icons whose destinations could not be
    // verified. No profile is linked until SAAN confirms the URL.
    linkedin: missing('LinkedIn company page URL'),
    facebook: missing('Verified Facebook page URL'),
    instagram: missing('Verified Instagram profile URL'),
    youtube: missing('Verified YouTube channel URL'),
    twitter: missing('Verified X/Twitter profile URL'),
  },
};

/** Formats an E.164 number for display: +918023182011 -> +91 80 2318 2011. */
export function formatPhoneForDisplay(e164: string): string {
  const digits = e164.replace(/\D/g, '');
  if (!digits.startsWith('91') || digits.length !== 12) return e164;

  const national = digits.slice(2);

  // Bengaluru landline: 80 + 8 digits
  if (national.startsWith('80')) {
    return `+91 80 ${national.slice(2, 6)} ${national.slice(6)}`;
  }

  // Mobile: 10 digits, grouped 5 + 5
  return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
}

/** Builds a `tel:` href. */
export function telHref(e164: string): string {
  return `tel:${e164}`;
}

/** Builds a WhatsApp deep link with an optional pre-filled message. */
export function whatsappHref(e164: string, message?: string): string {
  const number = e164.replace(/\D/g, '');
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Single-line postal address. */
export function formatAddressOneLine(address: SiteAddress): string {
  return [
    address.line1,
    address.line2,
    `${address.locality} ${address.postalCode}`,
    address.region,
    address.country,
  ].join(', ');
}
