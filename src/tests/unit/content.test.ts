import { describe, expect, it } from 'vitest';

import { explorerOptions } from '@/content/data/explorer';
import { industries } from '@/content/data/industries';
import { processStages, services } from '@/content/data/services';
import { solutions } from '@/content/data/solutions';
import {
  explorerOptionSchema,
  industrySummarySchema,
  processStageSchema,
  serviceSummarySchema,
  solutionSummarySchema,
} from '@/content/schemas';
import { content } from '@/content/source';

/**
 * Content validation.
 *
 * Runs the same schemas the CMS will use, so a record that would break a page
 * fails here rather than in production. Also enforces the editorial rules that
 * are objectively checkable — no superlatives, no unverified numbers, correct
 * SEO field lengths.
 */

describe('schema validation', () => {
  it('every solution is valid', () => {
    for (const solution of solutions) {
      expect(() => solutionSummarySchema.parse(solution)).not.toThrow();
    }
  });

  it('every industry is valid', () => {
    for (const industry of industries) {
      expect(() => industrySummarySchema.parse(industry)).not.toThrow();
    }
  });

  it('every service is valid', () => {
    for (const service of services) {
      expect(() => serviceSummarySchema.parse(service)).not.toThrow();
    }
  });

  it('every process stage is valid', () => {
    for (const stage of processStages) {
      expect(() => processStageSchema.parse(stage)).not.toThrow();
    }
  });

  it('every explorer option is valid', () => {
    for (const option of explorerOptions) {
      expect(() => explorerOptionSchema.parse(option)).not.toThrow();
    }
  });
});

describe('collection completeness', () => {
  it('has the eight solution areas from the brief', () => {
    expect(solutions).toHaveLength(8);
  });

  it('has the seven industries from the brief', () => {
    expect(industries).toHaveLength(7);
  });

  it('has the eight services from the brief', () => {
    expect(services).toHaveLength(8);
  });

  it('has exactly four process stages', () => {
    expect(processStages).toHaveLength(4);
    expect(processStages.map((s) => s.id)).toEqual([
      'discover',
      'design',
      'deliver',
      'support',
    ]);
  });

  it('has the nine explorer options from the brief', () => {
    expect(explorerOptions).toHaveLength(9);
  });
});

describe('slug integrity', () => {
  it('solution slugs are unique', () => {
    const slugs = solutions.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('industry slugs are unique', () => {
    const slugs = industries.map((i) => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('service slugs are unique', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every explorer option maps to a real solution', () => {
    const solutionSlugs = new Set(solutions.map((s) => s.slug));
    for (const option of explorerOptions) {
      expect(
        solutionSlugs.has(option.solutionSlug),
        `Explorer option "${option.id}" points at unknown solution "${option.solutionSlug}"`
      ).toBe(true);
    }
  });
});

describe('SEO field discipline', () => {
  const records = [
    ...solutions.map((s) => ({ kind: 'solution', slug: s.slug, seo: s.seo })),
    ...industries.map((i) => ({ kind: 'industry', slug: i.slug, seo: i.seo })),
    ...services.map((s) => ({ kind: 'service', slug: s.slug, seo: s.seo })),
  ];

  it('meta titles are 60 characters or fewer', () => {
    for (const record of records) {
      expect(
        record.seo.metaTitle.length,
        `${record.kind} "${record.slug}" title is ${record.seo.metaTitle.length} characters`
      ).toBeLessThanOrEqual(60);
    }
  });

  it('meta descriptions are between 120 and 155 characters', () => {
    for (const record of records) {
      const length = record.seo.metaDescription.length;
      expect(
        length,
        `${record.kind} "${record.slug}" description is ${length} characters`
      ).toBeGreaterThanOrEqual(120);
      expect(length).toBeLessThanOrEqual(155);
    }
  });

  it('meta titles are unique across the site', () => {
    const titles = records.map((r) => r.seo.metaTitle);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('meta descriptions are unique across the site', () => {
    const descriptions = records.map((r) => r.seo.metaDescription);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});

describe('editorial rules', () => {
  /** Claims the brief prohibits without verified evidence. */
  const prohibited = [
    'number one',
    'no. 1',
    'best in india',
    'market leader',
    'world-class',
    'world class',
    '100% satisfaction',
    'one-stop shop',
    'one stop shop',
    'cutting-edge',
    'state-of-the-art',
    'unparalleled',
    'unmatched',
    'fortune 500',
  ];

  const allCopy = [
    ...solutions.flatMap((s) => [
      s.title,
      s.outcome,
      s.summary,
      ...s.highlights,
      s.seo.metaTitle,
      s.seo.metaDescription,
    ]),
    ...industries.flatMap((i) => [
      i.title,
      i.outcome,
      i.summary,
      ...i.environments,
      i.seo.metaTitle,
      i.seo.metaDescription,
    ]),
    ...services.flatMap((s) => [
      s.title,
      s.outcome,
      s.summary,
      ...s.deliverables,
      s.seo.metaTitle,
      s.seo.metaDescription,
    ]),
    ...explorerOptions.flatMap((o) => [
      o.prompt,
      ...o.challenges,
      ...o.environments,
      ...o.capabilities.flatMap((c) => [c.title, c.description]),
    ]),
    ...processStages.flatMap((p) => [p.title, p.description, ...p.outputs]),
  ];

  it('contains no prohibited superlatives', () => {
    for (const text of allCopy) {
      const lower = text.toLowerCase();
      for (const phrase of prohibited) {
        expect(
          lower.includes(phrase),
          `Prohibited phrase "${phrase}" found in: "${text}"`
        ).toBe(false);
      }
    }
  });

  it('reproduces none of the typos from the previous website', () => {
    // The old site rendered "SoIutions" and "HaIIs" with a capital I in place
    // of a lowercase L, on every page, plus "Aligining" in the logo.
    for (const text of allCopy) {
      expect(text).not.toMatch(/SoIution|HaII|Aligining/);
    }
  });
});

describe('content source', () => {
  it('returns solutions in the declared order', async () => {
    const result = await content.getSolutions();
    const orders = result.map((s) => s.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('resolves a solution by slug', async () => {
    const result = await content.getSolution('digital-signage');
    expect(result?.title).toBe('Digital signage and content management');
  });

  it('returns null for an unknown slug', async () => {
    expect(await content.getSolution('does-not-exist')).toBeNull();
  });

  it('publishes no projects, partners, resources or testimonials yet', async () => {
    // Guards the content-integrity rule: none of these may be invented.
    // These assertions flip to real counts when SAAN supplies the content.
    expect(await content.getProjects()).toHaveLength(0);
    expect(await content.getPartners()).toHaveLength(0);
    expect(await content.getResources()).toHaveLength(0);
    expect(await content.getTestimonials()).toHaveLength(0);
  });
});
