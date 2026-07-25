import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { SolutionCard } from '@/components/cards/solution-card';
import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

/**
 * Industry detail page.
 *
 * Phase 2 renders the sector's environments and relevant solutions from
 * existing content so every navigation and sitemap link resolves. Phase 5 adds
 * the full seven blocks from docs/INFORMATION_ARCHITECTURE.md §4.3 — industry
 * challenges, operational benefits, delivery approach and relevant projects.
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
  const [industry, solutions] = await Promise.all([
    content.getIndustry(slug),
    content.getSolutions(),
  ]);

  if (industry === null) notFound();

  return (
    <>
      <PageHeader
        eyebrow={industry.title}
        title={industry.outcome}
        lead={industry.summary}
        trail={[
          { label: 'Industries', href: '/industries' },
          { label: industry.title, href: `/industries/${industry.slug}` },
        ]}
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Where we work"
            title="Typical environments"
            lead={`Spaces we design and deliver across ${industry.title.toLowerCase()} organisations.`}
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

      <Section surface="subtle">
        <Container>
          <SectionHeader
            eyebrow="Relevant solutions"
            title="What these spaces usually need"
            lead="Most projects combine several of these. We design them as one system rather than as separate installations."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.slice(0, 6).map((solution) => (
              <li key={solution.slug} className="contents">
                <SolutionCard solution={solution} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/solutions" variant="secondary">
              All solutions
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

      <Section surface="dark" spacing="md">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-h1 text-balance text-ink-0">
                Working in {industry.title.toLowerCase()}?
              </h2>
              <p className="text-body-lg mt-5 max-w-2xl text-ink-300">
                Tell us what the space has to do and what has not worked before.
                That is where a good system starts.
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
