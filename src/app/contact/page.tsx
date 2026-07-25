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
import { hasValue, type SiteValue } from '@/lib/content-required';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Contact SAAN',
  description:
    'Contact SAAN in Bengaluru to discuss an AV, meeting room, digital signage or display project, or to reach technical support for an installed system.',
  path: '/contact',
});

function ContactRow({
  icon,
  label,
  field,
  what,
  href,
  display,
}: {
  icon: React.ReactNode;
  label: string;
  field: SiteValue;
  what: string;
  href?: string;
  display?: string;
}) {
  const available = hasValue(field);

  return (
    <div className="flex gap-4 border-b border-ink-100 py-5 last:border-0">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-eyebrow text-ink-500">{label}</p>
        <div className="mt-2">
          {available && href !== undefined ? (
            <a
              href={href}
              className="text-[1.0625rem] font-medium text-ink-900 underline-offset-4 hover:underline"
              data-numeric
            >
              {display}
            </a>
          ) : available ? (
            <span className="text-[1.0625rem] text-ink-900">{display}</span>
          ) : (
            <ContentRequired what={what} />
          )}
        </div>
        {field.note !== undefined && field.verified === false ? (
          <p className="mt-2 text-[0.8125rem] text-ink-500">
            Awaiting confirmation from SAAN.
          </p>
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
  const mainValue = hasValue(contact.mainPhone) ? contact.mainPhone.value : '';
  const supportValue = hasValue(contact.supportPhone)
    ? contact.supportPhone.value
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
                  label="Sales and new projects"
                  field={contact.salesPhone}
                  what="Confirmed sales telephone"
                  href={telHref(salesValue)}
                  display={formatPhoneForDisplay(salesValue)}
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
                  what="Confirmed WhatsApp number"
                  href={whatsappHref(
                    salesValue,
                    'Hello SAAN, I would like to discuss an AV project.'
                  )}
                  display={formatPhoneForDisplay(salesValue)}
                />
                <ContactRow
                  icon={
                    <Phone
                      width={17}
                      height={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  }
                  label="Main line"
                  field={contact.mainPhone}
                  what="Confirmed main telephone"
                  href={telHref(mainValue)}
                  display={formatPhoneForDisplay(mainValue)}
                />
                <ContactRow
                  icon={
                    <Phone
                      width={17}
                      height={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  }
                  label="Technical support"
                  field={contact.supportPhone}
                  what="Confirmed support telephone"
                  href={telHref(supportValue)}
                  display={formatPhoneForDisplay(supportValue)}
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
                  label="Sales email"
                  field={contact.salesEmail}
                  what="Confirmed sales email"
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
                  label="Support email"
                  field={contact.supportEmail}
                  what="Confirmed support email"
                />
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

                <h3 className="text-eyebrow mt-8 text-ink-500">
                  Business hours
                </h3>
                <div className="mt-3">
                  <ContentRequired what="Confirmed business hours" />
                </div>
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
