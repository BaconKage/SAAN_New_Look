import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { SolutionCard } from '@/components/cards/solution-card';
import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PlaceholderImage } from '@/components/media/placeholder-image';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

/**
 * Solution detail page.
 *
 * Phase 2 renders the outcome, capabilities and delivery process from the
 * summary content that already exists, so every link in the navigation and the
 * sitemap resolves. Phase 5 extends this template to the full twelve blocks in
 * docs/INFORMATION_ARCHITECTURE.md §4.2 — customer challenges, typical
 * applications, the system-architecture diagram, FAQs, related projects and
 * partners — as that content is written.
 */

export async function generateStaticParams() {
  const solutions = await content.getSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await content.getSolution(slug);
  if (solution === null) return {};

  return buildMetadata({
    title: solution.seo.metaTitle,
    description: solution.seo.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [solution, allSolutions, services, stages] = await Promise.all([
    content.getSolution(slug),
    content.getSolutions(),
    content.getServices(),
    content.getProcessStages(),
  ]);

  if (solution === null) notFound();

  const related = allSolutions
    .filter((entry) => entry.slug !== solution.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Solution"
        title={solution.outcome}
        lead={solution.summary}
        trail={[
          { label: 'Solutions', href: '/solutions' },
          { label: solution.title, href: `/solutions/${solution.slug}` },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-h2">What SAAN delivers</h2>
              <ul className="mt-8 space-y-5">
                {solution.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700">
                      <Icon name={solution.icon} size="sm" />
                    </span>
                    <span className="text-body pt-0.5 text-ink-700">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-body mt-10 text-ink-600">
                Every system is specified after a site assessment. We look at
                the room, the way it is used and what you already own before we
                recommend anything — and we will tell you when the simpler
                option is the right one.
              </p>
            </div>

            <div className="lg:col-span-5">
              <PlaceholderImage slot={solution.image} />
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="subtle">
        <Container>
          <SectionHeader
            eyebrow="How we deliver it"
            title="Four stages, on every project"
            lead="Each stage produces something you can review and sign off before the next one starts."
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <li
                key={stage.id}
                className="rounded-lg border border-ink-200 bg-ink-0 p-6"
              >
                <span
                  data-numeric
                  className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                >
                  {stage.number}
                </span>
                <h3 className="text-h4 mt-4 font-semibold">{stage.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <ButtonLink href="/services" variant="secondary">
              All {services.length} delivery services
              <ArrowRight
                width={16}
                height={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Related"
            title="Other solutions we deliver"
            lead="Most projects combine more than one of these. We design them together rather than as separate systems."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <li key={entry.slug} className="contents">
                <SolutionCard solution={entry} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="dark" spacing="md">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-h1 text-balance text-ink-0">
                Planning {solution.title.toLowerCase()}?
              </h2>
              <p className="text-body-lg mt-5 max-w-2xl text-ink-300">
                Tell us about the space and we will come back with the questions
                that matter before anyone talks about products.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ButtonLink href="/plan-your-project" variant="accent" size="lg">
                Plan Your Project
                <ArrowRight
                  width={18}
                  height={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
