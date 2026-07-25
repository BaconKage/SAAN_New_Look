import type { SolutionSummary } from '@/content/schemas';

/**
 * The eight solution areas.
 *
 * Every entry leads with the customer's outcome, not the hardware. This is the
 * central repositioning of the site: the previous version organised 12 of its
 * 27 pages by manufacturer and hardware category.
 *
 * Meta descriptions are 120-155 characters, enforced by the schema.
 */
export const solutions: SolutionSummary[] = [
  {
    slug: 'meeting-and-collaboration-spaces',
    title: 'Meeting and collaboration spaces',
    navLabel: 'Meeting & collaboration',
    outcome: 'Rooms that connect first time, every time.',
    summary:
      'Boardrooms, huddle rooms, training rooms and conference halls designed around how your teams actually meet. We specify the camera, audio and control layer together so the room behaves consistently, whichever platform you standardise on.',
    icon: 'users',
    highlights: [
      'Microsoft Teams, Zoom and Google Meet room systems',
      'Camera and microphone coverage matched to room geometry',
      'One-touch join and consistent room behaviour',
      'Wireless presentation and BYOD connectivity',
    ],
    image: {
      id: 'SOL-meeting-and-collaboration-spaces-hero',
      src: null,
      alt: 'A meeting room during a video call, showing the display and camera',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Meeting Room and Conference AV Solutions | SAAN',
      metaDescription:
        'SAAN designs and integrates meeting room, boardroom and conference AV systems for Teams, Zoom and Meet, from analysis to commissioning and support.',
    },
    order: 1,
  },
  {
    slug: 'digital-signage',
    title: 'Digital signage and content management',
    navLabel: 'Digital signage',
    outcome: 'The right message, on every screen, from one place.',
    summary:
      'Signage networks that stay current because publishing is genuinely simple. We design the display layer, the player strategy and the content management system together, then hand over a workflow your team can run without us.',
    icon: 'monitor-play',
    highlights: [
      'Cloud and on-premise content management',
      'Scheduled, zoned and rule-based content',
      'Multi-site deployment and remote monitoring',
      'Wayfinding, queue and information displays',
    ],
    image: {
      id: 'SOL-digital-signage-hero',
      src: null,
      alt: 'A multi-screen digital signage deployment in a building lobby',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Digital Signage Solutions and CMS | SAAN',
      metaDescription:
        'Digital signage design, supply, installation and content management from SAAN. Multi-site networks, remote monitoring and a workflow your team can run.',
    },
    order: 2,
  },
  {
    slug: 'led-and-video-walls',
    title: 'LED and video walls',
    navLabel: 'LED & video walls',
    outcome: 'Large-format visuals engineered for the room they sit in.',
    summary:
      'Direct-view LED and LCD video walls specified against viewing distance, ambient light and content type rather than a headline pixel pitch. We handle structure, power, processing, calibration and serviceability.',
    icon: 'grid-2x2',
    highlights: [
      'Direct-view LED for lobbies, auditoriums and control rooms',
      'LCD video walls where bezel tolerance allows',
      'Pixel pitch selected against real viewing distance',
      'Structural, power and heat-load coordination',
    ],
    image: {
      id: 'SOL-led-and-video-walls-hero',
      src: null,
      alt: 'A direct-view LED wall displaying live content at scale',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'LED Walls and Video Wall Installation | SAAN',
      metaDescription:
        'SAAN designs and installs direct-view LED and LCD video walls, covering pixel pitch selection, processing, structure, calibration and serviceability.',
    },
    order: 3,
  },
  {
    slug: 'professional-audio-and-auditoriums',
    title: 'Professional audio and auditoriums',
    navLabel: 'Professional audio',
    outcome: 'Every seat hears the same thing, clearly.',
    summary:
      'Auditoriums, banquet halls, training theatres and worship spaces where intelligibility matters more than loudness. We design coverage against the room acoustic, then commission and tune the system on site.',
    icon: 'audio-lines',
    highlights: [
      'Loudspeaker coverage designed against room acoustics',
      'Digital mixing, processing and preset management',
      'Wired and wireless microphone systems',
      'On-site tuning and measured commissioning',
    ],
    image: {
      id: 'SOL-professional-audio-and-auditoriums-hero',
      src: null,
      alt: 'An auditorium showing the installed loudspeaker system',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Auditorium and Professional Audio Systems | SAAN',
      metaDescription:
        'Professional audio design and installation for auditoriums, halls and training theatres. Coverage designed to the room acoustic, then tuned on site.',
    },
    order: 4,
  },
  {
    slug: 'interactive-learning-spaces',
    title: 'Interactive learning spaces',
    navLabel: 'Interactive learning',
    outcome: 'Classrooms teachers actually use, from the first week.',
    summary:
      'Interactive panels, lecture capture and hybrid teaching systems for schools, colleges and corporate training. We plan mounting height, sightlines, audio and teacher training together, because a panel nobody is confident with gets switched off.',
    icon: 'presentation',
    highlights: [
      'Interactive flat panels and teaching displays',
      'Hybrid and remote teaching set-ups',
      'Lecture capture and recording',
      'Teacher training built into handover',
    ],
    image: {
      id: 'SOL-interactive-learning-spaces-hero',
      src: null,
      alt: 'A classroom with an interactive display panel in use',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Interactive Classroom and Learning Technology | SAAN',
      metaDescription:
        'Interactive panels, lecture capture and hybrid teaching systems for schools, colleges and training centres, with teacher training built into handover.',
    },
    order: 5,
  },
  {
    slug: 'commercial-displays-and-projection',
    title: 'Commercial displays and projection',
    navLabel: 'Displays & projection',
    outcome: 'Display technology chosen for the room, not the price list.',
    summary:
      'Professional displays and projection systems specified against ambient light, viewing distance, duty cycle and content. Sometimes a projector is right, sometimes it is not — we will tell you which, and why.',
    icon: 'projector',
    highlights: [
      'Commercial-grade displays rated for continuous operation',
      'Laser projection for large-venue and high-ambient spaces',
      'Screen, mounting and sightline design',
      'Honest projector-versus-display guidance',
    ],
    image: {
      id: 'SOL-commercial-displays-and-projection-hero',
      src: null,
      alt: 'A large-venue projection system in a lecture hall',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Commercial Displays and Projection Systems | SAAN',
      metaDescription:
        'Professional display and projection systems specified against ambient light, viewing distance and duty cycle, then installed and supported by SAAN.',
    },
    order: 6,
  },
  {
    slug: 'room-automation-and-control',
    title: 'Room automation and control',
    navLabel: 'Automation & control',
    outcome: 'One button that does the obvious thing.',
    summary:
      'Control systems that make complex rooms simple to operate. We design the interface around how the room is actually used, so a visitor can start a meeting without a manual and facilities can see room status centrally.',
    icon: 'sliders-horizontal',
    highlights: [
      'Touch panel and keypad control interfaces',
      'Source, display, audio and lighting integration',
      'Scheduling and occupancy-aware behaviour',
      'Central room status and remote diagnostics',
    ],
    image: {
      id: 'SOL-room-automation-and-control-hero',
      src: null,
      alt: 'A room control touch panel with the controlled space behind',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'AV Room Automation and Control Systems | SAAN',
      metaDescription:
        'Room control and automation designed around real use: simple interfaces, integrated AV and lighting, scheduling and central room status for facilities.',
    },
    order: 7,
  },
  {
    slug: 'managed-av-services',
    title: 'Managed AV services',
    navLabel: 'Managed AV services',
    outcome: 'Rooms that keep working after the installers leave.',
    summary:
      'Preventive maintenance, remote monitoring, help-desk support and lifecycle planning for estates where downtime is expensive. Scheduled attention rather than reactive call-outs.',
    icon: 'life-buoy',
    highlights: [
      'Scheduled preventive maintenance visits',
      'Remote monitoring and diagnostics',
      'Help-desk and on-site escalation',
      'Lifecycle and refresh planning',
    ],
    image: {
      id: 'SOL-managed-av-services-hero',
      src: null,
      alt: 'An engineer working at an AV equipment rack during a maintenance visit',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Managed AV Services, AMC and Support | SAAN',
      metaDescription:
        'Managed AV services from SAAN: preventive maintenance, remote monitoring, help-desk support and lifecycle planning that keeps installed systems working.',
    },
    order: 8,
  },
];
