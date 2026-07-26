/**
 * Strict launch validation.
 *
 * The gate that must pass before a production launch. Unlike
 * `audit:content` — which reports and returns zero so it can run on every
 * build — this fails when information that is genuinely required to launch is
 * still unresolved.
 *
 * The distinction matters: the site is designed to render gracefully with
 * fields missing, so nothing about the page tells you the sales email is
 * absent. This script is what stops that reaching production unnoticed.
 *
 *   npm run validate:launch
 */

import { siteConfig } from '../src/config/site';
import { partners, projects } from '../src/content/data/proof';
import { isPublic, type SiteValue } from '../src/lib/content-required';

interface Requirement {
  label: string;
  ok: boolean;
  detail: string;
}

function required(
  label: string,
  field: SiteValue,
  detail: string
): Requirement {
  return { label, ok: isPublic(field), detail };
}

const { contact, registration } = siteConfig;

/** Must be resolved before the site can go live. */
const blockers: Requirement[] = [
  required(
    'Sales email address',
    contact.salesEmail,
    'No email address is published anywhere. Enquiries depend entirely on the telephone.'
  ),
  required(
    'Support email address',
    contact.supportEmail,
    'Existing customers have no written route to support.'
  ),
  required(
    'Public telephone number',
    contact.salesPhone,
    'At least one confirmed number must be published.'
  ),
  required(
    'WhatsApp number',
    contact.whatsapp,
    'Referenced by the contact and support journeys.'
  ),
  required(
    'Business hours',
    siteConfig.businessHours,
    'Required for LocalBusiness structured data and for visitor expectations.'
  ),
  required(
    'Company CIN',
    registration.cin,
    'Required in the footer of an Indian private limited company website.'
  ),
];

/** Should be resolved, but will not stop a launch. */
const warnings: Requirement[] = [
  required(
    'GSTIN',
    registration.gstin,
    'Expected by institutional and government buyers.'
  ),
  required(
    'LinkedIn company page',
    siteConfig.social.linkedin,
    'The one social profile that matters for a B2B audience.'
  ),
  required(
    'Founding year confirmed',
    siteConfig.foundedYear,
    'Currently carried across from the previous website and unverified.'
  ),
  {
    label: 'At least one published project',
    ok: projects.length > 0,
    detail:
      'The site is credible without one, but project evidence is the strongest asset available.',
  },
  {
    label: 'At least one verified partner',
    ok: partners.length > 0,
    detail: 'Partner pages stay hidden until a relationship is verified.',
  },
];

const failedBlockers = blockers.filter((item) => !item.ok);
const failedWarnings = warnings.filter((item) => !item.ok);

console.log('\nLaunch readiness\n');

for (const item of blockers) {
  console.log(`  ${item.ok ? '✓' : '✗'} ${item.label}`);
  if (!item.ok) console.log(`      ${item.detail}`);
}

if (failedWarnings.length > 0) {
  console.log('\nRecommended before launch\n');
  for (const item of failedWarnings) {
    console.log(`  ! ${item.label}`);
    console.log(`      ${item.detail}`);
  }
}

console.log('');

if (failedBlockers.length > 0) {
  console.error(
    `✗ ${failedBlockers.length} launch blocker(s) unresolved. See docs/CONTENT_TODO.md.\n`
  );
  process.exit(1);
}

console.log('✓ All launch-critical information is resolved.\n');
