import {
  AudioLines,
  Building2,
  CalendarCheck,
  CircuitBoard,
  ConciergeBell,
  Factory,
  GraduationCap,
  Grid2x2,
  HardHat,
  Headset,
  HeartPulse,
  Landmark,
  LifeBuoy,
  MessageSquareText,
  MonitorPlay,
  PencilRuler,
  Presentation,
  Projector,
  RefreshCw,
  Ruler,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Icon registry.
 *
 * Content data carries a string key, never a React component, so the same data
 * works unchanged when it moves into the CMS. Icons are imported individually
 * so the bundle contains only what is used.
 */
const registry = {
  'audio-lines': AudioLines,
  'building-2': Building2,
  'calendar-check': CalendarCheck,
  'circuit-board': CircuitBoard,
  'concierge-bell': ConciergeBell,
  factory: Factory,
  'graduation-cap': GraduationCap,
  'grid-2x2': Grid2x2,
  'hard-hat': HardHat,
  headset: Headset,
  'heart-pulse': HeartPulse,
  landmark: Landmark,
  'life-buoy': LifeBuoy,
  'message-square-text': MessageSquareText,
  'monitor-play': MonitorPlay,
  'pencil-ruler': PencilRuler,
  presentation: Presentation,
  projector: Projector,
  'refresh-cw': RefreshCw,
  ruler: Ruler,
  search: Search,
  'shopping-bag': ShoppingBag,
  'sliders-horizontal': SlidersHorizontal,
  users: Users,
} as const satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof registry;

export function isIconKey(value: string): value is IconKey {
  return value in registry;
}

const sizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

interface IconProps {
  name: string;
  size?: keyof typeof sizes;
  className?: string;
}

/**
 * Icons are always decorative here: every one sits beside a text label, so
 * announcing it would duplicate the label for screen-reader users.
 */
export function Icon({ name, size = 'md', className }: IconProps) {
  if (!isIconKey(name)) return null;

  const Component = registry[name];
  const pixels = sizes[size];

  return (
    <Component
      width={pixels}
      height={pixels}
      strokeWidth={pixels <= 24 ? 1.5 : 1.75}
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    />
  );
}
