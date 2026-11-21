import { cn } from '@/lib/utils';

/**
 * SAAN wordmark: the italic, speed-lined SAAN from the original logo, redrawn in
 * type with the logo's amber gradient so it stays sharp at any size. Replace
 * with the master vector when SAAN supplies one.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className="relative inline-flex items-center">
        <span aria-hidden className="mr-1.5 flex flex-col items-end gap-[3px]">
          <i className="block h-[2.5px] w-3.5 rounded-full bg-[#f2b23a]" />
          <i className="block h-[2.5px] w-6 rounded-full bg-signal-500" />
          <i className="block h-[2.5px] w-2.5 rounded-full bg-[#c97600]" />
        </span>
        <span
          className="bg-gradient-to-b from-[#f7bd45] via-[#e8920a] to-[#cf7800] bg-clip-text pr-1 text-[1.65rem] font-black italic leading-none tracking-[-0.045em] text-transparent"
          style={{ fontStretch: '125%' }}
        >
          SAAN
        </span>
      </span>
      {!compact && (
        <span className="hidden border-l border-white/15 pl-3 font-mono text-[0.6rem] uppercase leading-[1.3] tracking-[0.12em] text-fog-400 sm:block">
          Protocol
          <br />
          Experts
        </span>
      )}
      <span className="sr-only">SAAN Protocol Experts</span>
    </span>
  );
}
