'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useId, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import type { ExplorerOption } from '@/content/schemas';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/**
 * Interactive solution explorer.
 *
 * Implemented as a proper ARIA tabs widget rather than a set of styled
 * buttons: arrow keys move between requirements, Home and End jump to the ends,
 * and only the selected tab is in the tab order. That is what a screen-reader
 * or keyboard user expects from a control that swaps a panel of content.
 *
 * All nine panels are server-rendered into the markup and toggled with
 * `hidden`, so the content is in the HTML for crawlers and is available
 * immediately, with no request on selection.
 */
/**
 * Service slug to display label.
 *
 * Held here rather than passed down because the explorer is a client island —
 * this keeps the server/client boundary to a single serialisable prop.
 */
const serviceLabels: Record<string, string> = {
  'consultation-and-requirement-analysis': 'Consultation',
  'site-survey-and-system-design': 'Site survey and system design',
  'supply-and-installation': 'Supply and installation',
  'integration-and-commissioning': 'Integration and commissioning',
  'training-and-handover': 'Training and handover',
  'amc-and-preventive-maintenance': 'AMC and preventive maintenance',
  'technical-support': 'Technical support',
  'upgrades-and-lifecycle-management': 'Upgrades and lifecycle management',
};

export function SolutionExplorer({ options }: { options: ExplorerOption[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const select = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const option = options[index];
      if (option) track({ name: 'solution_selected', slug: option.id });
    },
    [options]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const lastIndex = options.length - 1;
      let next: number | null = null;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          next = index === lastIndex ? 0 : index + 1;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          next = index === 0 ? lastIndex : index - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = lastIndex;
          break;
        default:
          return;
      }

      event.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    },
    [options.length, select]
  );

  return (
    // `grid-cols-1` is explicit, not incidental: an implicit `auto` track sizes
    // to its item's max-content, which lets the horizontal tab strip below
    // widen the whole page instead of scrolling inside itself.
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Requirement list */}
      <div
        role="tablist"
        aria-label="Choose the requirement closest to your project"
        aria-orientation="vertical"
        className="flex min-w-0 snap-x gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {options.map((option, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={option.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${option.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${option.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'flex min-h-[3rem] shrink-0 snap-start items-center gap-3 rounded-md border px-4 py-3 text-left text-[0.9375rem] font-medium transition-colors duration-[160ms] lg:w-full lg:shrink',
                selected
                  ? 'border-amber-500 bg-amber-50 text-ink-900'
                  : 'border-ink-200 bg-ink-0 text-ink-600 hover:border-ink-300 hover:text-ink-900'
              )}
            >
              <Icon
                name={option.icon}
                size="sm"
                className={selected ? 'text-amber-700' : 'text-ink-400'}
              />
              <span className="whitespace-nowrap lg:whitespace-normal">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="lg:col-span-8">
        {options.map((option, index) => (
          <div
            key={option.id}
            role="tabpanel"
            id={`${baseId}-panel-${option.id}`}
            aria-labelledby={`${baseId}-tab-${option.id}`}
            hidden={index !== activeIndex}
            tabIndex={0}
            className="rounded-lg border border-ink-200 bg-ink-25 p-6 focus-visible:outline-2 sm:p-8"
          >
            <p className="text-[1.0625rem] font-medium text-ink-900">
              {option.prompt}
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-eyebrow text-ink-500">
                  What usually goes wrong
                </h3>
                <ul className="mt-4 space-y-3">
                  {option.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-ink-300"
                      />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-eyebrow text-ink-500">
                  What SAAN would evaluate
                </h3>
                <ul className="mt-4 space-y-3">
                  {option.evaluates.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-signal-500/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-ink-200 pt-8">
              <h3 className="text-eyebrow text-ink-500">Where it applies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {option.environments.map((environment) => (
                  <li
                    key={environment}
                    className="rounded-full border border-ink-200 bg-ink-0 px-3 py-1 text-[0.8125rem] text-ink-600"
                  >
                    {environment}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-ink-200 pt-8">
              <h3 className="text-eyebrow text-ink-500">What SAAN does</h3>
              <ul className="mt-4 space-y-4">
                {option.capabilities.map((capability) => (
                  // `items-start`: without it the flex default stretches the
                  // icon and it renders centred against a multi-line item
                  // instead of aligning to the first line.
                  <li key={capability.title} className="flex items-start gap-3">
                    <Check
                      width={17}
                      height={17}
                      strokeWidth={2.25}
                      className="mt-[0.35em] shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink-900">
                        {capability.title}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-600">
                        {capability.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-ink-200 pt-8">
              <h3 className="text-eyebrow text-ink-500">
                Services usually involved
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {option.relatedServices.map((slug) => {
                  const service = serviceLabels[slug];
                  if (service === undefined) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="text-[0.9375rem] text-ink-700 underline decoration-ink-300 underline-offset-4 transition-colors hover:text-amber-700 hover:decoration-amber-500"
                      >
                        {service}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink-200 pt-6">
              <ButtonLink href="/plan-your-project" variant="primary">
                Discuss this requirement
                <ArrowRight
                  width={16}
                  height={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ButtonLink>
              <Link
                href={`/solutions/${option.solutionSlug}`}
                className="text-[0.9375rem] font-medium text-amber-700 underline underline-offset-4 transition-colors hover:text-amber-800"
              >
                Read the full solution
              </Link>
            </div>

            <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-500">
              Every room is different. SAAN studies the space, user workflow,
              platform requirements, acoustics, lighting, network readiness and
              long-term support needs before recommending a final system — so
              this is a starting point for a conversation, not a specification.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
