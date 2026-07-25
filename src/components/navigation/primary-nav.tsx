'use client';

import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { primaryCta, primaryNavigation } from '@/config/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export interface NavPanelItem {
  slug: string;
  label: string;
  href: string;
  outcome: string;
  icon: string;
}

export type NavPanels = Record<string, NavPanelItem[]>;

interface PrimaryNavProps {
  panels: NavPanels;
  salesPhoneHref: string;
  salesPhoneLabel: string;
}

/**
 * Primary navigation: desktop mega-panels and the mobile drawer.
 *
 * Accessibility decisions worth noting:
 *
 *  - Panels open on click AND keyboard, never on hover alone. Hover is a
 *    convenience layer on top, so nothing is reachable only by pointer.
 *  - Escape closes the open panel and returns focus to its trigger.
 *  - The mobile drawer traps focus, locks body scroll and restores focus to
 *    the toggle on close.
 *  - The panel trigger is a <button> with aria-expanded/aria-controls; the
 *    section's own link is a separate <Link>, so "go to Solutions" and "see
 *    what is under Solutions" are two distinct, individually reachable actions.
 */
export function PrimaryNav({
  panels,
  salesPhoneHref,
  salesPhoneLabel,
}: PrimaryNavProps) {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerId = useId();

  // Route change closes everything.
  //
  // Adjusted during render rather than in an effect — React's documented
  // pattern for resetting state when a prop changes. An effect would run a
  // frame later, so the drawer would briefly stay open over the new page.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpenPanel(null);
    setMobileOpen(false);
  }

  /**
   * Closes the open panel and cancels any pending hover-open.
   *
   * Cancelling the timer is essential, not tidiness: hovering arms a 90ms
   * timer, so a visitor who moves onto the trigger and immediately closes the
   * panel — by clicking, pressing Escape, or clicking away — would otherwise
   * see it spring back open when that timer fires.
   */
  const closePanel = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpenPanel(null);
  }, []);

  // Escape closes the desktop panel and restores focus to its trigger.
  useEffect(() => {
    if (openPanel === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(
        `[data-panel-trigger="${openPanel}"]`
      );
      closePanel();
      trigger?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) closePanel();
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openPanel, closePanel]);

  // Mobile drawer: scroll lock, Escape, and a focus trap.
  useEffect(() => {
    if (!mobileOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || drawerRef.current === null) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (first === undefined || last === undefined) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  const openWithHover = useCallback((panel: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenPanel(panel), 90);
  }, []);

  const cancelHover = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ---------------------------------------------------- desktop ---- */}
      <nav
        ref={navRef}
        aria-label="Primary"
        className="hidden lg:flex lg:items-center lg:gap-1"
        onMouseLeave={closePanel}
      >
        {primaryNavigation.map((item) => {
          const items = item.panel ? panels[item.panel] : undefined;
          const hasPanel = items !== undefined && items.length > 0;
          const expanded = openPanel === item.panel;

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() =>
                hasPanel && item.panel ? openWithHover(item.panel) : undefined
              }
              onMouseLeave={cancelHover}
            >
              <span className="flex items-center">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-sm px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-[160ms]',
                    isActive(item.href)
                      ? 'text-ink-900'
                      : 'text-ink-600 hover:text-ink-900'
                  )}
                >
                  {item.label}
                </Link>

                {hasPanel && item.panel ? (
                  <button
                    type="button"
                    data-panel-trigger={item.panel}
                    aria-expanded={expanded}
                    aria-controls={`${drawerId}-${item.panel}`}
                    /* Stable accessible name. `aria-expanded` already conveys
                       open/closed, so flipping the label between "Show" and
                       "Hide" would announce the state twice. */
                    aria-label={`${item.label} menu`}
                    onClick={() => {
                      // Cancel the pending hover-open first, or it reopens the
                      // panel the visitor just closed.
                      if (hoverTimer.current) clearTimeout(hoverTimer.current);
                      setOpenPanel(expanded ? null : (item.panel ?? null));
                    }}
                    className="-ml-1.5 grid size-7 place-items-center rounded-sm text-ink-500 transition-colors hover:text-ink-900"
                  >
                    <ChevronDown
                      width={14}
                      height={14}
                      strokeWidth={2}
                      className={cn(
                        'transition-transform duration-[160ms]',
                        expanded && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : null}
              </span>

              {hasPanel && item.panel ? (
                <div
                  id={`${drawerId}-${item.panel}`}
                  hidden={!expanded}
                  className="absolute left-1/2 top-full z-50 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                >
                  <div className="rounded-lg border border-ink-200 bg-ink-0 p-3 shadow-lg">
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {items.map((entry) => (
                        <li key={entry.slug}>
                          <Link
                            href={entry.href}
                            onClick={() =>
                              track({
                                name: 'solution_selected',
                                slug: entry.slug,
                              })
                            }
                            className="group flex gap-3 rounded-md p-3 transition-colors duration-[160ms] hover:bg-ink-50"
                          >
                            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-md border border-ink-200 bg-ink-25 text-amber-700 transition-colors group-hover:border-amber-300 group-hover:bg-amber-50">
                              <Icon name={entry.icon} size="sm" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.9375rem] font-medium text-ink-900">
                                {entry.label}
                              </span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                                {entry.outcome}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-2 flex items-center justify-between gap-4 border-t border-ink-100 px-3 pt-3">
                      <p className="text-[0.8125rem] text-ink-500">
                        Not sure which fits? We will work it out with you.
                      </p>
                      <Link
                        href={primaryCta.href}
                        className="shrink-0 text-[0.8125rem] font-medium text-amber-700 underline underline-offset-4 hover:text-amber-800"
                      >
                        {primaryCta.label}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {/* ------------------------------------------------ desktop CTAs ---- */}
      <div className="hidden items-center gap-2 lg:flex">
        <a
          href={salesPhoneHref}
          onClick={() => track({ name: 'phone_click', location: 'header' })}
          className="inline-flex h-11 items-center gap-2 rounded-sm px-3 text-[0.9375rem] font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
        >
          <Phone width={16} height={16} strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">Call SAAN on </span>
          <span data-numeric>{salesPhoneLabel}</span>
        </a>
        <ButtonLink href={primaryCta.href} variant="primary">
          {primaryCta.label}
        </ButtonLink>
      </div>

      {/* ------------------------------------------------------- mobile --- */}
      <button
        ref={mobileToggleRef}
        type="button"
        aria-expanded={mobileOpen}
        aria-controls={drawerId}
        onClick={() => setMobileOpen((open) => !open)}
        className="-mr-2 grid size-11 place-items-center rounded-sm text-ink-800 transition-colors hover:bg-ink-50 lg:hidden"
      >
        {mobileOpen ? (
          <X width={22} height={22} strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Menu width={22} height={22} strokeWidth={1.75} aria-hidden="true" />
        )}
        <span className="sr-only">
          {mobileOpen ? 'Close menu' : 'Open menu'}
        </span>
      </button>

      {mobileOpen ? (
        <div
          id={drawerId}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 overflow-y-auto overscroll-contain border-t border-ink-200 bg-ink-0 lg:hidden"
        >
          <nav aria-label="Primary mobile" className="container-content py-6">
            <ul className="divide-y divide-ink-100">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[3.25rem] items-center text-[1.0625rem] font-medium transition-colors',
                      isActive(item.href) ? 'text-amber-700' : 'text-ink-900'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink
                href={primaryCta.href}
                variant="accent"
                size="lg"
                className="w-full"
              >
                {primaryCta.label}
              </ButtonLink>
              <a
                href={salesPhoneHref}
                onClick={() =>
                  track({ name: 'phone_click', location: 'mobile-menu' })
                }
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-sm border border-ink-300 text-[1rem] font-medium text-ink-900"
              >
                <Phone
                  width={18}
                  height={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span data-numeric>{salesPhoneLabel}</span>
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
