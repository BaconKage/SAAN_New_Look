import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequiredBlock } from '@/components/ui/content-required';
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
            <>
              <ContentRequiredBlock
                what="Current authorised partner status"
                note="Partner records are built and gated: a manufacturer appears on this site only once SAAN confirms the relationship is current and supplies written logo-usage permission. Each record also carries a lifecycle-review date, so discontinued products are hidden automatically. The previous website listed a manufacturer's discontinued hardware as current for six years — this gate exists to make that impossible."
              />

              <div className="mt-12 max-w-2xl">
                <h2 className="text-h3">How we choose equipment</h2>
                <p className="text-body mt-4 text-ink-600">
                  Selection follows the room: viewing distance, ambient light,
                  duty cycle, the platforms you have standardised on, the
                  support you will need in five years, and what you already own
                  that still performs. If the honest answer is that your current
                  equipment is fine and only one layer needs replacing, that is
                  what we will tell you.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Discuss your requirement
                  </ButtonLink>
                </div>
              </div>
            </>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
