import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequiredBlock } from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Recognition and Credentials',
  description:
    'Partner programme recognition, awards and company credentials held by SAAN. Every item is published only after the certificate has been verified.',
  path: '/recognition',
});

export default function RecognitionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Credentials, verified before they are published"
        lead="Awards and partner-programme recognition matter to institutional buyers, which is exactly why each one is checked against its certificate before it appears here."
        trail={[{ label: 'Recognition', href: '/recognition' }]}
      />

      <Section>
        <Container>
          <ContentRequiredBlock
            what="Verified award information"
            note="Several partner-programme awards and recognitions appear on SAAN's current website, dated between 2014 and 2019. Each needs re-verification and a certificate scan before it is republished, and any award tied to a relationship that has since lapsed will be presented as historical rather than current. Nothing is carried across on the strength of the old page alone."
          />

          <div className="mt-12 max-w-2xl">
            <h2 className="text-h3">What we will publish here</h2>
            <ul className="mt-6 space-y-3">
              {[
                'Manufacturer partner-programme recognition, with the year and the awarding organisation',
                'Company certifications and registrations relevant to institutional and government procurement',
                'Technical certifications held by our engineering team',
                'Certificate scans, so a buyer can verify a claim rather than take it on trust',
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-600"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-3 shrink-0 bg-amber-500"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-body mt-8 text-ink-600">
              We will not describe SAAN as the largest, the best or the market
              leader. If the work and the credentials do not make the case, a
              claim on a web page will not either.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="primary">
                About SAAN
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Request our credentials
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
