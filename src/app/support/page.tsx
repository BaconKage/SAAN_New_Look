import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequired } from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import { formatPhoneForDisplay, siteConfig, telHref } from '@/config/site';
import { hasValue } from '@/lib/content-required';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Technical Support',
  description:
    'Report a fault on a system installed by SAAN. Support requests are logged with a reference number and routed to the engineering team for diagnosis.',
  path: '/support',
});

export default function SupportPage() {
  const supportPhone = siteConfig.contact.supportPhone;
  const supportValue = hasValue(supportPhone) ? supportPhone.value : '';

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Something not working? Tell us what you are seeing."
        lead="Support requests reach the engineering team with a reference number, so nothing depends on catching the right person on the phone."
        trail={[{ label: 'Support', href: '/support' }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-h2">The support request form</h2>
              <p className="text-body mt-4 text-ink-600">
                A structured support form is being built for this page. It
                captures the site, the affected system, the severity, a
                description and any screenshots or photographs, then issues a
                unique reference so the request can be tracked.
              </p>

              <h3 className="text-h4 mt-10 font-semibold">
                What it will ask for
              </h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {[
                  'Your name and organisation',
                  'Phone and email for callback',
                  'Site or building location',
                  'Which system or room is affected',
                  'Issue type',
                  'Severity',
                  'What you are seeing',
                  'Screenshots or photographs',
                  'Preferred callback time',
                ].map((field) => (
                  <li
                    key={field}
                    className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-2.5 shrink-0 bg-amber-500"
                    />
                    {field}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-md border border-ink-200 bg-ink-25 p-6">
                <h3 className="text-h4 font-semibold">Response times</h3>
                <div className="mt-4">
                  <ContentRequired what="Confirmed support response-time policy" />
                </div>
                <p className="text-body-sm mt-4 text-ink-600">
                  We will publish response times only once SAAN confirms them as
                  written policy. Committing to a target we have not agreed
                  internally would be worse than publishing nothing.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                <h2 className="text-h4 font-semibold">Need help now?</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  If a room is down and you need it working today, call the
                  support line rather than waiting on a form.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <ButtonLink href={telHref(supportValue)} variant="primary">
                    <span data-numeric>
                      {formatPhoneForDisplay(supportValue)}
                    </span>
                  </ButtonLink>
                </div>

                <div className="mt-7 border-t border-ink-200 pt-6">
                  <p className="text-eyebrow text-ink-500">Support email</p>
                  <div className="mt-3">
                    <ContentRequired what="Confirmed support email" />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-ink-200 p-7">
                <h2 className="text-h4 font-semibold">
                  Not covered by a contract?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  We support systems we did not install. If the original
                  supplier has moved on and nobody has the documentation, that
                  is a situation we deal with regularly.
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href="/services/amc-and-preventive-maintenance"
                    variant="secondary"
                  >
                    AMC and maintenance
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
