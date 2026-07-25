import Link from 'next/link';

import { Reveal } from '@/components/interactive/reveal';
import { PageHeader } from '@/components/sections/page-header';
import { Icon } from '@/components/ui/icon';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Consultation, site survey, system design, supply, installation, commissioning, training, AMC, technical support and lifecycle management from SAAN.',
  path: '/services',
});

export default async function ServicesPage() {
  const services = await content.getServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What actually happens between the order and a working room"
        lead="Eight stages of delivery, each producing something you can review. Most suppliers describe the first three. The last five are where a project either holds up or quietly falls apart."
        trail={[{ label: 'Services', href: '/services' }]}
      />

      <Section>
        <Container>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 md:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.slug} className="bg-ink-0">
                <Reveal delay={(index % 2) as 0 | 1} className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col p-7 transition-colors duration-[220ms] hover:bg-ink-25"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        data-numeric
                        className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                      >
                        {String(service.order).padStart(2, '0')}
                      </span>
                      <span
                        className="h-px flex-1 bg-ink-100"
                        aria-hidden="true"
                      />
                      <Icon
                        name={service.icon}
                        size="md"
                        className="text-ink-400"
                      />
                    </div>

                    <h2 className="text-h3 mt-6">{service.title}</h2>

                    <p className="mt-2 text-[0.9375rem] font-medium text-amber-700">
                      {service.outcome}
                    </p>

                    <p className="text-body-sm mt-4 flex-1 text-ink-600">
                      {service.summary}
                    </p>

                    <div className="mt-6 border-t border-ink-100 pt-5">
                      <h3 className="text-eyebrow text-ink-500">
                        What you receive
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {service.deliverables.map((deliverable) => (
                          <li
                            key={deliverable}
                            className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-600"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.65em] h-px w-2.5 shrink-0 bg-amber-500"
                            />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
