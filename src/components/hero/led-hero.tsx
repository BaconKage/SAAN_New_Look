'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Magnetic } from '@/components/motion/magnetic';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/content/home';
import { PRIMARY_CTA } from '@/content/site';
import { cn, onSiteLoaded } from '@/lib/utils';

import { LedRenderer } from './led-renderer';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_MS = 6500;

function heroReady() {
  (window as unknown as { __saanHeroReady?: boolean }).__saanHeroReady = true;
  window.dispatchEvent(new Event('saan:hero-ready'));
}

export function LedHero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const zoomWrap = useRef<HTMLDivElement>(null);
  const slideImgs = useRef<(HTMLImageElement | null)[]>([]);
  const renderer = useRef<LedRenderer | null>(null);
  const busy = useRef(false);
  const [slide, setSlide] = useState({ index: 0, prev: -1 });
  const index = slide.index;
  const [glReady, setGlReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [cycle, setCycle] = useState(0);

  // --- WebGL setup -------------------------------------------------------
  useEffect(() => {
    const host = canvasHost.current;
    const sec = section.current;
    if (!host || !sec) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // A fresh canvas per mount. Re-using one canvas across mounts (React Strict
    // Mode, fast refresh, route changes) can hand back a dead WebGL context.
    const cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.className = 'absolute inset-0 size-full';
    host.appendChild(cv);

    let disposed = false;
    let lost = false;
    let raf = 0;
    let visible = true;
    let tl: gsap.core.Timeline | null = null;

    let r: LedRenderer;
    try {
      r = new LedRenderer(
        cv,
        heroSlides.map((s) => ({ src: s.image, w: s.w, h: s.h })),
        { pitch: 9 }
      );
    } catch (err) {
      console.warn(
        '[LED hero] WebGL unavailable, showing the image fallback.',
        err
      );
      cv.remove();
      heroReady();
      return;
    }
    renderer.current = r;
    if (reduce) r.intro = 1;

    const loop = (t: number) => {
      if (disposed || lost) return;
      r.render(t);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (disposed || lost) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    // If the GPU drops the context, fall back to the CSS-screened photos.
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      renderer.current = null;
      setGlReady(false);
    };
    cv.addEventListener('webglcontextlost', onLost);

    r.load(0, slideImgs.current[0] ?? undefined)
      .then(() => {
        if (disposed || lost) return;
        r.render(performance.now());
        setGlReady(true);
        heroReady();
        kick();
        // Warm the remaining scenes in the background.
        heroSlides
          .slice(1)
          .forEach((_, i) =>
            r.load(i + 1, slideImgs.current[i + 1] ?? undefined).catch(() => {})
          );
      })
      .catch((err) => {
        console.warn(
          '[LED hero] First scene failed to load, showing the image fallback.',
          err
        );
        heroReady();
      });

    const ro = new ResizeObserver(() => {
      if (disposed || lost) return;
      r.resize();
      kick();
    });
    ro.observe(cv);

    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      if (visible) kick();
    });
    io.observe(sec);

    // Pointer: cabinets near the cursor lift and tilt (skipped under reduced motion).
    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      r.setPointer(e.clientX, e.clientY, true);
    };
    const onLeave = () => r.leave();
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') onLeave();
    };
    sec.addEventListener('pointermove', onMove);
    sec.addEventListener('pointerleave', onLeave);
    sec.addEventListener('pointerup', onUp);

    // Power-on sweep once the loader hands over.
    const offLoaded = onSiteLoaded(() => {
      setStarted(true);
      if (reduce || disposed) return;
      tl = gsap.timeline({ delay: 0.1 });
      tl.to(r, { intro: 1, duration: 1.6, ease: 'power2.inOut' });
    });

    return () => {
      disposed = true;
      offLoaded();
      tl?.kill();
      gsap.killTweensOf(r);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      sec.removeEventListener('pointermove', onMove);
      sec.removeEventListener('pointerleave', onLeave);
      sec.removeEventListener('pointerup', onUp);
      cv.removeEventListener('webglcontextlost', onLost);
      r.destroy();
      cv.remove();
      if (renderer.current === r) renderer.current = null;
      busy.current = false;
    };
  }, []);

  // --- Intro, after the loader -------------------------------------------
  useEffect(() => {
    const el = content.current;
    if (!el) return;
    let tween: gsap.core.Tween | null = null;
    const off = onSiteLoaded(() => {
      el.querySelectorAll('[data-split]').forEach((s) =>
        s.classList.add('is-in')
      );
      el.querySelectorAll('[data-reveal]').forEach((s) =>
        s.classList.add('is-in')
      );
      // The loader dives into an LED; the wall keeps settling as it comes into view.
      const shown = (window as unknown as { __saanLoaderShown?: boolean })
        .__saanLoaderShown;
      if (
        shown &&
        zoomWrap.current &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        tween = gsap.fromTo(
          zoomWrap.current,
          { scale: 1.45 },
          { scale: 1, duration: 2, ease: 'expo.out' }
        );
      }
    });
    return () => {
      off();
      tween?.kill();
    };
  }, []);

  // --- Scroll: the wall recedes into a framed screen ---------------------
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.to(frame.current, {
        scale: 0.92,
        borderRadius: 28,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.to(content.current, {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '70% top',
          scrub: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  // --- Slide changes ------------------------------------------------------
  const goTo = useCallback(async (i: number) => {
    const r = renderer.current;
    if (busy.current) return;
    const advance = () => {
      setSlide((s) => ({ index: i, prev: s.index }));
      setCycle((c) => c + 1);
    };
    if (!r) return advance(); // image fallback: CSS cross-fade
    busy.current = true;
    try {
      // Words and wall change together, so wait for the scene before switching.
      await r.load(i, slideImgs.current[i] ?? undefined);
    } catch {
      busy.current = false;
      advance(); // keep the story moving even if one scene is missing
      return;
    }
    if (renderer.current !== r) {
      busy.current = false;
      return;
    }
    advance();
    r.prepare(i);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      r.progress = 1;
      r.commit();
      r.render(performance.now());
      busy.current = false;
      return;
    }
    // Each cabinet eases its own flip; the wave itself runs at a steady pace.
    gsap.to(r, {
      progress: 1,
      duration: 2.1,
      ease: 'none',
      onComplete: () => {
        r.commit();
        busy.current = false;
      },
    });
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setTimeout(
      () => goTo((index + 1) % heroSlides.length),
      SLIDE_MS
    );
    return () => clearTimeout(id);
  }, [index, started, cycle, goTo]);

  return (
    <section
      ref={section}
      data-reveal-manual
      data-hero
      aria-label="Introduction"
      className="relative h-[100dvh] min-h-[620px] w-full overflow-hidden bg-ink-950"
    >
      <div
        ref={frame}
        className="absolute inset-0 origin-top overflow-hidden will-change-transform"
      >
        <div ref={zoomWrap} className="absolute inset-0 will-change-transform">
          {/* Photos: texture sources for the LED wall, and an LED-screened fallback without WebGL. */}
          <div
            aria-hidden
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              glReady ? 'opacity-0' : 'opacity-100'
            )}
          >
            {heroSlides.map((s, i) => (
              <Image
                key={s.image}
                ref={(el) => {
                  slideImgs.current[i] = el;
                }}
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
                sizes="100vw"
                className={cn(
                  'object-cover transition-opacity duration-1000 [filter:grayscale(1)_sepia(0.7)_saturate(2.1)_hue-rotate(-4deg)_contrast(1.1)]',
                  i === index ? 'opacity-80' : 'opacity-0'
                )}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at center, transparent 2.4px, rgb(8 9 11) 3.4px)',
                backgroundSize: '9px 9px',
              }}
            />
          </div>
          <div
            ref={canvasHost}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              glReady ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent md:hidden" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/85 to-transparent" />
      </div>

      <div
        ref={content}
        className="container-x pointer-events-none relative z-10 flex h-full flex-col justify-end pb-[clamp(2.5rem,9vh,6rem)]"
      >
        <p
          data-reveal="fade"
          style={{ ['--d' as string]: 100 }}
          className="label mb-6 text-signal-400"
        >
          Enterprise AV &amp; Unified Communications
        </p>
        <h1
          className="display max-w-[14ch] text-[clamp(3.1rem,8.6vw,9rem)] leading-[1.02] text-fog-50"
          aria-label={`Spaces that ${heroSlides.map((s) => s.word.replace('.', '')).join(', ')}.`}
        >
          <span data-split="" aria-hidden className="block">
            <span className="w">
              <span style={{ ['--i' as string]: 0 }}>Spaces</span>
            </span>{' '}
            <span className="w">
              <span style={{ ['--i' as string]: 1 }}>that</span>
            </span>
          </span>
          <span
            aria-hidden
            className="relative -mt-[0.04em] grid overflow-hidden pb-[0.14em]"
          >
            {heroSlides.map((s, i) => (
              <span
                key={s.word}
                className={cn(
                  'col-start-1 row-start-1 italic text-signal-500',
                  !started && 'opacity-0',
                  started &&
                    i === index &&
                    'animate-[word-in_1.1s_var(--ease-out-expo)_0.25s_both]',
                  started &&
                    i === slide.prev &&
                    'animate-[word-out_0.8s_var(--ease-out-expo)_both]',
                  started && i !== index && i !== slide.prev && 'opacity-0'
                )}
              >
                {s.word}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p
              data-reveal
              style={{ ['--d' as string]: 450 }}
              className="text-[clamp(1.02rem,1.3vw,1.2rem)] leading-relaxed text-fog-200"
            >
              SAAN designs, integrates and supports boardrooms, video walls, pro
              audio and smart classrooms for enterprises across India.
            </p>
            <div
              data-reveal
              style={{ ['--d' as string]: 600 }}
              className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button href={PRIMARY_CTA.href} size="lg">
                  {PRIMARY_CTA.label}
                </Button>
              </Magnetic>
              <Button href="/solutions" variant="ghost" size="lg">
                Explore solutions
              </Button>
            </div>
          </div>

          <div
            data-reveal="fade"
            style={{ ['--d' as string]: 800 }}
            className="pointer-events-auto hidden gap-2 md:flex"
            role="tablist"
            aria-label="Scenes"
          >
            {heroSlides.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => i !== index && goTo(i)}
                className="group w-28 text-left lg:w-32"
              >
                <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/15">
                  <span
                    key={`${i}-${cycle}-${i === index}`}
                    className={cn(
                      'absolute inset-0 origin-left bg-signal-500',
                      i === index && started
                        ? 'animate-[fill_linear_forwards]'
                        : 'scale-x-0'
                    )}
                    style={
                      i === index && started
                        ? { animationDuration: `${SLIDE_MS}ms` }
                        : undefined
                    }
                  />
                </span>
                <span
                  className={cn(
                    'mt-3 block text-sm transition-colors',
                    i === index
                      ? 'text-fog-50'
                      : 'text-fog-500 group-hover:text-fog-200'
                  )}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
