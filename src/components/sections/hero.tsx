import { ArrowRight, Phone } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/section';
import { primaryCta, secondaryCta } from '@/config/navigation';
import { formatPhoneForDisplay, siteConfig, telHref } from '@/config/site';
import { hasValue } from '@/lib/content-required';

/**
 * Homepage hero.
 *
 * Answers the three five-second questions — what SAAN does, who it is for,
 * what to do next — in server-rendered text. There is no hero image request on
 * the critical path, so the LCP element is the H1 itself: the fastest possible
 * result against the 2.5s target, and it stays fast when the real photography
 * arrives because the image loads behind the text rather than under it.
 *
 * No carousel. No autoplay video.
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
      {/* Technical keyline field. Pure CSS: no image, no bundle, no request. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -z-10 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-amber-500/12 blur-3xl"
      />

      <Container className="py-[var(--section-lg)] lg:py-[var(--section-xl)]">
        <div className="max-w-4xl">
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

          <p className="text-body-lg mt-8 max-w-2xl text-ink-300">
            SAAN designs, integrates and supports professional AV, meeting-room,
            digital-signage and display systems for enterprises and
            institutions. From consultation and system design to installation,
            training and long-term support, we deliver complete solutions built
            around your requirement.
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
              <span data-numeric>{formatPhoneForDisplay(salesPhoneValue)}</span>
            </a>
          </div>
        </div>

        {/* Positioning statement. Facts only — no unverifiable claims. */}
        <dl className="mt-16 grid gap-x-8 gap-y-6 border-t border-ink-0/10 pt-8 sm:grid-cols-3 lg:mt-24">
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
