import { z } from 'zod';

/**
 * Shared primitives for every content model.
 *
 * These schemas are the contract between the local content source and the CMS
 * that replaces it later. Both implementations satisfy the same schema, so
 * validation cannot diverge between them and a record that would break a page
 * cannot be published from either side.
 */

/** URL-safe slug. Collisions are checked at build time. */
export const slugSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug must be lowercase, hyphen-separated, with no leading or trailing hyphen.'
  );

/**
 * Icon key resolved against the registry in `@/components/ui/icon`.
 * Data never carries React components.
 */
export const iconKeySchema = z.string().min(1);

/**
 * SEO fields. Length limits match docs/SEO_PLAN.md §2 and are enforced by the
 * build so a page cannot ship with a truncated or missing title.
 */
export const seoSchema = z.object({
  metaTitle: z
    .string()
    .min(10)
    .max(60, 'Meta title must be 60 characters or fewer.'),
  metaDescription: z
    .string()
    .min(120, 'Meta description must be at least 120 characters.')
    .max(155, 'Meta description must be 155 characters or fewer.'),
});

/** An image slot. `src` is null until SAAN supplies the photograph. */
export const imageSchema = z.object({
  /** Slot identifier from docs/IMAGE_REQUIREMENTS.md, e.g. "SOL-digital-signage-hero". */
  id: z.string().min(1),
  src: z.string().nullable(),
  /** Meaningful when informative; empty string when purely decorative. */
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const ctaSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
  buttonLabel: z.string().min(1),
  href: z.string().min(1),
});

/** A titled point — used for challenges, capabilities, benefits and outcomes. */
export const pointSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

/**
 * Publication state.
 *
 * `placeholder` records are rendered visibly as provisional, excluded from the
 * sitemap and marked noindex. They are never dressed as real content.
 */
export const publicationStatusSchema = z.enum([
  'draft',
  'placeholder',
  'published',
]);

export type Slug = z.infer<typeof slugSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type ImageSlot = z.infer<typeof imageSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Cta = z.infer<typeof ctaSchema>;
export type Point = z.infer<typeof pointSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type PublicationStatus = z.infer<typeof publicationStatusSchema>;
