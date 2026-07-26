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

  /**
   * The stage before and after this one, rather than all seven others.
   *
   * Listing every service with its outcome line on every service page put the
   * same eight sentences on seven pages. Adjacent stages are also more useful:
   * they answer "what happens next?".
   */
  const position = allServices.findIndex(
    (entry) => entry.slug === service.slug
  );
  const adjacent = [
    allServices[position - 1],
    allServices[position + 1],
  ].filter((entry): entry is NonNullable<typeof entry> => entry !== undefined);

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
                {service.deliverableNote}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                <span className="grid size-11 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700">
                  <Icon name={service.icon} size="lg" />
                </span>
                <h2 className="text-h4 mt-5 font-semibold">Where this fits</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  {service.positionNote}
                </p>

                <dl className="mt-7 space-y-5 border-t border-ink-200 pt-6">
                  <div>
                    <dt className="text-eyebrow text-ink-500">
                      Who is involved
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
                      {service.whoIsInvolved}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-ink-500">
                      Typical duration
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
                      {service.typicalDuration}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Discuss your requirement
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-ink-200 pt-10">
            <h2 className="text-h3">What makes this stage go well</h2>
            <ul className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-3">
              {service.whatHelps.map((item) => (
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
          </div>
        </Container>
      </Section>

      <Section surface="subtle">
        <Container>
          <SectionHeader
            eyebrow="Either side of this stage"
            title="Where it sits in the sequence"
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2">
            {adjacent.map((entry) => (
              <li key={entry.slug} className="bg-ink-0">
                <Link
                  href={`/services/${entry.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-[220ms] hover:bg-ink-25"
                >
                  <span className="text-eyebrow text-ink-500">
                    {entry.order < service.order ? 'Before this' : 'After this'}
                  </span>
                  <span
                    data-numeric
                    className="mt-4 font-mono text-[0.8125rem] tracking-widest text-amber-700"
                  >
                    {String(entry.order).padStart(2, '0')}
                  </span>
                  <h3 className="text-h3 mt-2 group-hover:text-amber-700">
                    {entry.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/services" variant="secondary">
              All {allServices.length} delivery stages
              <ArrowRight
                width={16}
                height={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink href="/solutions" variant="ghost">
              See the solutions we deliver
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
