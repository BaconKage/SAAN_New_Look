'use client';

import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { getLenis } from '@/components/motion/smooth-scroll';
import { Button } from '@/components/ui/button';
import { PRIMARY_CTA, nav, site, telLink } from '@/content/site';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Solid background after leaving the top; hide on scroll down, show on scroll up.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 24);
        setHidden(self.direction === 1 && y > 320);
      },
    });
    return () => st.kill();
  }, []);

  // Close menus when the route changes (state adjusted during render, per React docs).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const solid = scrolled || megaOpen;

  return (
    <>
      <header
        ref={ref}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-[var(--ease-out-expo)]',
          hidden && !megaOpen && !menuOpen
            ? '-translate-y-full'
            : 'translate-y-0'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 border-b transition-colors duration-500',
            megaOpen
              ? 'border-white/[0.07] bg-ink-950/[0.97] backdrop-blur-xl'
              : solid
                ? 'border-white/[0.07] bg-ink-950/75 backdrop-blur-xl'
                : 'border-transparent bg-transparent'
          )}
        />
        <div className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="SAAN Protocol Experts home"
            className="relative z-10"
            onClick={(e) => {
              // Already home: Next.js would do nothing, so glide back to the top instead.
              if (pathname === '/') {
                e.preventDefault();
                setMenuOpen(false);
                const lenis = getLenis();
                if (lenis) lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Logo />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {nav.map((item) =>
              item.label === 'Solutions' ? (
                <div
                  key={item.href}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onFocus={openMega}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-[0.95rem] transition-colors',
                      isActive(item.href)
                        ? 'text-fog-50'
                        : 'text-fog-400 hover:text-fog-50'
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && <ActiveDot />}
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-[0.95rem] transition-colors',
                    isActive(item.href)
                      ? 'text-fog-50'
                      : 'text-fog-400 hover:text-fog-50'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <ActiveDot />}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={telLink}
              className="hidden font-mono text-sm text-fog-400 transition-colors hover:text-fog-50 xl:block"
            >
              {site.phone.display}
            </a>
            <Button href={PRIMARY_CTA.href} className="hidden sm:inline-flex">
              {PRIMARY_CTA.label}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative z-10 grid size-12 place-items-center rounded-full border border-white/15 text-fog-50 transition-colors hover:bg-white/5 lg:hidden"
            >
              {menuOpen ? (
                <XIcon className="size-5" />
              ) : (
                <ListIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          className={cn(
            'absolute inset-x-0 top-full hidden origin-top border-b border-white/[0.07] bg-ink-950/[0.97] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out-expo)] lg:block',
            megaOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0'
          )}
        >
          <div className="container-x grid grid-cols-12 gap-10 py-10">
            <div className="col-span-7 grid grid-cols-2 gap-x-8 gap-y-1">
              {solutions.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  onMouseEnter={() => setPreview(i)}
                  onFocus={() => setPreview(i)}
                  className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <span>
                    <span className="block text-[1.05rem] text-fog-50">
                      {s.title}
                    </span>
                    <span className="mt-1 line-clamp-1 text-sm text-fog-500">
                      {s.line}
                    </span>
                  </span>
                  <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-signal-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
            <div className="relative col-span-5 overflow-hidden rounded-[var(--radius-card)]">
              {solutions.map((s, i) => (
                <Image
                  key={s.slug}
                  src={s.image}
                  alt=""
                  fill
                  sizes="40vw"
                  className={cn(
                    'object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]',
                    preview === i
                      ? 'scale-100 opacity-100'
                      : 'scale-105 opacity-0'
                  )}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <p className="max-w-[24ch] text-lg leading-snug text-fog-50">
                  {solutions[preview]?.title}
                </p>
                <Link
                  href="/solutions"
                  className="text-sm text-fog-200 underline-offset-4 hover:underline"
                >
                  All solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-[39] flex flex-col bg-ink-950 pt-[var(--header-h)] transition-[clip-path] duration-700 ease-[var(--ease-in-out-quart)] lg:hidden',
          menuOpen
            ? '[clip-path:inset(0_0_0_0)]'
            : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="led-field pointer-events-none absolute inset-0 opacity-40" />
        <nav
          aria-label="Mobile"
          className="container-x relative flex flex-1 flex-col justify-center gap-2"
        >
          {[{ label: 'Home', href: '/' }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              className={cn(
                'display text-[clamp(2.6rem,11vw,4.5rem)] transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]',
                isActive(item.href) ? 'text-signal-500' : 'text-fog-50',
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              )}
              style={{
                transitionDelay: menuOpen ? `${150 + i * 60}ms` : '0ms',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="container-x relative flex flex-col gap-4 pb-10">
          <Button
            href={PRIMARY_CTA.href}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className="self-start"
          >
            {PRIMARY_CTA.label}
          </Button>
          <a
            href={telLink}
            tabIndex={menuOpen ? 0 : -1}
            className="font-mono text-sm text-fog-400"
          >
            {site.phone.display}
          </a>
        </div>
      </div>
    </>
  );
}

function ActiveDot() {
  return (
    <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-signal-500" />
  );
}
