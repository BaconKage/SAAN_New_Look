import { brands } from '@/content/home';

/** Logos sized by area so wide wordmarks and square marks feel equally weighted. */
function size(ratio: number) {
  const area = 2300;
  let h = Math.sqrt(area / ratio);
  h = Math.min(h, 34);
  return { w: Math.round(h * ratio), h: Math.round(h) };
}

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <section aria-label="Technologies we design with" className="relative border-y border-white/[0.07] bg-ink-950 py-10">
      <div className="container-x mb-8 flex items-center gap-4">
        <h2 className="label shrink-0 text-fog-500">Technologies we design with</h2>
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 pr-16 md:gap-24 md:pr-24">
          {row.map((b, i) => {
            const { w, h } = size(b.ratio);
            return (
              <li key={`${b.name}-${i}`} aria-hidden={i >= brands.length || undefined} className="shrink-0">
                <span
                  role="img"
                  aria-label={b.name}
                  className="block bg-fog-400 transition-colors duration-300 hover:bg-fog-50"
                  style={{
                    width: w,
                    height: h,
                    maskImage: `url(/images/brands/${b.file})`,
                    WebkitMaskImage: `url(/images/brands/${b.file})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
