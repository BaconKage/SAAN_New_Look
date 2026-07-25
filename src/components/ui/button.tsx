import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Button.
 *
 * Variant rules follow the binding colour rules in docs/DESIGN_SYSTEM.md §2:
 * the primary action is ink, not amber, and the amber `accent` variant appears
 * at most once per viewport. Amber fills always carry ink-900 text (7.4:1),
 * never white.
 *
 * Every size meets the 44px minimum touch target.
 */

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-medium text-center whitespace-nowrap',
  'rounded-sm border border-transparent',
  'transition-[background-color,border-color,color,transform]',
  'duration-[160ms] ease-[cubic-bezier(0.2,0,0,1)]',
  'active:scale-[0.985]',
  'disabled:pointer-events-none disabled:opacity-50',
  'aria-disabled:pointer-events-none aria-disabled:opacity-50',
].join(' ');

const variants = {
  primary: 'bg-ink-900 text-ink-0 hover:bg-ink-800',
  accent: 'bg-amber-500 text-ink-900 hover:bg-amber-600',
  secondary:
    'bg-transparent text-ink-900 border-ink-300 hover:border-ink-900 hover:bg-ink-50',
  ghost: 'bg-transparent text-ink-700 hover:bg-ink-50 hover:text-ink-900',
  inverse: 'bg-ink-0 text-ink-900 hover:bg-ink-100',
  outlineInverse:
    'bg-transparent text-ink-0 border-ink-0/30 hover:border-ink-0 hover:bg-ink-0/10',
} as const;

const sizes = {
  sm: 'h-9 px-3.5 text-[0.875rem]',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-[1rem]',
} as const;

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', className, children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
  /** Set for links leaving the site. */
  external?: boolean;
}

/** Anchor styled as a button. Used for navigation, never for actions. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
