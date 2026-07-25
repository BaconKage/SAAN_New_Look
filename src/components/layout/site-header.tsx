import Link from 'next/link';

import {
  PrimaryNav,
  type NavPanels,
} from '@/components/navigation/primary-nav';
import { Logo } from '@/components/layout/logo';
import { formatPhoneForDisplay, siteConfig, telHref } from '@/config/site';
import { content } from '@/content/source';
import { hasValue } from '@/lib/content-required';

/**
 * Site header.
 *
 * A server component: the mega-panel contents are read from the content source
 * at render time, so the navigation can never list a solution that does not
 * exist. Only the interaction layer is a client component.
 */
export async function SiteHeader() {
  const [solutions, industries, services] = await Promise.all([
    content.getSolutions(),
    content.getIndustries(),
    content.getServices(),
  ]);

  const panels: NavPanels = {
    solutions: solutions.map((s) => ({
      slug: s.slug,
      label: s.navLabel,
      href: `/solutions/${s.slug}`,
      outcome: s.outcome,
      icon: s.icon,
    })),
    industries: industries.map((i) => ({
      slug: i.slug,
      label: i.navLabel,
      href: `/industries/${i.slug}`,
      outcome: i.outcome,
      icon: i.icon,
    })),
    services: services.map((s) => ({
      slug: s.slug,
      label: s.navLabel,
      href: `/services/${s.slug}`,
      outcome: s.outcome,
      icon: s.icon,
    })),
  };

  const salesPhone = siteConfig.contact.salesPhone;
  const salesPhoneValue = hasValue(salesPhone) ? salesPhone.value : '';

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-ink-0/95 backdrop-blur-sm">
      <div className="container-wide flex h-[var(--header-height)] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-sm py-2"
          aria-label={`${siteConfig.displayName} — home`}
        >
          <Logo />
        </Link>

        <PrimaryNav
          panels={panels}
          salesPhoneHref={telHref(salesPhoneValue)}
          salesPhoneLabel={formatPhoneForDisplay(salesPhoneValue)}
        />
      </div>
    </header>
  );
}
