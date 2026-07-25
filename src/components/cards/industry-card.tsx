import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Icon } from '@/components/ui/icon';
import type { IndustrySummary } from '@/content/schemas';

/** See the note on `SolutionCard` — the level depends on the page it sits in. */
export function IndustryCard({
  industry,
  headingLevel: Heading = 'h3',
}: {
  industry: IndustrySummary;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-ink-200 bg-ink-0 p-6 transition-[border-color,box-shadow] duration-[220ms] hover:border-ink-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-10 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700 transition-colors duration-[220ms] group-hover:border-amber-300 group-hover:bg-amber-50">
          <Icon name={industry.icon} size="md" />
        </span>
        <ArrowUpRight
          width={17}
          height={17}
          strokeWidth={2}
          className="mt-1 text-ink-300 transition-[transform,color] duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-900"
          aria-hidden="true"
        />
      </div>

      <Heading className="text-h4 mt-5 font-semibold">
        <Link
          href={`/industries/${industry.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {industry.title}
        </Link>
      </Heading>

      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
        {industry.outcome}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-ink-100 pt-4">
        {industry.environments.slice(0, 3).map((environment) => (
          <li
            key={environment}
            className="rounded-full bg-ink-50 px-2.5 py-1 text-[0.75rem] text-ink-500"
          >
            {environment}
          </li>
        ))}
      </ul>
    </article>
  );
}
