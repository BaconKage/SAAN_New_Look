import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import type { SolutionSummary } from '@/content/schemas';

/**
 * Solution card.
 *
 * The whole card is one link, so the touch target is the full area rather than
 * a small "read more". Hover raises a keyline and the arrow shifts — a state
 * change with a purpose, not decoration.
 */
/**
 * `headingLevel` exists so the card can sit correctly in two different
 * documents: under an `h2` section heading on the homepage (so the card is an
 * `h3`), and directly under the `h1` on the solutions index (so it is an `h2`).
 * Hard-coding `h3` skips a level on the index page — a real heading-order
 * violation, and one axe only reports under its `best-practice` tag.
 */
export function SolutionCard({
  solution,
  headingLevel: Heading = 'h3',
}: {
  solution: SolutionSummary;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-ink-200 bg-ink-0 p-6 transition-[border-color,box-shadow] duration-[220ms] hover:border-ink-300 hover:shadow-md">
      <span className="grid size-11 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700 transition-colors duration-[220ms] group-hover:border-amber-300 group-hover:bg-amber-50">
        <Icon name={solution.icon} size="lg" />
      </span>

      <Heading className="text-h3 mt-5">
        <Link
          href={`/solutions/${solution.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {solution.title}
        </Link>
      </Heading>

      <p className="mt-2 text-[0.9375rem] font-medium text-amber-700">
        {solution.outcome}
      </p>

      <p className="text-body-sm mt-4 flex-1 text-ink-600">
        {solution.summary}
      </p>

      <ul className="mt-6 space-y-2 border-t border-ink-100 pt-5">
        {solution.highlights.slice(0, 3).map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-500"
          >
            <span
              aria-hidden="true"
              className="mt-[0.65em] h-px w-2.5 shrink-0 bg-amber-500"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink-900">
        Explore this solution
        <ArrowUpRight
          width={15}
          height={15}
          strokeWidth={2}
          className="transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
