import type { IconKey } from './solutions';

/**
 * "Inside a typical system" diagrams, one per solution slug.
 *
 * `ref` is the 1-based number of the matching row in that solution's `system`
 * list, so the diagram and the numbered key below it point at the same thing.
 * Nodes without `ref` are context (the people, content or platforms a system
 * connects to) and are drawn dashed. Keep labels to about 18 characters and
 * subs to about 26 so they fit their boxes.
 */
export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  icon: IconKey;
  ref?: number;
  kind?: 'core' | 'context';
}

export interface FlowDiagram {
  kind: 'flow';
  caption: string;
  /** Left to right on desktop, top to bottom on phones. */
  lanes: { title: string; nodes: DiagramNode[] }[];
  /** Signal flows from the first id to the second. Link adjacent lanes, or neighbours in one lane. */
  links: [string, string][];
}

export interface RoomDiagram {
  kind: 'room';
  caption: string;
  /** Callout labels for refs 1 to 4: walls, ceiling, floor, furniture. */
  labels: [string, string, string, string];
}

export interface CycleDiagram {
  kind: 'cycle';
  caption: string;
  hub: { label: [string, string]; sub: string };
  /** Clockwise from the top. */
  nodes: DiagramNode[];
}

export type SystemDiagram = FlowDiagram | RoomDiagram | CycleDiagram;

export const diagrams: Record<string, SystemDiagram> = {
  boardrooms: {
    kind: 'flow',
    caption:
      'How a boardroom system connects: camera, microphones and wireless sharing feed the room system, which drives the display and connects remote participants.',
    lanes: [
      {
        title: 'Capture & share',
        nodes: [
          {
            id: 'cam',
            label: 'Camera',
            sub: 'Video bar or modular',
            icon: 'video',
            ref: 1,
          },
          {
            id: 'mics',
            label: 'Audio pickup',
            sub: 'Mic pods or ceiling array',
            icon: 'microphone',
            ref: 3,
          },
          {
            id: 'share',
            label: 'Wireless sharing',
            sub: 'ClickShare or app',
            icon: 'cast',
            ref: 5,
          },
        ],
      },
      {
        title: 'Room system',
        nodes: [
          {
            id: 'core',
            label: 'Room system',
            sub: 'Teams · Zoom · Meet',
            icon: 'cpu',
            ref: 1,
            kind: 'core',
          },
          {
            id: 'ctrl',
            label: 'Touch control',
            sub: 'Table panel + door booking',
            icon: 'touch',
            ref: 4,
          },
        ],
      },
      {
        title: 'Present & connect',
        nodes: [
          {
            id: 'disp',
            label: 'Display',
            sub: '65 to 105-inch panel',
            icon: 'monitor',
            ref: 2,
          },
          {
            id: 'far',
            label: 'Remote team',
            sub: 'Joins from anywhere',
            icon: 'globe',
            kind: 'context',
          },
        ],
      },
    ],
    links: [
      ['cam', 'core'],
      ['mics', 'core'],
      ['share', 'core'],
      ['ctrl', 'core'],
      ['core', 'disp'],
      ['core', 'far'],
    ],
  },

  'video-conferencing': {
    kind: 'flow',
    caption:
      'How a video conferencing room connects: microphones and the touch controller feed the room system, which joins the meeting platform, while the door panel books the room through your calendar.',
    lanes: [
      {
        title: 'In the room',
        nodes: [
          {
            id: 'audio',
            label: 'Audio extension',
            sub: 'Extra mic pods or ceiling',
            icon: 'microphone',
            ref: 4,
          },
          {
            id: 'ctrl',
            label: 'Touch controller',
            sub: 'One-touch join',
            icon: 'touch',
            ref: 2,
          },
          {
            id: 'sched',
            label: 'Scheduling panel',
            sub: 'Booking at the door',
            icon: 'calendar',
            ref: 3,
          },
        ],
      },
      {
        title: 'Room system',
        nodes: [
          {
            id: 'core',
            label: 'Room system',
            sub: 'Camera, compute, speakers',
            icon: 'video',
            ref: 1,
            kind: 'core',
          },
        ],
      },
      {
        title: 'Cloud',
        nodes: [
          {
            id: 'platform',
            label: 'Teams or Zoom',
            sub: 'Room accounts & policies',
            icon: 'cloud',
            kind: 'context',
          },
          {
            id: 'cal',
            label: 'Calendar',
            sub: 'Microsoft 365 or Google',
            icon: 'globe',
            kind: 'context',
          },
        ],
      },
    ],
    links: [
      ['audio', 'core'],
      ['ctrl', 'core'],
      ['core', 'platform'],
      ['sched', 'cal'],
    ],
  },

  'led-video-walls': {
    kind: 'flow',
    caption:
      'How a video wall connects: live sources and operator workstations feed the processor, which lays out and drives the LED or LCD wall.',
    lanes: [
      {
        title: 'Sources',
        nodes: [
          {
            id: 'src',
            label: 'Live sources',
            sub: 'PCs, cameras, feeds',
            icon: 'film',
            kind: 'context',
          },
          {
            id: 'infra',
            label: 'Infrastructure',
            sub: 'Switching & workstations',
            icon: 'server',
            ref: 4,
          },
        ],
      },
      {
        title: 'Processing',
        nodes: [
          {
            id: 'proc',
            label: 'Processor',
            sub: 'Scaling & windowing',
            icon: 'cpu',
            ref: 2,
            kind: 'core',
          },
          {
            id: 'ctrl',
            label: 'Control software',
            sub: 'Operator layouts',
            icon: 'sliders',
            ref: 3,
          },
        ],
      },
      {
        title: 'Display',
        nodes: [
          {
            id: 'wall',
            label: 'Video wall',
            sub: 'Fine-pitch LED or LCD',
            icon: 'grid',
            ref: 1,
          },
        ],
      },
    ],
    links: [
      ['src', 'proc'],
      ['infra', 'ctrl'],
      ['ctrl', 'proc'],
      ['proc', 'wall'],
    ],
  },

  'digital-signage': {
    kind: 'flow',
    caption:
      'How a signage network connects: your content and live data go into the content management system, which schedules it to media players driving each display.',
    lanes: [
      {
        title: 'Content',
        nodes: [
          {
            id: 'content',
            label: 'Your content',
            sub: 'Video, menus, notices',
            icon: 'film',
            kind: 'context',
          },
          {
            id: 'data',
            label: 'Live data',
            sub: 'Schedules, feeds, alerts',
            icon: 'globe',
            kind: 'context',
          },
        ],
      },
      {
        title: 'Manage & play',
        nodes: [
          {
            id: 'cms',
            label: 'CMS',
            sub: 'Schedules & playlists',
            icon: 'cloud',
            ref: 2,
            kind: 'core',
          },
          {
            id: 'player',
            label: 'Media player',
            sub: 'Built-in SoC or external',
            icon: 'play',
            ref: 2,
          },
        ],
      },
      {
        title: 'Screens',
        nodes: [
          {
            id: 'disp',
            label: 'Displays',
            sub: 'Sized to distance & light',
            icon: 'monitor',
            ref: 1,
          },
          {
            id: 'mount',
            label: 'Mounting',
            sub: 'Wall, ceiling or kiosk',
            icon: 'frame',
            ref: 3,
          },
        ],
      },
    ],
    links: [
      ['content', 'cms'],
      ['data', 'cms'],
      ['cms', 'player'],
      ['player', 'disp'],
    ],
  },

  'professional-audio': {
    kind: 'flow',
    caption:
      'How a sound system connects: microphones and playback feed the mixer and DSP, which drives the loudspeakers, with acoustic treatment keeping speech clear for the audience.',
    lanes: [
      {
        title: 'Input',
        nodes: [
          {
            id: 'mics',
            label: 'Microphones',
            sub: 'Wireless, lapel, gooseneck',
            icon: 'microphone',
            ref: 3,
          },
          {
            id: 'play',
            label: 'Playback',
            sub: 'Laptops, video, music',
            icon: 'laptop',
            kind: 'context',
          },
        ],
      },
      {
        title: 'Process',
        nodes: [
          {
            id: 'dsp',
            label: 'Mixing & DSP',
            sub: 'Routing, EQ, feedback',
            icon: 'sliders',
            ref: 2,
            kind: 'core',
          },
        ],
      },
      {
        title: 'Room',
        nodes: [
          {
            id: 'spk',
            label: 'Loudspeakers',
            sub: 'Main & fill coverage',
            icon: 'speaker',
            ref: 1,
          },
          {
            id: 'aud',
            label: 'Audience',
            sub: 'Clear to the back row',
            icon: 'ear',
            kind: 'context',
          },
          {
            id: 'acoustics',
            label: 'Acoustics',
            sub: 'Panels, slats, tiles',
            icon: 'waveform',
            ref: 4,
          },
        ],
      },
    ],
    links: [
      ['mics', 'dsp'],
      ['play', 'dsp'],
      ['dsp', 'spk'],
      ['spk', 'aud'],
      ['acoustics', 'aud'],
    ],
  },

  'smart-classrooms': {
    kind: 'flow',
    caption:
      'How a smart classroom connects: the teacher works through the interactive panel, microphone and camera, so students in the room and remote learners both see and hear the lesson.',
    lanes: [
      {
        title: 'Teacher',
        nodes: [
          {
            id: 'teacher',
            label: 'Teacher',
            sub: 'Lesson, voice, board',
            icon: 'presentation',
            kind: 'context',
          },
        ],
      },
      {
        title: 'Classroom system',
        nodes: [
          {
            id: 'panel',
            label: 'Interactive panel',
            sub: 'Touch display + OPS PC',
            icon: 'chalkboard',
            ref: 1,
            kind: 'core',
          },
          {
            id: 'proj',
            label: 'Projection',
            sub: 'For larger halls',
            icon: 'projector',
            ref: 2,
          },
          {
            id: 'audio',
            label: 'Audio',
            sub: 'Teacher mic + speakers',
            icon: 'microphone',
            ref: 3,
          },
          {
            id: 'cap',
            label: 'Capture',
            sub: 'Camera for hybrid lessons',
            icon: 'video',
            ref: 4,
          },
        ],
      },
      {
        title: 'Learners',
        nodes: [
          {
            id: 'room',
            label: 'In the room',
            sub: 'See and hear clearly',
            icon: 'student',
            kind: 'context',
          },
          {
            id: 'remote',
            label: 'Remote learners',
            sub: 'Teams, Zoom, recordings',
            icon: 'globe',
            kind: 'context',
          },
        ],
      },
    ],
    links: [
      ['teacher', 'panel'],
      ['teacher', 'audio'],
      ['teacher', 'cap'],
      ['panel', 'room'],
      ['proj', 'room'],
      ['audio', 'room'],
      ['cap', 'remote'],
    ],
  },

  'acoustics-interiors': {
    kind: 'room',
    caption:
      'A cutaway of a treated seminar hall: acoustic slats and fabric panels on the walls, acoustic ceiling tiles, wooden flooring and tablet-arm seating, with speech from the lectern absorbed instead of echoing.',
    labels: [
      'Wall acoustics',
      'Acoustic ceiling',
      'Flooring',
      'Seating & furniture',
    ],
  },

  'control-automation': {
    kind: 'flow',
    caption:
      'How room control connects: the touch panel and table connectivity feed one control processor, which drives the displays, audio, cameras, lighting and blinds.',
    lanes: [
      {
        title: 'You',
        nodes: [
          {
            id: 'panel',
            label: 'Touch panel',
            sub: 'One-touch scenes',
            icon: 'touch',
            ref: 1,
          },
          {
            id: 'table',
            label: 'Table connectivity',
            sub: 'Laptop pop-up box',
            icon: 'cable',
            ref: 3,
          },
        ],
      },
      {
        title: 'Control',
        nodes: [
          {
            id: 'proc',
            label: 'Control processor',
            sub: 'Logic + switching',
            icon: 'cpu',
            ref: 2,
            kind: 'core',
          },
        ],
      },
      {
        title: 'Room devices',
        nodes: [
          {
            id: 'disp',
            label: 'Displays',
            sub: 'Screens & projectors',
            icon: 'monitor',
            kind: 'context',
          },
          {
            id: 'audio',
            label: 'Audio & DSP',
            sub: 'Levels and presets',
            icon: 'speaker',
            kind: 'context',
          },
          {
            id: 'cams',
            label: 'Cameras',
            sub: 'Presets and tracking',
            icon: 'video',
            kind: 'context',
          },
          {
            id: 'lights',
            label: 'Lights & blinds',
            sub: 'Scenes and shades',
            icon: 'lightbulb',
            kind: 'context',
          },
        ],
      },
    ],
    links: [
      ['panel', 'proc'],
      ['table', 'proc'],
      ['proc', 'disp'],
      ['proc', 'audio'],
      ['proc', 'cams'],
      ['proc', 'lights'],
    ],
  },

  'support-amc': {
    kind: 'cycle',
    caption:
      'The support loop around your installed rooms: preventive visits, updates and tuning, breakdown response and warranty coordination, repeated through the year.',
    hub: {
      label: ['Your installed', 'rooms'],
      sub: 'Every brand, one contact',
    },
    nodes: [
      {
        id: 'pm',
        label: 'Preventive visits',
        sub: 'Scheduled health checks',
        icon: 'calendar',
        ref: 1,
      },
      {
        id: 'upd',
        label: 'Updates & tuning',
        sub: 'Firmware and re-tuning',
        icon: 'refresh',
        ref: 2,
      },
      {
        id: 'fix',
        label: 'Breakdown response',
        sub: 'On call and on site',
        icon: 'lifebuoy',
        ref: 3,
      },
      {
        id: 'oem',
        label: 'Warranty coordination',
        sub: 'OEM cases followed up',
        icon: 'clipboard',
        ref: 4,
      },
    ],
  },
};
