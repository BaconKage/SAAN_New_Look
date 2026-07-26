import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import {
  ContentRequiredBlock,
  PreparingNote,
} from '@/components/ui/content-required';
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
          <div className="max-w-2xl">
            <h2 className="text-h2">
              Credentials are being verified for publication
            </h2>
            <p className="text-body mt-6 text-ink-600">
              SAAN holds partner-programme recognition from manufacturers in the
              display, conferencing and audio categories. Rather than reprint
              what an older website claimed, we are checking each one against
              its certificate and its current status before it appears here — an
              award tied to a relationship that has since lapsed will be
              presented as historical, not as current standing.
            </p>

            <h3 className="text-h3 mt-14">What we will publish</h3>
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

            <PreparingNote className="mt-8">
              If you need our credentials for a tender or a vendor-registration
              process, ask and we will send the current documentation directly.
            </PreparingNote>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Request our credentials
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                About SAAN
              </ButtonLink>
            </div>

            <ContentRequiredBlock
              className="mt-12"
              what="Verified award information"
              note="Partner-programme awards dated 2014-2019 appear on the current website. Each needs re-verification and a certificate scan before republishing."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
