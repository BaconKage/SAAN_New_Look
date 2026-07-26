import { ArrowRight, Phone } from 'lucide-react';

import { HeroSystemGraphic } from '@/components/media/hero-system-graphic';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/section';
import { primaryCta, secondaryCta } from '@/config/navigation';
import { formatPhoneForDisplay, siteConfig, telHref } from '@/config/site';
import { hasValue } from '@/lib/content-required';

/**
 * Homepage hero.
 *
 * Answers the three five-second questions in server-rendered text — what SAAN
 * does, who it is for, what to do next — and pairs them with an abstract
 * system graphic rather than a background gradient or a stock photograph.
 *
 * The LCP element is the H1 itself: there is no image request on the critical
 * path, and the SVG is inline, so the hero is complete on first paint.
 */
export function Hero() {
  const salesPhone = siteConfig.contact.salesPhone;
  const salesPhoneValue = hasValue(salesPhone) ? salesPhone.value : '';

  return (
    <section
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="on-dark relative isolate overflow-hidden bg-ink-950 text-ink-0"
    >
      <Container
        width="wide"
        className="py-[var(--section-lg)] lg:py-[var(--section-xl)]"
      >
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="text-eyebrow flex items-center gap-2.5 text-amber-400">
              <span className="inline-block h-px w-6 bg-amber-400/60" />
              Professional AV systems integration
            </p>

            <h1
              id="hero-heading"
              className="text-display-1 mt-7 text-balance text-ink-0"
            >
              Technology spaces that work
              <span className="text-amber-400">—</span>every room, every screen,
              every time.
            </h1>

            <p className="text-body-lg mt-8 max-w-xl text-ink-300">
              SAAN designs, integrates and supports professional AV,
              meeting-room, digital-signage and display systems for enterprises
              and institutions. From consultation and system design to
              installation, training and long-term support, we deliver complete
              solutions built around your requirement.
            </p>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={primaryCta.href} variant="accent" size="lg">
                {primaryCta.label}
                <ArrowRight
                  width={18}
                  height={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </ButtonLink>

              <ButtonLink
                href={secondaryCta.href}
                variant="outlineInverse"
                size="lg"
              >
                {secondaryCta.label}
              </ButtonLink>

              <a
                href={telHref(salesPhoneValue)}
                className="inline-flex h-13 items-center gap-2 rounded-sm px-2 text-[1rem] font-medium text-ink-300 transition-colors duration-[160ms] hover:text-ink-0 sm:px-4"
              >
                <Phone
                  width={17}
                  height={17}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="sr-only">Call SAAN on </span>
                <span data-numeric>
                  {formatPhoneForDisplay(salesPhoneValue)}
                </span>
              </a>
            </div>
          </div>

          {/* Abstract system composition: rooms, control spine, screens and
              remote management. Hidden below `md` where it would compete with
              the headline for vertical space on a phone. */}
          <div className="hidden md:block lg:col-span-6 xl:col-span-6">
            <HeroSystemGraphic className="w-full" />
            {/* ink-400, not ink-500: ink-500 on ink-950 is 3.48:1. */}
            <p className="text-eyebrow mt-6 text-right text-ink-400">
              Rooms · control · screens · remote management
            </p>
          </div>
        </div>

        {/* Positioning statement. Verifiable facts only. */}
        <dl className="mt-16 grid gap-x-10 gap-y-7 border-t border-ink-0/10 pt-9 sm:grid-cols-3 lg:mt-20">
          {[
            {
              term: 'Consultation to commissioning',
              detail:
                'Requirement analysis, system design, installation, training and support under one accountable team.',
            },
            {
              term: 'Solution-led, not brand-led',
              detail:
                'We recommend what suits the room and the requirement, and we will tell you when a simpler option is the right one.',
            },
            {
              term: 'Based in Bengaluru',
              detail:
                'Engineering-led AV integration for enterprises, campuses, hospitals, venues and public institutions.',
            },
          ].map((item) => (
            <div key={item.term}>
              <dt className="text-[0.9375rem] font-medium text-ink-0">
                {item.term}
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-400">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
