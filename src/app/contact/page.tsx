import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

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
import { hasValue, isPublic, type SiteValue } from '@/lib/content-required';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Contact SAAN',
  description:
    'Contact SAAN in Bengaluru to discuss an AV, meeting room, digital signage or display project, or to reach technical support for an installed system.',
  path: '/contact',
});

/**
 * A contact row. Renders nothing at all unless the value is verified, so an
 * unconfirmed number or a missing email never appears as an empty labelled row.
 */
function ContactRow({
  icon,
  label,
  field,
  href,
  display,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  field: SiteValue;
  href: string;
  display: string;
  detail?: string;
}) {
  if (!isPublic(field)) return null;

  return (
    <div className="flex gap-4 border-b border-ink-100 py-5 last:border-0">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-eyebrow text-ink-500">{label}</p>
        <div className="mt-2">
          <a
            href={href}
            className="text-[1.0625rem] font-medium text-ink-900 underline-offset-4 hover:underline"
            data-numeric
          >
            {display}
          </a>
        </div>
        {detail ? (
          <p className="mt-1.5 text-[0.875rem] text-ink-500">{detail}</p>
        ) : null}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { contact, address } = siteConfig;
  const salesValue = hasValue(contact.salesPhone)
    ? contact.salesPhone.value
    : '';

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to someone who will ask the right questions"
        lead="Whether you are planning a single room or an estate-wide programme, the fastest route is a short conversation about what the space has to do."
        trail={[{ label: 'Contact', href: '/contact' }]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-h2">How to reach us</h2>

              <div className="mt-8">
                <ContactRow
                  icon={
                    <Phone
                      width={17}
                      height={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  }
                  label="Call us"
                  field={contact.salesPhone}
                  href={telHref(salesValue)}
                  display={formatPhoneForDisplay(salesValue)}
                  detail="New projects and support for installed systems."
                />
                <ContactRow
                  icon={
                    <MessageCircle
                      width={17}
                      height={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  }
                  label="WhatsApp"
                  field={contact.whatsapp}
                  href={whatsappHref(
                    salesValue,
                    'Hello SAAN, I would like to discuss an AV project.'
                  )}
                  display={formatPhoneForDisplay(salesValue)}
                  detail="Send photographs of the space and we can start from there."
                />
                <ContactRow
                  icon={
                    <Mail
                      width={17}
                      height={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  }
                  label="Email"
                  field={contact.salesEmail}
                  href={`mailto:${contact.salesEmail.value ?? ''}`}
                  display={contact.salesEmail.value ?? ''}
                />
              </div>

              {/* Audit mode only — never rendered for visitors. */}
              <div className="mt-6 flex flex-col items-start gap-2 empty:hidden">
                <ContentRequired what="Confirmed sales email" />
                <ContentRequired what="Confirmed support email" />
                <ContentRequired what="Confirmed main telephone" />
                <ContentRequired what="Confirmed support telephone" />
              </div>

              <div className="mt-10 rounded-md border border-ink-200 bg-ink-25 p-6">
                <h3 className="text-h4 font-semibold">
                  Prefer to send the requirement in writing?
                </h3>
                <p className="text-body-sm mt-3 text-ink-600">
                  The project form captures the room, the platforms you use and
                  the timeline, so the first conversation starts from something
                  concrete rather than from a blank page.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/plan-your-project" variant="secondary">
                    Plan your project
                  </ButtonLink>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-ink-200 bg-ink-25 p-7">
                <span className="grid size-9 place-items-center rounded-md border border-ink-200 bg-ink-0 text-amber-700">
                  <MapPin
                    width={17}
                    height={17}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <h2 className="text-h4 mt-5 font-semibold">
                  Registered office
                </h2>
                <address className="mt-3 not-italic text-[0.9375rem] leading-relaxed text-ink-600">
                  {siteConfig.legalName}
                  <br />
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.locality} {address.postalCode}
                  <br />
                  {address.region}, {address.country}
                </address>

                {isPublic(siteConfig.businessHours) ? (
                  <>
                    <h3 className="text-eyebrow mt-8 text-ink-500">
                      Business hours
                    </h3>
                    <p className="mt-3 text-[0.9375rem] text-ink-700">
                      {siteConfig.businessHours.value}
                    </p>
                  </>
                ) : (
                  <ContentRequired
                    className="mt-8"
                    what="Confirmed business hours"
                  />
                )}
              </div>

              <div className="mt-6 rounded-lg border border-ink-200 p-7">
                <h2 className="text-h4 font-semibold">
                  Have a project in mind?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  Sending the requirement first means the conversation starts
                  with the room rather than with a catalogue.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/plan-your-project" variant="primary">
                    Plan your project
                  </ButtonLink>
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
