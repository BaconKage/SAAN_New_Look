import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from '@phosphor-icons/react/ssr';

import { Magnetic } from '@/components/motion/magnetic';
import { Split } from '@/components/motion/split';
import { Spotlight } from '@/components/sections/spotlight';
import { Button } from '@/components/ui/button';
import { PRIMARY_CTA, mailLink, site, telLink, whatsappLink } from '@/content/site';

/** Closing call to action, shared by every page except Contact. */
export function CtaBand({
  title = 'Have a room in mind? Let’s design it.',
  accent = ['design', 'it.'],
}: {
  title?: string;
  accent?: string[];
}) {
  return (
    <section aria-label="Start a project" className="relative overflow-hidden bg-ink-950 py-28 md:py-40">
      <Spotlight />
      <div className="container-x relative">
        <Split
          text={title}
          accent={accent}
          className="display max-w-[16ch] text-[clamp(2.8rem,7vw,7rem)] text-fog-50"
        />
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between" data-reveal style={{ ['--d' as string]: 200 }}>
          <p className="max-w-md text-lg leading-relaxed text-fog-400">
            Tell us about the space, the number of rooms and your timeline. We will come back with a plan, not just a price list.
          </p>
          <Magnetic strength={0.4}>
            <Button href={PRIMARY_CTA.href} size="lg">
              {PRIMARY_CTA.label}
            </Button>
          </Magnetic>
        </div>
        <ul className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-8 text-fog-200 sm:flex-row sm:gap-10" data-reveal style={{ ['--d' as string]: 300 }}>
          <li>
            <a href={telLink} className="inline-flex items-center gap-3 transition-colors hover:text-signal-400">
              <PhoneIcon className="size-5 text-signal-500" /> {site.phone.display}
            </a>
          </li>
          <li>
            <a href={whatsappLink('Hello SAAN, I would like to discuss an AV project.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors hover:text-signal-400">
              <WhatsappLogoIcon className="size-5 text-signal-500" /> WhatsApp us
            </a>
          </li>
          <li>
            <a href={mailLink('Project enquiry')} className="inline-flex items-center gap-3 transition-colors hover:text-signal-400">
              <EnvelopeSimpleIcon className="size-5 text-signal-500" /> {site.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
