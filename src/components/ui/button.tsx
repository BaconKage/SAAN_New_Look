import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'light';

const styles: Record<Variant, { base: string; dot: string }> = {
  primary: {
    base: 'bg-signal-500 text-ink-950 hover:bg-signal-400',
    dot: 'bg-ink-950 text-signal-400',
  },
  ghost: {
    base: 'border border-white/15 text-fog-50 hover:border-white/30 hover:bg-white/[0.04] backdrop-blur-md',
    dot: 'bg-white/10 text-fog-50',
  },
  light: {
    base: 'bg-fog-50 text-ink-950 hover:bg-white',
    dot: 'bg-ink-950 text-fog-50',
  },
};

interface ButtonProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  className?: string;
  size?: 'md' | 'lg';
}

/** Pill button with a rotating arrow. One shape rule: buttons are always pills. */
export function Button({ variant = 'primary', className, children, size = 'md', ...props }: ButtonProps) {
  const s = styles[variant];
  return (
    <Link
      {...props}
      className={cn(
        'group/btn relative inline-flex select-none items-center gap-3 whitespace-nowrap rounded-full font-medium transition-colors duration-300 active:scale-[0.98]',
        size === 'lg' ? 'h-14 pl-7 pr-2 text-base' : 'h-12 pl-6 pr-1.5 text-[0.95rem]',
        s.base,
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'relative grid place-items-center overflow-hidden rounded-full',
          size === 'lg' ? 'size-10' : 'size-9',
          s.dot,
        )}
      >
        <ArrowUpRightIcon
          weight="bold"
          className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-6 group-hover/btn:-translate-y-6"
        />
        <ArrowUpRightIcon
          weight="bold"
          className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
        />
      </span>
    </Link>
  );
}

/** Text link with an underline that draws in on hover. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        'group/tl inline-flex items-center gap-2 font-medium text-fog-50',
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-signal-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:origin-left group-hover/tl:scale-x-100" />
      </span>
      <ArrowUpRightIcon weight="bold" className="size-4 text-signal-500 transition-transform duration-300 group-hover/tl:translate-x-0.5 group-hover/tl:-translate-y-0.5" />
    </Link>
  );
}
