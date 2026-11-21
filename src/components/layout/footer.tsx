import {
  ArrowUpIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react/ssr';
import Link from 'next/link';

import { Logo } from '@/components/brand/logo';
import { mailLink, site, telLink, whatsappLink } from '@/content/site';
import { solutions } from '@/content/solutions';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink-950 pt-20">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-fog-400">
            Enterprise AV, unified communications and lifecycle support from
            Bengaluru, since {site.founded}.
          </p>
          <p
            className="mt-6 text-lg italic text-fog-50"
            style={{ fontStretch: '110%' }}
          >
            {site.tagline}.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="label text-fog-500">Solutions</h2>
          <ul className="mt-5 space-y-2.5">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="text-fog-200 transition-colors hover:text-signal-400"
                >
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="label text-fog-500">Company</h2>
          <ul className="mt-5 space-y-2.5">
            {[
              ['Products', '/products'],
              ['About', '/about'],
              ['Recognition', '/about#recognition'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href!}
                  className="text-fog-200 transition-colors hover:text-signal-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="label text-fog-500">Contact</h2>
          <ul className="mt-5 space-y-3 text-fog-200">
            <li>
              <a
                href={telLink}
                className="inline-flex items-center gap-3 transition-colors hover:text-signal-400"
              >
                <PhoneIcon className="size-4 text-signal-500" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-signal-400"
              >
                <WhatsappLogoIcon className="size-4 text-signal-500" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailLink()}
                className="inline-flex items-center gap-3 transition-colors hover:text-signal-400"
              >
                <EnvelopeSimpleIcon className="size-4 text-signal-500" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-3 transition-colors hover:text-signal-400"
              >
                <MapPinIcon className="mt-1 size-4 shrink-0 text-signal-500" />
                <span className="text-sm leading-relaxed">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none relative mt-16 select-none overflow-hidden"
      >
        <p
          className="text-center text-[24vw] font-black italic leading-[0.8] tracking-[-0.06em] text-transparent"
          style={{
            fontStretch: '125%',
            WebkitTextStroke: '1px rgb(224 138 0 / 0.4)',
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)',
          }}
        >
          SAAN
        </p>
      </div>

      <div className="container-x relative flex flex-col gap-4 border-t border-white/[0.07] py-6 text-sm text-fog-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 transition-colors hover:text-fog-50"
        >
          Back to top <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  );
}
