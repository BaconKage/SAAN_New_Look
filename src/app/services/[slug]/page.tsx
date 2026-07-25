import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Container, Section, SectionHeader } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

/**
 * Service detail page.
 *
 * Phase 2 renders the purpose and concrete deliverables from existing content
 * so every navigation and sitemap link resolves. Phase 5 adds who is involved,
 * typical duration and service-specific FAQs.
 */

export async function generateStaticParams() {
  const services = await content.getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await content.getService(slug);
  if (service === null) return {};

  return buildMetadata({
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    content.getService(slug),
    content.getServices(),
  ]);

  if (service === null) notFound();

  const others = allServices.filter((entry) => entry.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Service ${String(service.order).padStart(2, '0')} of ${allServices.length}`}
        title={service.outcome}
        lead={service.summary}
        trail={[
          { label: 'Services', href: '/services' },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-h2">What you receive</h2>
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-3">
                    <Check
                      width={18}
                      height={18}
                      strokeWidth={2.25}
                      className="mt-[0.4em] shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <span className="text-body text-ink-700">
                      {deliverable}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-body mt-10 text-ink-600">
                Each of these is something you can hold, review and hand to
                somebody else. That matters most when the people who inherit the
                system are not the people who bought it.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                <span className="grid size-11 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700">
                  <Icon name={service.icon} size="lg" />
                </span>
                <h2 className="text-h4 mt-5 font-semibold">Where this fits</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  This is stage {service.order} of our {allServices.length}
                  -stage delivery process. We can pick it up at any point —
                  including on systems somebody else installed.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Discuss your requirement
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="subtle">
        <Container>
          <SectionHeader
            eyebrow="The rest of the process"
            title="Everything else we handle"
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((entry) => (
              <li key={entry.slug} className="bg-ink-0">
                <Link
                  href={`/services/${entry.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-[220ms] hover:bg-ink-25"
                >
                  <span
                    data-numeric
                    className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                  >
                    {String(entry.order).padStart(2, '0')}
                  </span>
                  <h3 className="text-h4 mt-3 font-semibold">{entry.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                    {entry.outcome}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink href="/solutions" variant="secondary">
              See the solutions we deliver
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
    </>
  );
}
