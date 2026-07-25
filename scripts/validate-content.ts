/**
 * Content validation gate.
 *
 * Parses every content record through its Zod schema and checks cross-record
 * integrity before the build runs, so a malformed record fails fast with a
 * readable message rather than producing a broken page.
 *
 *   npm run validate:content
 */

import { explorerOptions } from '../src/content/data/explorer';
import { industries } from '../src/content/data/industries';
import { partners, projects, resources } from '../src/content/data/proof';
import { processStages, services } from '../src/content/data/services';
import { solutions } from '../src/content/data/solutions';
import {
  explorerOptionSchema,
  industrySummarySchema,
  partnerSchema,
  processStageSchema,
  projectSummarySchema,
  resourceSummarySchema,
  serviceSummarySchema,
  solutionSummarySchema,
} from '../src/content/schemas';

interface Problem {
  collection: string;
  identifier: string;
  message: string;
}

const problems: Problem[] = [];

function validate(
  collection: string,
  records: unknown[],
  schema: {
    safeParse: (value: unknown) => { success: boolean; error?: unknown };
  },
  identify: (record: unknown, index: number) => string
): void {
  records.forEach((record, index) => {
    const result = schema.safeParse(record);
    if (!result.success) {
      problems.push({
        collection,
        identifier: identify(record, index),
        message:
          result.error instanceof Error
            ? result.error.message
            : JSON.stringify(result.error, null, 2),
      });
    }
  });
}

const bySlug = (record: unknown, index: number): string =>
  typeof record === 'object' && record !== null && 'slug' in record
    ? String((record as { slug: unknown }).slug)
    : `index ${index}`;

validate('solutions', solutions, solutionSummarySchema, bySlug);
validate('industries', industries, industrySummarySchema, bySlug);
validate('services', services, serviceSummarySchema, bySlug);
validate(
  'process stages',
  processStages,
  processStageSchema,
  (record, index) =>
    typeof record === 'object' && record !== null && 'id' in record
      ? String((record as { id: unknown }).id)
      : `index ${index}`
);
validate(
  'explorer options',
  explorerOptions,
  explorerOptionSchema,
  (record, index) =>
    typeof record === 'object' && record !== null && 'id' in record
      ? String((record as { id: unknown }).id)
      : `index ${index}`
);
validate('projects', projects, projectSummarySchema, bySlug);
validate('partners', partners, partnerSchema, bySlug);
validate('resources', resources, resourceSummarySchema, bySlug);

// --- Cross-record integrity -------------------------------------------------

const solutionSlugs = new Set(solutions.map((s) => s.slug));
const industrySlugs = new Set(industries.map((i) => i.slug));

for (const option of explorerOptions) {
  if (!solutionSlugs.has(option.solutionSlug)) {
    problems.push({
      collection: 'explorer options',
      identifier: option.id,
      message: `References unknown solution "${option.solutionSlug}".`,
    });
  }
}

for (const project of projects) {
  if (!industrySlugs.has(project.industry)) {
    problems.push({
      collection: 'projects',
      identifier: project.slug,
      message: `References unknown industry "${project.industry}".`,
    });
  }
  for (const slug of project.solutions) {
    if (!solutionSlugs.has(slug)) {
      problems.push({
        collection: 'projects',
        identifier: project.slug,
        message: `References unknown solution "${slug}".`,
      });
    }
  }
}

// A partner whose lifecycle review is over 12 months old is a warning, not a
// failure — it prompts the quarterly review in docs/CONTENT_STRATEGY.md §4.4.
const twelveMonthsAgo = new Date();
twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

const staleParters = partners.filter(
  (partner) => new Date(partner.lastLifecycleReview) < twelveMonthsAgo
);

// --- Report -----------------------------------------------------------------

if (staleParters.length > 0) {
  console.warn('\n⚠ Partners with a lifecycle review older than 12 months:');
  for (const partner of staleParters) {
    console.warn(
      `   ${partner.slug} (last reviewed ${partner.lastLifecycleReview})`
    );
  }
  console.warn('');
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} content validation error(s):\n`);
  for (const problem of problems) {
    console.error(`  [${problem.collection}] ${problem.identifier}`);
    console.error(`    ${problem.message.split('\n').join('\n    ')}\n`);
  }
  process.exit(1);
}

const counts = [
  `${solutions.length} solutions`,
  `${industries.length} industries`,
  `${services.length} services`,
  `${processStages.length} process stages`,
  `${explorerOptions.length} explorer options`,
  `${projects.length} projects`,
  `${partners.length} partners`,
  `${resources.length} resources`,
];

console.log(`✓ Content valid: ${counts.join(', ')}.`);
