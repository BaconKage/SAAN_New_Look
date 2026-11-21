'use client';

import { ArrowUpRightIcon, CheckIcon, WhatsappLogoIcon, XIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getLenis } from '@/components/motion/smooth-scroll';
import { productCategories, products, type Product, type ProductCategory } from '@/content/products';
import { whatsappLink } from '@/content/site';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const dialog = useRef<HTMLDialogElement>(null);
  const itemId = params.get('item');
  const open = useMemo(() => products.find((p) => p.id === itemId) ?? null, [itemId]);

  const list = filter === 'all' ? products : products.filter((p) => p.category === filter);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    products.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  // Dialog follows the ?item= query so products are linkable from anywhere.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      getLenis()?.stop();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const close = () => {
    getLenis()?.start();
    router.replace(pathname, { scroll: false });
  };
  const show = (p: Product) => router.replace(`${pathname}?item=${p.id}`, { scroll: false });

  return (
    <section aria-label="Product catalogue" className="bg-ink-950 pb-28 md:pb-36">
      <div className="container-x">
        <div role="toolbar" aria-label="Filter by category" className="sticky top-[calc(var(--header-h)+0.75rem)] z-20 -mx-1 flex gap-2 overflow-x-auto px-1 py-2 [scrollbar-width:none]">
          {productCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-[0.95rem] backdrop-blur-xl transition-colors duration-300',
                filter === c.id ? 'border-signal-500 bg-signal-500 text-ink-950' : 'border-white/12 bg-ink-950/70 text-fog-200 hover:border-white/30',
              )}
            >
              {c.label}
              <span className={cn('font-mono text-xs', filter === c.id ? 'text-ink-950/70' : 'text-fog-500')}>{counts[c.id]}</span>
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <li key={`${filter}-${p.id}`} className="animate-[word-in_0.7s_var(--ease-out-expo)_both]" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              <button
                type="button"
                onClick={() => show(p)}
                className="studio group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[var(--radius-card)] p-6 text-left"
                aria-haspopup="dialog"
              >
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-600">{productCategories.find((c) => c.id === p.category)?.label}</span>
                <span className="relative my-4 block flex-1">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:scale-[1.05]"
                  />
                </span>
                <span className="flex items-end justify-between gap-3">
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-[0.1em] text-ink-600">{p.brand}</span>
                    <span className="mt-1 block text-lg font-semibold leading-tight text-ink-950" style={{ fontStretch: '106%' }}>
                      {p.name}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-950 text-fog-50 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRightIcon weight="bold" className="size-4" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-fog-500">
          Brands and models shown are representative of what SAAN specifies. Availability, pricing and warranty terms are confirmed with each project quotation.
        </p>
      </div>

      <dialog
        ref={dialog}
        onClose={close}
        onClick={(e) => e.target === dialog.current && close()}
        aria-labelledby="product-dialog-title"
        className="m-auto w-[min(1080px,calc(100vw-1.5rem))] max-w-none overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-ink-900 p-0 text-fog-50 backdrop:bg-ink-950/80 backdrop:backdrop-blur-sm open:animate-[word-in_0.6s_var(--ease-out-expo)_both]"
      >
        {open && (
          <div className="grid max-h-[88dvh] overflow-y-auto md:grid-cols-2">
            <div className="studio relative min-h-[300px] md:min-h-[520px]">
              <Image src={open.image} alt={`${open.brand} ${open.name}`} fill sizes="(min-width: 768px) 540px, 100vw" className="object-contain p-10" />
            </div>
            <div className="flex flex-col p-7 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-signal-400">{open.brand}</p>
                  <h2 id="product-dialog-title" className="display-tight mt-2 text-[2rem] text-fog-50">
                    {open.name}
                  </h2>
                </div>
                <button type="button" onClick={close} aria-label="Close" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/5">
                  <XIcon className="size-5" />
                </button>
              </div>
              <p className="mt-5 leading-relaxed text-fog-200">{open.summary}</p>
              <ul className="mt-6 space-y-3">
                {open.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-fog-200">
                    <CheckIcon weight="bold" className="mt-1 size-4 shrink-0 text-signal-500" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <p className="label text-fog-500">Used in</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {open.solutions.map((slug) => {
                    const s = solutions.find((x) => x.slug === slug);
                    return s ? (
                      <Link key={slug} href={`/solutions/${slug}`} onClick={() => getLenis()?.start()} className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-fog-200 transition-colors hover:border-signal-500 hover:text-fog-50">
                        {s.short}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-9">
                <a
                  href={whatsappLink(`Hello SAAN, I would like a quote for the ${open.brand} ${open.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-signal-500 px-6 font-medium text-ink-950 transition-colors hover:bg-signal-400"
                >
                  <WhatsappLogoIcon weight="bold" className="size-5" />
                  Request a quote
                </a>
                <Link
                  href={`/contact?product=${open.id}`}
                  onClick={() => getLenis()?.start()}
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 font-medium text-fog-50 transition-colors hover:bg-white/5"
                >
                  Send details
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
