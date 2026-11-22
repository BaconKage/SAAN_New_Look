/**
 * Company facts. Single source of truth for every contact detail on the site.
 *
 * Only public-facing details live here. Pricing, quotations, margins, bank
 * details and customer commercials from the internal knowledge base are
 * deliberately excluded and must never be added to this site.
 */
export const site = {
  name: 'SAAN',
  legalName: 'SAAN Protocol Experts Private Limited',
  shortLegalName: 'SAAN Protocol Experts Pvt. Ltd.',
  tagline: 'Aligning Technology and Enterprise',
  description:
    'SAAN Protocol Experts designs, supplies, integrates and supports boardrooms, video conferencing, LED video walls, professional audio, digital signage, smart classrooms, and acoustics and interiors for enterprises and institutions across India.',
  founded: 2007,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  phone: {
    display: '+91 93426 59932',
    e164: '+919342659932',
  },
  email: 'varda@saanpro.com',
  address: {
    lines: [
      'No. 215, Shree Hari Complex, 1st Floor',
      '6th Block, 2nd Stage, Outer Ring Road',
      'Nagarbhavi, Bengaluru 560072',
      'Karnataka, India',
    ],
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560072',
    country: 'IN',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Shree+Hari+Complex+Outer+Ring+Road+Nagarbhavi+Bengaluru+560072',
    embedUrl:
      'https://www.google.com/maps?q=Shree+Hari+Complex,+Outer+Ring+Road,+Nagarbhavi,+Bengaluru+560072&output=embed',
  },
  director: {
    name: 'Srinivas Perur Varda',
    role: 'Founder & Director',
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.phone.e164.replace(/\D/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${site.phone.e164}`;
export const mailLink = (subject?: string) =>
  subject ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}` : `mailto:${site.email}`;

export const nav = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/** One label for the contact intent, used everywhere. */
export const PRIMARY_CTA = { label: 'Plan your project', href: '/contact' } as const;
