import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';
import Link from 'next/link';

import { products, type Product } from '@/content/products';
import { cn } from '@/lib/utils';

const pick = (id: string) => products.find((p) => p.id === id)!;

function ProductTile({ p, className, imgClass, sizes }: { p: Product; className?: string; imgClass?: string; sizes: string }) {
  return (
    <Link
      href={`/products?item=${p.id}`}
      className={cn('studio group relative flex min-h-[280px] flex-col overflow-hidden rounded-[var(--radius-card)] p-6 md:p-8', className)}
    >
      <div className="relative flex-1">
        <Image
          src={p.image}
          alt={`${p.brand} ${p.name}`}
          fill
          sizes={sizes}
          className={cn('object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:scale-[1.04]', imgClass)}
        />
      </div>
      <div className="relative mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-600">{p.brand}</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-ink-950" style={{ fontStretch: '108%' }}>
            {p.name}
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-950 text-fog-50 transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRightIcon weight="bold" className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function ProductsBento() {
  return (
    <section aria-labelledby="products-title" className="bg-ink-950 py-28 md:py-36">
      <div className="container-x">
        <p className="label text-signal-400" data-reveal="fade">
          Hardware we specify
        </p>
        <h2 id="products-title" className="display mt-5 max-w-[20ch] text-[clamp(2.5rem,5.2vw,5rem)] text-fog-50" data-reveal>
          Proven kit from the brands IT teams trust.
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-[repeat(3,minmax(300px,auto))]">
          <div className="md:col-span-7" data-reveal>
            <ProductTile p={pick('logitech-rally-bar')} className="h-full" imgClass="p-4 md:p-10" sizes="(min-width: 768px) 55vw, 100vw" />
          </div>
          <div className="md:col-span-5 md:row-span-2" data-reveal style={{ ['--d' as string]: 100 }}>
            <ProductTile p={pick('barco-clickshare-cx50')} className="h-full min-h-[420px]" imgClass="p-6 md:p-12" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="md:col-span-4" data-reveal>
            <ProductTile p={pick('sennheiser-tcc2')} className="h-full" imgClass="p-2" sizes="(min-width: 768px) 30vw, 100vw" />
          </div>
          <div className="md:col-span-3" data-reveal style={{ ['--d' as string]: 100 }}>
            <ProductTile p={pick('crestron-tsw-1070')} className="h-full" imgClass="p-0" sizes="(min-width: 768px) 25vw, 100vw" />
          </div>
          <div className="md:col-span-8" data-reveal>
            <ProductTile p={pick('lg-105bm5p')} className="h-full" imgClass="p-2 md:p-6" sizes="(min-width: 768px) 60vw, 100vw" />
          </div>
          <div className="md:col-span-4" data-reveal style={{ ['--d' as string]: 100 }}>
            <Link
              href="/products"
              className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-signal-500 p-8 text-ink-950"
            >
              <div className="led-field pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply" />
              <p className="relative display-tight text-[2.4rem] leading-none">{products.length} products</p>
              <div className="relative flex items-end justify-between gap-4">
                <p className="max-w-[22ch] text-lg leading-snug">Conferencing, displays, audio and control. Browse the catalogue.</p>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink-950 text-fog-50 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRightIcon weight="bold" className="size-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
