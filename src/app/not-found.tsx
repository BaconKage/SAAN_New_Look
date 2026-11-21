import { Button } from '@/components/ui/button';
import { PRIMARY_CTA } from '@/content/site';

/* 404 drawn the way an LED module would: a 3 x 5 dot font. */
const GLYPHS: Record<string, string[]> = {
  '4': ['#.#', '#.#', '###', '..#', '..#'],
  '0': ['###', '#.#', '#.#', '#.#', '###'],
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-ink-950 pt-[var(--header-h)]">
      <div className="led-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div aria-hidden className="flex -skew-x-[10deg] gap-5">
          {'404'.split('').map((ch, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              {GLYPHS[ch]!.join('')
                .split('')
                .map((c, j) => (
                  <span
                    key={j}
                    className={
                      c === '#'
                        ? 'size-[clamp(14px,3vw,30px)] rounded-[4px] bg-signal-500 shadow-[0_0_18px_rgba(224,138,0,0.55)]'
                        : 'size-[clamp(14px,3vw,30px)] rounded-[4px] bg-white/[0.05]'
                    }
                  />
                ))}
            </div>
          ))}
        </div>
        <div>
          <h1 className="display text-[clamp(2.6rem,5.5vw,5rem)] text-fog-50">No signal on this input.</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-fog-400">
            The page you were looking for has moved or never existed. Let us get you back to a working source.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/">Back to home</Button>
            <Button href={PRIMARY_CTA.href} variant="ghost">
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
