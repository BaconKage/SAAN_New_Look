import Link from 'next/link';

import { Logo } from '@/components/layout/logo';
import { ContentRequired } from '@/components/ui/content-required';
import { footerNavigation } from '@/config/navigation';
import {
  formatPhoneForDisplay,
  siteConfig,
  telHref,
  whatsappHref,
} from '@/config/site';
import { content } from '@/content/source';
import { hasValue, type SiteValue } from '@/lib/content-required';
import { currentYear } from '@/lib/utils';

/**
 * Site footer.
 *
 * Every contact detail is read from `siteConfig`. Values SAAN has not supplied
 * render a visible [CONTENT REQUIRED] marker rather than being omitted
 * silently, so a missing email address is impossible to overlook during review.
 */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-eyebrow mb-5 text-ink-400">{children}</h2>;
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[1.75rem] items-center text-[0.9375rem] text-ink-300 transition-colors duration-[160ms] hover:text-ink-0"
    >
      {children}
    </Link>
  );
}

/** Renders a contact value, or its placeholder marker when not yet supplied. */
function ContactValue({
  field,
  what,
  href,
  children,
}: {
  field: SiteValue;
  what: string;
  href?: string;
  children?: React.ReactNode;
}) {
  if (!hasValue(field)) {
    return <ContentRequired what={what} />;
  }

  if (href === undefined) {
    return <span className="text-[0.9375rem] text-ink-300">{children}</span>;
  }

  return (
    <a
      href={href}
      className="text-[0.9375rem] text-ink-300 transition-colors duration-[160ms] hover:text-ink-0"
    >
      {children}
    </a>
  );
}

export async function SiteFooter() {
  const [solutions, industries] = await Promise.all([
    content.getSolutions(),
    content.getIndustries(),
  ]);

  const { contact, address, registration } = siteConfig;
  const salesPhoneValue = hasValue(contact.salesPhone)
    ? contact.salesPhone.value
    : '';

  return (
    <footer
      data-surface="dark"
      className="on-dark border-t border-ink-800 bg-ink-950 text-ink-300"
    >
      <div className="container-wide py-[var(--section-md)]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + address */}
          <div className="lg:col-span-4">
            <Logo tone="inverse" />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink-400">
              {siteConfig.brandPromise}
            </p>

            <address className="mt-8 not-italic">
              <FooterHeading>Registered office</FooterHeading>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-ink-300">
                {siteConfig.legalName}
                <br />
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.locality} {address.postalCode}
                <br />
                {address.region}, {address.country}
              </p>
            </address>
          </div>

          {/* Solutions */}
          <nav aria-labelledby="footer-solutions" className="lg:col-span-2">
            <h2
              id="footer-solutions"
              className="text-eyebrow mb-5 text-ink-400"
            >
              Solutions
            </h2>
            <ul className="space-y-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <FooterLink href={`/solutions/${solution.slug}`}>
                    {solution.navLabel}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries */}
          <nav aria-labelledby="footer-industries" className="lg:col-span-2">
            <h2
              id="footer-industries"
              className="text-eyebrow mb-5 text-ink-400"
            >
              Industries
            </h2>
            <ul className="space-y-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <FooterLink href={`/industries/${industry.slug}`}>
                    {industry.navLabel}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className="text-eyebrow mb-5 text-ink-400">
              Company
            </h2>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-3">
              <li>
                <ContactValue
                  field={contact.salesPhone}
                  what="Confirmed sales telephone"
                  href={telHref(salesPhoneValue)}
                >
                  <span data-numeric>
                    {formatPhoneForDisplay(salesPhoneValue)}
                  </span>
                </ContactValue>
              </li>
              <li>
                <ContactValue
                  field={contact.whatsapp}
                  what="Confirmed WhatsApp number"
                  href={whatsappHref(salesPhoneValue)}
                >
                  WhatsApp
                </ContactValue>
              </li>
              <li>
                <ContactValue
                  field={contact.salesEmail}
                  what="Confirmed sales email"
                />
              </li>
              <li>
                <ContactValue
                  field={contact.supportEmail}
                  what="Confirmed support email"
                />
              </li>
              <li className="pt-2">
                <FooterHeading>Business hours</FooterHeading>
                <ContactValue
                  field={siteConfig.businessHours}
                  what="Confirmed business hours"
                />
              </li>
            </ul>

            <ul className="mt-6 space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal bar */}
        {/* ink-400, not ink-500: ink-500 on ink-950 is only 3.48:1 and fails
            AA for body text. Caught by the axe sweep, not by the token test. */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 text-[0.875rem] text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {/* Computed, never hard-coded — the previous site froze at 2020. */}
            &copy; {currentYear()} {siteConfig.legalName}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {hasValue(registration.cin) ? (
              <span data-numeric>CIN {registration.cin.value}</span>
            ) : (
              <ContentRequired what="Company CIN" />
            )}
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-[160ms] hover:text-ink-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
