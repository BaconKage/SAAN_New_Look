import {
  ArmchairIcon,
  BlueprintIcon,
  BroadcastIcon,
  DeskIcon,
  GridFourIcon,
  WallIcon,
  WaveformIcon,
  PlugsIcon,
  CalendarCheckIcon,
  ChalkboardTeacherIcon,
  ChartLineUpIcon,
  CpuIcon,
  LightningIcon,
  MicrophoneIcon,
  MonitorIcon,
  ScreencastIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SpeakerHifiIcon,
  SquaresFourIcon,
  HandTapIcon,
  UsersThreeIcon,
  VideoCameraIcon,
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
} satisfies Record<IconKey, unknown>;

export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const C = map[name];
  return <C className={className} weight="light" />;
}
