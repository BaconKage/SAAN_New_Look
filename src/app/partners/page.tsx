import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import {
  ContentRequiredBlock,
  PreparingNote,
} from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import { content } from '@/content/source';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Technology Partners',
  description:
    'SAAN works across manufacturers so the specification follows the requirement. Partner relationships are published only once they have been verified as current.',
  path: '/partners',
});

export default async function PartnersPage() {
  const partners = await content.getPartners();

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="We work across manufacturers, on purpose"
        lead="A specification that starts from a brand is written backwards. Working across manufacturers means the design follows the requirement — and where a relationship gives us better support, training or lead times, that benefits your project rather than deciding it."
        trail={[{ label: 'Partners', href: '/partners' }]}
      />

      <Section>
        <Container>
          {partners.length === 0 ? (
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="text-h2">How equipment actually gets chosen</h2>
                <p className="text-body mt-6 text-ink-600">
                  SAAN evaluates technologies according to the room, workflow,
                  platform, budget and support requirement. Final product
                  selection follows requirement analysis and technical design —
                  not the other way round.
                </p>
                <p className="text-body mt-5 text-ink-600">
                  In practice that means the specification is written after we
                  know the viewing distance, the ambient light, the duty cycle,
                  the platforms you have standardised on, the support you will
                  need in five years, and what you already own that still
                  performs. If the honest answer is that your current equipment
                  is fine and only the control layer needs replacing, that is
                  what we will tell you.
                </p>

                <div className="mt-10">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Discuss your requirement
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                  <h2 className="text-h4 font-semibold">What we will not do</h2>
                  <ul className="mt-5 space-y-4">
                    {[
                      'Publish a manufacturer relationship we have not confirmed is current.',
                      'Present discontinued hardware as though it were still available.',
                      'Let a supplier incentive decide what your room needs.',
                    ].map((item) => (
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
                  <PreparingNote className="mt-7">
                    Technology partner details are being verified for
                    publication.
                  </PreparingNote>
                </div>
              </div>

              <div className="lg:col-span-12">
                <ContentRequiredBlock
                  what="Current authorised partner status"
                  note="Partner records are built and gated: a manufacturer appears only once SAAN confirms the relationship is current and supplies written logo-usage permission. Each record carries a lifecycle-review date, so discontinued products are hidden automatically."
                />
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
