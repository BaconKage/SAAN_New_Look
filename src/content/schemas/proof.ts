import { z } from 'zod';

import {
  imageSchema,
  publicationStatusSchema,
  seoSchema,
  slugSchema,
} from './common';

/**
 * Projects, partners and resources — the pages that provide evidence.
 *
 * Two integrity rules are encoded here rather than left to editorial
 * discipline, because both were violated by the previous website:
 *
 *  1. A customer is named ONLY when written permission has been granted.
 *     Otherwise an accurate anonymous label is used.
 *  2. A partner is published ONLY when the relationship has been verified,
 *     and a discontinued product is hidden automatically.
 */

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

export const permissionStatusSchema = z.enum([
  'granted',
  'pending',
  'declined',
  'not-requested',
]);

export const projectCustomerSchema = z
  .object({
    /** Real customer name. Published only when permission is `granted`. */
    name: z.string().min(1).nullable(),
    /**
     * Truthful descriptor used when the name may not be published,
     * e.g. "Leading university in Karnataka".
     */
    anonymousLabel: z.string().min(1).nullable(),
    permissionStatus: permissionStatusSchema,
  })
  .refine(
    (customer) =>
      customer.anonymousLabel !== null ||
      (customer.name !== null && customer.permissionStatus === 'granted'),
    {
      message:
        'A project must have either an anonymous label or a named customer with granted permission.',
    }
  );

export const projectSummarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  customer: projectCustomerSchema,
  /** Industry slug. */
  industry: slugSchema,
  /** Solution slugs delivered. Drives the related-projects rails. */
  solutions: z.array(slugSchema).min(1),
  location: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  roomTypes: z.array(z.string().min(1)).min(1),
  /** One-line description of what was delivered. */
  summary: z.string().min(1),
  image: imageSchema,
  seo: seoSchema,
  status: publicationStatusSchema,
});

export const testimonialSchema = z.object({
  quote: z.string().min(1),
  attribution: z.string().min(1),
  role: z.string().min(1).nullable(),
  organisation: z.string().min(1).nullable(),
  permissionStatus: permissionStatusSchema,
});

/* -------------------------------------------------------------------------- */
/*                                  Partners                                  */
/* -------------------------------------------------------------------------- */

export const lifecycleStatusSchema = z.enum([
  'current',
  'end-of-sale',
  'discontinued',
]);

export const verificationStatusSchema = z.enum([
  'unverified',
  'pending',
  'verified',
  'lapsed',
]);

export const partnerProductSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  lifecycleStatus: lifecycleStatusSchema,
  /** ISO date of the last lifecycle check. */
  lastReviewed: z.string().min(1),
});

export const partnerSchema = z.object({
  slug: slugSchema,
  name: z.string().min(1),
  logo: imageSchema.nullable(),
  logoInverse: imageSchema.nullable(),
  relationshipStatus: z.enum([
    'authorised',
    'reseller',
    'technology',
    'historical',
  ]),
  solutionCategories: z.array(slugSchema),
  /** SAAN's own words. Never manufacturer marketing copy. */
  description: z.string().min(1),
  officialWebsite: z.url().nullable(),
  approvedProducts: z.array(partnerProductSchema),
  /** ISO date. A review older than 12 months raises a build warning. */
  lastLifecycleReview: z.string().min(1),
  verificationStatus: verificationStatusSchema,
  verifiedOn: z.string().nullable(),
});

/* -------------------------------------------------------------------------- */
/*                                  Resources                                 */
/* -------------------------------------------------------------------------- */

export const resourceSummarySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  type: z.enum(['guide', 'comparison', 'explainer', 'checklist', 'brochure']),
  summary: z.string().min(1),
  relatedSolutions: z.array(slugSchema),
  readingMinutes: z.number().int().positive(),
  /**
   * Evergreen content carries a review date, not a publication date.
   * A visible 2020 date is exactly what made the previous site look abandoned.
   */
  reviewedOn: z.string().min(1),
  seo: seoSchema,
  status: publicationStatusSchema,
});

/* -------------------------------------------------------------------------- */

export type ProjectCustomer = z.infer<typeof projectCustomerSchema>;
export type ProjectSummary = z.infer<typeof projectSummarySchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Partner = z.infer<typeof partnerSchema>;
export type PartnerProduct = z.infer<typeof partnerProductSchema>;
export type ResourceSummary = z.infer<typeof resourceSummarySchema>;

/**
 * The label that may legally be shown for a project's customer.
 * Falls back to the anonymous label whenever permission is not granted.
 */
export function displayCustomer(customer: ProjectCustomer): string {
  if (customer.permissionStatus === 'granted' && customer.name !== null) {
    return customer.name;
  }
  return customer.anonymousLabel ?? 'Customer name withheld';
}

/** A partner may appear anywhere on the site only when verified. */
export function isPublishablePartner(partner: Partner): boolean {
  return partner.verificationStatus === 'verified';
}

/** Discontinued products are hidden automatically. */
export function currentProducts(partner: Partner): PartnerProduct[] {
  return partner.approvedProducts.filter(
    (product) => product.lifecycleStatus !== 'discontinued'
  );
}
