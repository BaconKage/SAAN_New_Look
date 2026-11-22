import type { IconProps } from '@phosphor-icons/react';
import {
  ArmchairIcon,
  ArrowsClockwiseIcon,
  BlueprintIcon,
  BroadcastIcon,
  CalendarCheckIcon,
  ChalkboardTeacherIcon,
  ChartLineUpIcon,
  ClipboardTextIcon,
  CloudIcon,
  CpuIcon,
  DeskIcon,
  EarIcon,
  FilmStripIcon,
  FrameCornersIcon,
  GlobeIcon,
  GridFourIcon,
  HandTapIcon,
  HardDrivesIcon,
  LaptopIcon,
  LifebuoyIcon,
  LightbulbIcon,
  LightningIcon,
  MicrophoneIcon,
  MonitorIcon,
  PlayCircleIcon,
  PlugsIcon,
  PresentationIcon,
  ProjectorScreenIcon,
  ScreencastIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SpeakerHifiIcon,
  SquaresFourIcon,
  StudentIcon,
  UsersThreeIcon,
  VideoCameraIcon,
  WallIcon,
  WaveformIcon,
  WrenchIcon,
} from '@phosphor-icons/react/ssr';

import { type IconKey } from '@/content/solutions';

const map = {
  video: VideoCameraIcon,
  monitor: MonitorIcon,
  microphone: MicrophoneIcon,
  speaker: SpeakerHifiIcon,
  calendar: CalendarCheckIcon,
  cast: ScreencastIcon,
  touch: HandTapIcon,
  cable: PlugsIcon,
  grid: SquaresFourIcon,
  cpu: CpuIcon,
  wrench: WrenchIcon,
  shield: ShieldCheckIcon,
  chalkboard: ChalkboardTeacherIcon,
  broadcast: BroadcastIcon,
  sliders: SlidersHorizontalIcon,
  lightning: LightningIcon,
  users: UsersThreeIcon,
  chart: ChartLineUpIcon,
  waveform: WaveformIcon,
  tiles: GridFourIcon,
  armchair: ArmchairIcon,
  desk: DeskIcon,
  wall: WallIcon,
  blueprint: BlueprintIcon,
  cloud: CloudIcon,
  laptop: LaptopIcon,
  lightbulb: LightbulbIcon,
  student: StudentIcon,
  presentation: PresentationIcon,
  film: FilmStripIcon,
  server: HardDrivesIcon,
  play: PlayCircleIcon,
  projector: ProjectorScreenIcon,
  ear: EarIcon,
  refresh: ArrowsClockwiseIcon,
  clipboard: ClipboardTextIcon,
  lifebuoy: LifebuoyIcon,
  frame: FrameCornersIcon,
  globe: GlobeIcon,
} satisfies Record<IconKey, unknown>;

/**
 * A Phosphor icon by key. Extra SVG props pass through, so it can also be
 * placed inside an SVG diagram with x, y and size.
 */
export function Icon({
  name,
  weight = 'light',
  ...props
}: { name: IconKey } & IconProps) {
  const C = map[name];
  return <C weight={weight} {...props} />;
}
