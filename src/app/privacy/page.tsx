import { PageHeader } from '@/components/sections/page-header';
import { ContentRequiredBlock } from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How SAAN Protocol Experts Private Limited collects, uses and protects personal information submitted through this website, and how to contact us about it.',
  path: '/privacy',
  // Not published until SAAN approves the policy text — a placeholder privacy
  // policy must never be indexed as if it were the real one.
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="How we handle the information you send us through this website."
        trail={[{ label: 'Privacy policy', href: '/privacy' }]}
      />

      <Section>
        <Container width="prose" className="!px-0">
          <div className="container-prose">
            <ContentRequiredBlock
              what="Approved privacy policy text"
              note="This policy must be drafted and approved by SAAN before any form on the site collects personal data. It needs to cover what is collected, why, how long it is retained, which third parties process it (email delivery, hosting and analytics), and the contact route for data-access and deletion requests under the Digital Personal Data Protection Act. The page is set to noindex until the approved text is in place."
            />

            <h2 className="text-h3 mt-14">What this policy must cover</h2>
            <ul className="mt-6 space-y-3">
              {[
                'The information collected through the project enquiry and support forms',
                'The purpose for which it is used, and the lawful basis for doing so',
                'How long enquiry and support records are retained',
                'Third parties that process the data: hosting, transactional email and analytics providers',
                'Whether any data is transferred outside India, and on what basis',
                'How to request access to, correction of, or deletion of your data',
                'The named contact for data-protection queries and grievances',
                'How cookies or similar technologies are used, if any are enabled',
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
          </div>
        </Container>
      </Section>
    </>
  );
}
