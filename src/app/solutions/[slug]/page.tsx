import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { SystemDiagram } from '@/components/media/system-diagram';
import { PageHeader } from '@/components/sections/page-header';
import { PreparingNote } from '@/components/ui/content-required';
import { ButtonLink } from '@/components/ui/button';
import { Faqs } from '@/components/sections/faqs';
import { Icon } from '@/components/ui/icon';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { content } from '@/content/source';
import { absoluteUrl, buildMetadata } from '@/lib/metadata';

/**
 * Solution detail page.
 *
 * Follows the consultation structure in the Phase 3A brief: outcome, the
 * problems SAAN expects to find, what SAAN evaluates before specifying, what
 * gets delivered, a simplified architecture, typical applications, delivery
 * considerations, lifecycle, FAQs and a distinct call to action.
 *
 * The visual treatment varies by section — split, full-bleed diagram, dark
 * technical band, numbered list — so the information architecture stays
 * consistent while the page does not read as one repeated card grid.
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
  const [solution, detail, allSolutions, industries] = await Promise.all([
    content.getSolution(slug),
    content.getSolutionDetail(slug),
    content.getSolutions(),
    content.getIndustries(),
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
        lead={detail?.intro ?? solution.summary}
        trail={[
          { label: 'Solutions', href: '/solutions' },
          { label: solution.title, href: `/solutions/${solution.slug}` },
        ]}
      />

      {/* ---------------------------------------------- customer problems -- */}
      {detail ? (
        <Section aria-labelledby="challenges-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeader
                  id="challenges-heading"
                  eyebrow="What we usually find"
                  title="The problems that bring people to us"
                />
              </div>

              <ol className="lg:col-span-8">
                {detail.challenges.map((challenge, index) => (
                  <li
                    key={challenge.title}
                    className="grid gap-x-6 gap-y-2 border-t border-ink-200 py-7 last:border-b sm:grid-cols-[3rem_1fr]"
                  >
                    <span
                      data-numeric
                      className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-h4 font-semibold">
                        {challenge.title}
                      </h3>
                      <p className="text-body mt-2 text-ink-600">
                        {challenge.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------- what SAAN evaluates --- */}
      {detail ? (
        <Section surface="dark" aria-labelledby="evaluates-heading">
          <Container>
            <SectionHeader
              id="evaluates-heading"
              eyebrow="Before anything is specified"
              title="What we evaluate"
              lead="Every room is different. SAAN studies the space, the way people work in it, the platforms you use, the acoustics, the lighting, the network readiness and the long-term support needs before recommending a final system."
              tone="inverse"
            />

            <ul className="mt-14 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
              {detail.evaluates.map((item) => (
                <li key={item.title} className="border-t border-ink-0/15 pt-6">
                  <h3 className="text-[1.0625rem] font-medium text-ink-0">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------- what SAAN delivers -- */}
      <Section surface="subtle" aria-labelledby="delivers-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                id="delivers-heading"
                eyebrow="Scope"
                title="What SAAN delivers"
              />
              <ul className="mt-8 space-y-5">
                {solution.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-4">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700">
                      <Icon name={solution.icon} size="sm" />
                    </span>
                    <span className="text-body pt-0.5 text-ink-700">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {detail ? (
              <div className="lg:col-span-7">
                <h3 className="text-eyebrow text-ink-500">
                  Simplified system architecture
                </h3>
                <SystemDiagram
                  className="mt-6"
                  data={detail.architecture}
                  tone="light"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------- typical applications - */}
      {detail ? (
        <Section aria-labelledby="applications-heading">
          <Container>
            <SectionHeader
              id="applications-heading"
              eyebrow="Where it applies"
              title="Typical applications"
            />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
              {detail.applications.map((application) => (
                <li key={application.title} className="bg-ink-0 p-6">
                  <h3 className="text-h4 font-semibold">{application.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    {application.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------- delivery + lifecycle */}
      {detail ? (
        <Section surface="subtle" aria-labelledby="delivery-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeader
                  id="delivery-heading"
                  eyebrow="Delivering it"
                  title="What this kind of project demands"
                  lead={detail.deliveryNote}
                />
                <ul className="mt-8 space-y-3">
                  {detail.deliveryPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-3 shrink-0 bg-amber-500"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/services"
                    className="text-[0.9375rem] font-medium text-amber-700 underline underline-offset-4 hover:text-amber-800"
                  >
                    How we run a project, stage by stage
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <SectionHeader
                  eyebrow="Afterwards"
                  title="Support and lifecycle"
                />
                <dl className="mt-8 space-y-7">
                  {detail.lifecycle.map((item) => (
                    <div
                      key={item.title}
                      className="border-t border-ink-200 pt-6"
                    >
                      <dt className="text-[1.0625rem] font-medium text-ink-900">
                        {item.title}
                      </dt>
                      <dd className="text-body mt-2 text-ink-600">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <Link
                    href="/solutions/managed-av-services"
                    className="text-[0.9375rem] font-medium text-amber-700 underline underline-offset-4 hover:text-amber-800"
                  >
                    Managed AV services
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------------- FAQs */}
      {detail ? (
        <Faqs
          faqs={detail.faqs}
          eyebrow="Questions we are asked"
          title={`About ${solution.title.toLowerCase()}`}
          pageUrl={absoluteUrl(`/solutions/${solution.slug}`)}
        />
      ) : null}

      {/* ---------------------------------------- related industries + work */}
      <Section surface="subtle" aria-labelledby="related-heading">
        <Container>
          <SectionHeader
            id="related-heading"
            eyebrow="Related"
            title="Where this fits alongside everything else"
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h3 className="text-eyebrow text-ink-500">
                Sectors we deliver this in
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="inline-flex min-h-[2.25rem] items-center rounded-full border border-ink-200 bg-ink-0 px-4 text-[0.875rem] text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-900"
                    >
                      {industry.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-eyebrow mt-10 text-ink-500">
                Project stories
              </h3>
              <PreparingNote className="mt-4">
                Case studies for this solution are being prepared for
                publication.
              </PreparingNote>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-eyebrow text-ink-500">Other solutions</h3>
              <ul className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/solutions/${entry.slug}`}
                      className="group flex items-baseline justify-between gap-6 py-5 transition-colors"
                    >
                      {/* Title only. Repeating each solution's outcome line
                          here put the same sentences on seven pages. */}
                      <span className="text-[1.0625rem] font-medium text-ink-900 group-hover:text-amber-700">
                        {entry.title}
                      </span>
                      <ArrowRight
                        width={17}
                        height={17}
                        strokeWidth={2}
                        className="mt-1 shrink-0 text-ink-300 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-ink-900"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- CTA */}
      <Section surface="dark" spacing="md" aria-labelledby="solution-cta">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 id="solution-cta" className="text-h1 text-balance text-ink-0">
                {detail?.ctaHeadline ?? 'Tell us about the space'}
              </h2>
              <p className="text-body-lg mt-5 max-w-2xl text-ink-300">
                {detail?.ctaBody ??
                  'Send us the requirement and we will come back with the questions that matter.'}
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
