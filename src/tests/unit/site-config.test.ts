import { describe, expect, it } from 'vitest';

import {
  formatAddressOneLine,
  formatPhoneForDisplay,
  siteConfig,
  telHref,
  whatsappHref,
} from '@/config/site';
import {
  hasValue,
  isContentRequired,
  resolveValue,
} from '@/lib/content-required';

describe('site configuration', () => {
  it('uses the correct legal and display names', () => {
    expect(siteConfig.legalName).toBe('Saan Protocol Experts Private Limited');
    expect(siteConfig.displayName).toBe('SAAN');
  });

  it('has a canonical URL with no trailing slash', () => {
    expect(siteConfig.url.endsWith('/')).toBe(false);
  });

  it('uses Indian English as the document language', () => {
    expect(siteConfig.language).toBe('en-IN');
    expect(siteConfig.locale).toBe('en_IN');
  });

  it('makes no unverifiable claim in the positioning statement', () => {
    const lower = siteConfig.positioning.toLowerCase();
    for (const phrase of ['number one', 'leading', 'best', 'largest']) {
      expect(lower.includes(phrase)).toBe(false);
    }
  });
});

describe('contact details', () => {
  it('has the client-confirmed sales number', () => {
    const sales = siteConfig.contact.salesPhone;
    expect(hasValue(sales)).toBe(true);
    expect(sales.verified).toBe(true);
    expect(sales.value).toBe('+919342659932');
  });

  it('uses the same number for WhatsApp', () => {
    expect(siteConfig.contact.whatsapp.value).toBe(
      siteConfig.contact.salesPhone.value
    );
  });

  it('marks numbers carried across from the old website as unverified', () => {
    expect(siteConfig.contact.mainPhone.verified).toBe(false);
    expect(siteConfig.contact.supportPhone.verified).toBe(false);
  });

  it('has no invented email addresses', () => {
    // The current website publishes no email address at all. Inventing one
    // would send enquiries into a void.
    expect(hasValue(siteConfig.contact.salesEmail)).toBe(false);
    expect(hasValue(siteConfig.contact.supportEmail)).toBe(false);
    expect(isContentRequired(resolveValue(siteConfig.contact.salesEmail))).toBe(
      true
    );
  });

  it('has no invented social profiles', () => {
    for (const profile of Object.values(siteConfig.social)) {
      expect(hasValue(profile)).toBe(false);
    }
  });

  it('has no invented registration numbers or business hours', () => {
    expect(hasValue(siteConfig.registration.cin)).toBe(false);
    expect(hasValue(siteConfig.registration.gstin)).toBe(false);
    expect(hasValue(siteConfig.businessHours)).toBe(false);
  });

  it('stores every phone number in E.164 form', () => {
    const numbers = [
      siteConfig.contact.mainPhone,
      siteConfig.contact.salesPhone,
      siteConfig.contact.supportPhone,
      siteConfig.contact.whatsapp,
    ];
    for (const number of numbers) {
      if (!hasValue(number)) continue;
      expect(number.value).toMatch(/^\+91\d{10}$/);
    }
  });
});

describe('formatting helpers', () => {
  it('formats a mobile number for display', () => {
    expect(formatPhoneForDisplay('+919342659932')).toBe('+91 93426 59932');
  });

  it('formats a Bengaluru landline for display', () => {
    expect(formatPhoneForDisplay('+918023182011')).toBe('+91 80 2318 2011');
  });

  it('returns an unrecognised number unchanged rather than mangling it', () => {
    expect(formatPhoneForDisplay('+1555000111')).toBe('+1555000111');
  });

  it('builds a tel href', () => {
    expect(telHref('+919342659932')).toBe('tel:+919342659932');
  });

  it('builds a WhatsApp link without the plus sign', () => {
    expect(whatsappHref('+919342659932')).toBe('https://wa.me/919342659932');
  });

  it('encodes a pre-filled WhatsApp message', () => {
    expect(whatsappHref('+919342659932', 'Hello SAAN')).toBe(
      'https://wa.me/919342659932?text=Hello%20SAAN'
    );
  });

  it('formats the postal address on one line', () => {
    const line = formatAddressOneLine(siteConfig.address);
    expect(line).toContain('Bengaluru 560072');
    expect(line).toContain('Karnataka');
  });
});
