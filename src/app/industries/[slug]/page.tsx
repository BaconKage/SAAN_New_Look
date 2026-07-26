import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHeader } from '@/components/sections/page-header';
import { PreparingNote } from '@/components/ui/content-required';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

/**
 * Industry detail page.
 *
 * Every block here is sector-specific. The earlier version rendered six full
 * solution cards on each of the seven pages, which put identical solution copy
 * on eight pages at once — the largest single source of repetition the Phase 3A
 * audit found. Solutions are now a filtered index of links, and the substance
 * comes from the sector's own challenges, benefits and delivery constraints.
 */

export async function generateStaticParams() {
  const industries = await content.getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await content.getIndustry(slug);
  if (industry === null) return {};

  return buildMetadata({
    title: industry.seo.metaTitle,
    description: industry.seo.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [industry, detail, solutions] = await Promise.all([
    content.getIndustry(slug),
    content.getIndustryDetail(slug),
    content.getSolutions(),
  ]);

  if (industry === null) notFound();

  const relevant =
    detail === null
      ? solutions.slice(0, 4)
      : detail.relevantSolutions
          .map((entry) => solutions.find((s) => s.slug === entry))
          .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <>
      <PageHeader
        eyebrow={industry.title}
        title={industry.outcome}
        lead={detail?.intro ?? industry.summary}
        trail={[
          { label: 'Industries', href: '/industries' },
          { label: industry.title, href: `/industries/${industry.slug}` },
        ]}
      />

      {/* -------------------------------------------- sector challenges --- */}
      {detail ? (
        <Section aria-labelledby="challenges-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeader
                  id="challenges-heading"
                  eyebrow="What makes this sector different"
                  title="The constraints we design around"
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

      {/* ------------------------------------------------- environments --- */}
      <Section surface="subtle" aria-labelledby="environments-heading">
        <Container>
          <SectionHeader
            id="environments-heading"
            eyebrow="Where we work"
            title="Typical environments"
          />

          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
            {industry.environments.map((environment) => (
              <li
                key={environment}
                className="bg-ink-0 p-6 text-[1rem] font-medium text-ink-800"
              >
                {environment}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------ operational benefits -- */}
      {detail ? (
        <Section surface="dark" aria-labelledby="benefits-heading">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionHeader
                  id="benefits-heading"
                  eyebrow="What changes"
                  title="Operational outcomes"
                  tone="inverse"
                />
              </div>

              <dl className="grid gap-x-10 gap-y-8 lg:col-span-8 lg:grid-cols-3">
                {detail.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="border-t border-ink-0/15 pt-6"
                  >
                    <dt className="text-[1.0625rem] font-medium text-ink-0">
                      {benefit.title}
                    </dt>
                    <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink-400">
                      {benefit.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------- delivery approach + solutions -- */}
      <Section aria-labelledby="approach-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                id="approach-heading"
                eyebrow="How we deliver here"
                title="Working around your operation"
                lead={detail?.deliveryApproach.summary}
              />
              {detail ? (
                <ul className="mt-8 space-y-3">
                  {detail.deliveryApproach.considerations.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-3 shrink-0 bg-amber-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-8">
                <Link
                  href="/services"
                  className="text-[0.9375rem] font-medium text-amber-700 underline underline-offset-4 hover:text-amber-800"
                >
                  How we run a project, stage by stage
                </Link>
              </div>
            </div>

            {/* Links, not cards: the solution copy lives on the solution
                pages and is not duplicated across seven sectors. */}
            <div className="lg:col-span-6">
              <h2 className="text-eyebrow text-ink-500">
                Solutions most relevant here
              </h2>
              <ul className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
                {relevant.map((solution) => (
                  <li key={solution.slug}>
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="group flex items-start gap-4 py-5"
                    >
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700 transition-colors group-hover:border-amber-300 group-hover:bg-amber-50">
                        <Icon name={solution.icon} size="sm" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1.0625rem] font-medium text-ink-900 transition-colors group-hover:text-amber-700">
                          {solution.title}
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-ink-600">
                          {solution.outcome}
                        </span>
                      </span>
                      <ArrowRight
                        width={17}
                        height={17}
                        strokeWidth={2}
                        className="mt-1.5 shrink-0 text-ink-300 transition-[transform,color] group-hover:translate-x-1 group-hover:text-ink-900"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <PreparingNote className="mt-8">
                {industry.title} project stories are being prepared for
                publication.
              </PreparingNote>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- CTA */}
      <Section surface="dark" spacing="md" aria-labelledby="industry-cta">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 id="industry-cta" className="text-h1 text-balance text-ink-0">
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
