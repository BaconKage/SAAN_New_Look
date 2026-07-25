import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Section and container primitives.
 *
 * Section rhythm is the primary lever for the spacious, premium feel the brief
 * asks for, so vertical spacing is a token choice rather than an ad-hoc
 * utility on each page.
 */

const spacing = {
  sm: 'py-[var(--section-sm)]',
  md: 'py-[var(--section-md)]',
  lg: 'py-[var(--section-lg)]',
  xl: 'py-[var(--section-xl)]',
} as const;

const surfaces = {
  default: 'bg-ink-0 text-ink-900',
  subtle: 'bg-ink-25 text-ink-900',
  tinted: 'bg-amber-50 text-ink-900',
  /**
   * Dark sections are used deliberately — hero, process story, final CTA —
   * never across the whole site. `on-dark` switches the focus ring to amber-400
   * so it clears the background.
   */
  dark: 'bg-ink-950 text-ink-0 on-dark',
} as const;

export interface SectionProps {
  children: ReactNode;
  as?: ElementType;
  spacing?: keyof typeof spacing;
  surface?: keyof typeof surfaces;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
}

export function Section({
  children,
  as: Component = 'section',
  spacing: space = 'lg',
  surface = 'default',
  className,
  id,
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      data-surface={surface === 'dark' ? 'dark' : undefined}
      className={cn(spacing[space], surfaces[surface], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

const widths = {
  prose: 'container-prose',
  content: 'container-content',
  wide: 'container-wide',
} as const;

export function Container({
  children,
  width = 'content',
  className,
}: {
  children: ReactNode;
  width?: keyof typeof widths;
  className?: string;
}) {
  return <div className={cn(widths[width], className)}>{children}</div>;
}

/**
 * Section label.
 *
 * Rendered at 12px, which is permitted only because the content is always
 * duplicated in the adjacent heading — see docs/DESIGN_SYSTEM.md §3.2.
 * Hidden from assistive technology for that reason.
 */
export function Eyebrow({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'inverse';
}) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        'text-eyebrow mb-4 flex items-center gap-2.5',
        tone === 'inverse' ? 'text-amber-400' : 'text-amber-700',
        className
      )}
    >
      <span
        className={cn(
          'inline-block h-px w-6',
          tone === 'inverse' ? 'bg-amber-400/60' : 'bg-amber-600/50'
        )}
      />
      {children}
    </p>
  );
}

/** Section heading block: eyebrow, heading and optional lead paragraph. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  tone = 'default',
  className,
  headingLevel: Heading = 'h2',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
  className?: string;
  headingLevel?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={id}
        className={cn(
          'text-h2',
          tone === 'inverse' ? 'text-ink-0' : 'text-ink-900'
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            'text-body-lg mt-5',
            tone === 'inverse' ? 'text-ink-200' : 'text-ink-600'
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
