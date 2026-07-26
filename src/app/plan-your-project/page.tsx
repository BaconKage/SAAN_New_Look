import { PageHeader } from '@/components/sections/page-header';
import { ButtonLink } from '@/components/ui/button';
import { ContentRequired } from '@/components/ui/content-required';
import { Container, Section } from '@/components/ui/section';
import {
  formatPhoneForDisplay,
  siteConfig,
  telHref,
  whatsappHref,
} from '@/config/site';
import { hasValue } from '@/lib/content-required';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Plan Your Project',
  description:
    'Tell SAAN about the space you are planning. We will come back with the questions that matter, then design a system around your actual requirement.',
  path: '/plan-your-project',
});

/** The questions the guided configurator will ask. Phase 6. */
const configuratorSteps = [
  'What type of space are you planning?',
  'How many people use the room?',
  'Local presentations, video meetings, or both?',
  'Which meeting platforms do you use?',
  'Is touch interaction required?',
  'Do you need recording or streaming?',
  'New construction, renovation or upgrade?',
  'When do you expect installation?',
  'Where is the site?',
];

export default function PlanYourProjectPage() {
  const salesPhone = siteConfig.contact.salesPhone;
  const salesValue = hasValue(salesPhone) ? salesPhone.value : '';

  return (
    <>
      <PageHeader
        eyebrow="Plan your project"
        title="Start with the room, not the product"
        lead="Tell us what the space has to do and we will work out what it needs. Every system we deliver is specified after a site assessment — so this is the start of a conversation, not a quotation request."
        trail={[{ label: 'Plan your project', href: '/plan-your-project' }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-h2">What we will ask</h2>
              <p className="text-body mt-4 text-ink-600">
                A guided requirement form is being built for this page. It walks
                through nine short questions, summarises what you have told us
                in plain language, and sends it to our team along with your
                contact details.
              </p>

              <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink-200 bg-ink-200 sm:grid-cols-2">
                {configuratorSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 bg-ink-0 p-5">
                    <span
                      data-numeric
                      className="font-mono text-[0.8125rem] tracking-widest text-amber-700"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="text-body-sm mt-8 max-w-2xl text-ink-500">
                The summary is a starting point for discussion. It will not
                generate a specification or a price — the right system depends
                on the building, and that needs a site assessment.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                <h2 className="text-h4 font-semibold">
                  Prefer to talk it through?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  Most projects start faster with a five-minute conversation
                  than with a form. Call or message us and describe the space.
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <ButtonLink href={telHref(salesValue)} variant="primary">
                    <span data-numeric>
                      {formatPhoneForDisplay(salesValue)}
                    </span>
                  </ButtonLink>
                  <ButtonLink
                    href={whatsappHref(
                      salesValue,
                      'Hello SAAN, I would like to discuss an AV project.'
                    )}
                    variant="secondary"
                    external
                  >
                    Message on WhatsApp
                  </ButtonLink>
                </div>

                <ContentRequired
                  className="mt-6"
                  what="Confirmed sales email"
                />
              </div>

              <div className="mt-6 rounded-lg border border-ink-200 p-7">
                <h2 className="text-h4 font-semibold">
                  Already a SAAN customer?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  If something has stopped working on an installed system, use
                  the support route instead — it reaches the engineering team
                  directly.
                </p>
                <div className="mt-6">
                  <ButtonLink href="/support" variant="secondary">
                    Request technical support
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
