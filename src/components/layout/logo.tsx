import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/**
 * SAAN wordmark.
 *
 * Set in type rather than as an image, deliberately: the only logo asset
 * available is a 610x78 PNG whose strapline contains a typo ("Aligining").
 * Rendering the wordmark in type keeps it crisp at every size, adds no image
 * request to the LCP path, and avoids reproducing the error. It is replaced by
 * the real vector as soon as SAAN supplies it — docs/CONTENT_TODO.md §3.1.
 */
export function Logo({
  tone = 'default',
  className,
}: {
  tone?: 'default' | 'inverse';
  className?: string;
}) {
  return (
    <span
      className={cn('inline-flex items-baseline gap-2', className)}
      aria-hidden="true"
    >
      <span
        className={cn(
          'text-[1.375rem] font-bold leading-none tracking-[-0.04em]',
          tone === 'inverse' ? 'text-ink-0' : 'text-ink-900'
        )}
      >
        {siteConfig.displayName}
      </span>
      <span
        className={cn(
          'h-[0.5rem] w-[0.5rem] shrink-0 rounded-[1px]',
          tone === 'inverse' ? 'bg-amber-400' : 'bg-amber-500'
        )}
      />
    </span>
  );
}
