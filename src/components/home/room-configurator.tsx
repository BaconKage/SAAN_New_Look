'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button, TextLink } from '@/components/ui/button';
import { rooms } from '@/content/home';
import { PRIMARY_CTA } from '@/content/site';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

/** Pick a room type and see where each part of the system goes. */
export function RoomConfigurator() {
  const [roomIndex, setRoomIndex] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [boxAspect, setBoxAspect] = useState(1.6);
  const box = useRef<HTMLDivElement>(null);
  const room = rooms[roomIndex]!;
  const solution = solutions.find((s) => s.slug === room.solution);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (e) setBoxAspect(e.contentRect.width / Math.max(1, e.contentRect.height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Maps a point in image space to the object-cover box. */
  const place = (x: number, y: number) => {
    const ia = room.w / room.h;
    if (ia < boxAspect) return { x, y: 50 + (y - 50) * (boxAspect / ia) };
    return { x: 50 + (x - 50) * (ia / boxAspect), y };
  };

  const select = (i: number) => {
    setRoomIndex(i);
    setActive(null);
  };

  return (
    <section aria-labelledby="configurator-title" className="relative bg-ink-950 py-28 md:py-36">
      <div className="container-x">
        <p className="label text-signal-400" data-reveal="fade">
          Room configurator
        </p>
        <h2 id="configurator-title" className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,5.2vw,5rem)] text-fog-50" data-reveal>
          Pick a room. See the system.
        </h2>

        <div role="tablist" aria-label="Room types" className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" data-reveal style={{ ['--d' as string]: 120 }}>
          {rooms.map((r, i) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={i === roomIndex}
              aria-controls="room-panel"
              onClick={() => select(i)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-2.5 text-[0.95rem] transition-colors duration-300',
                i === roomIndex
                  ? 'border-signal-500 bg-signal-500 text-ink-950'
                  : 'border-white/12 text-fog-200 hover:border-white/30 hover:text-fog-50',
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div id="room-panel" role="tabpanel" className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Photo with hotspots */}
          <div className="relative lg:col-span-8" data-reveal="clip">
            <div ref={box} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink-850 md:aspect-[16/10]">
              {rooms.map((r, i) => (
                <Image
                  key={r.id}
                  src={r.image}
                  alt={i === roomIndex ? `${r.label} with the system components marked` : ''}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn(
                    'object-cover transition-[opacity,transform,filter] duration-[1200ms] ease-[var(--ease-out-expo)]',
                    i === roomIndex ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                  )}
                  style={{ filter: active !== null && i === roomIndex ? 'brightness(0.55)' : 'brightness(0.8)' }}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />

              {room.hotspots.map((h, i) => {
                const isActive = active === i;
                const pos = place(h.x, h.y);
                const flip = pos.x > 58;
                return (
                  <div
                    key={`${room.id}-${i}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 animate-[word-in_0.8s_var(--ease-out-expo)_both]"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, animationDelay: `${250 + i * 90}ms`, zIndex: isActive ? 5 : 1 }}
                  >
                    <button
                      type="button"
                      aria-label={`${i + 1}. ${h.title}`}
                      aria-expanded={isActive}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : i)}
                      className="relative grid size-9 place-items-center"
                    >
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-signal-500/50" />
                      <span
                        className={cn(
                          'relative grid size-7 place-items-center rounded-full font-mono text-xs font-semibold transition-[background-color,transform] duration-300',
                          isActive ? 'scale-110 bg-fog-50 text-ink-950' : 'bg-signal-500 text-ink-950',
                        )}
                      >
                        {i + 1}
                      </span>
                    </button>
                    <div
                      role="tooltip"
                      className={cn(
                        'pointer-events-none absolute top-1/2 hidden w-64 -translate-y-1/2 rounded-2xl border border-white/10 bg-ink-950/85 p-4 backdrop-blur-xl transition-[opacity,transform] duration-300 md:block',
                        flip ? 'right-12' : 'left-12',
                        isActive ? 'translate-x-0 opacity-100' : cn('opacity-0', flip ? 'translate-x-2' : '-translate-x-2'),
                      )}
                    >
                      <p className="font-medium text-fog-50">{h.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fog-400">{h.detail}</p>
                      <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-signal-400">{h.brands}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System list */}
          <div className="flex flex-col lg:col-span-4" data-reveal style={{ ['--d' as string]: 150 }}>
            <div key={room.id} className="animate-[word-in_0.7s_var(--ease-out-expo)_both]">
              <p className="font-mono text-sm text-fog-500">{room.capacity}</p>
              <p className="mt-3 text-lg leading-relaxed text-fog-200">{room.summary}</p>
            </div>
            <ol className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {room.hotspots.map((h, i) => (
                <li key={`${room.id}-${h.title}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="flex w-full animate-[word-in_0.7s_var(--ease-out-expo)_both] items-center gap-4 py-4 text-left"
                    style={{ animationDelay: `${120 + i * 70}ms` }}
                  >
                    <span
                      className={cn(
                        'grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs transition-colors duration-300',
                        active === i ? 'bg-signal-500 text-ink-950' : 'bg-white/[0.06] text-fog-200',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn('block transition-colors', active === i ? 'text-fog-50' : 'text-fog-200')}>{h.title}</span>
                      <span className="block truncate text-sm text-fog-500">{h.brands}</span>
                      {active === i && <span className="mt-1.5 block text-sm leading-relaxed text-fog-400 md:hidden">{h.detail}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={`${PRIMARY_CTA.href}?space=${room.id}`}>{PRIMARY_CTA.label}</Button>
              {solution && <TextLink href={`/solutions/${solution.slug}`}>{solution.short}</TextLink>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
