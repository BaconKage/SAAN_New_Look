import type { ExplorerOption } from '@/content/schemas';

/**
 * Interactive solution explorer options.
 *
 * Written from the visitor's starting point — "I need an auditorium" — rather
 * than from a product category. Each option names the problems SAAN genuinely
 * expects to find in that kind of project, which is the most direct way to
 * demonstrate experience without claiming it.
 *
 * No pricing, and no claim that a particular product is always correct.
 */
export const explorerOptions: ExplorerOption[] = [
  {
    id: 'modern-meeting-room',
    label: 'A modern meeting room',
    prompt: 'You want rooms where meetings start on time.',
    icon: 'users',
    solutionSlug: 'meeting-and-collaboration-spaces',
    challenges: [
      'Remote participants cannot hear people at the far end of the table',
      'Every room works slightly differently, so visitors need help to start',
      'Cables and adaptors go missing, and guests cannot share their screen',
    ],
    capabilities: [
      {
        title: 'Coverage designed to the room',
        description:
          'Camera framing and microphone pickup planned against the actual table size and seating, not a generic room-size chart.',
      },
      {
        title: 'One consistent way to join',
        description:
          'The same start experience in every room, on Teams, Zoom or Meet, so nobody has to learn a second system.',
      },
      {
        title: 'Guest and BYOD connectivity',
        description:
          'Wireless presentation and a wired fallback, so a visitor can share within seconds without borrowing an adaptor.',
      },
    ],
    environments: [
      'Boardrooms',
      'Huddle and focus rooms',
      'Training rooms',
      'Executive briefing rooms',
    ],
  },
  {
    id: 'digital-signage-network',
    label: 'A digital-signage network',
    prompt: 'You want one team publishing to many screens.',
    icon: 'monitor-play',
    solutionSlug: 'digital-signage',
    challenges: [
      'Screens show out-of-date content because publishing is too awkward',
      'Nobody knows which displays are offline until someone walks past one',
      'Consumer televisions fail early when run for long hours',
    ],
    capabilities: [
      {
        title: 'A publishing workflow people will actually use',
        description:
          'Content management set up around your approval process, so updating a screen takes minutes rather than a support request.',
      },
      {
        title: 'Displays rated for the duty cycle',
        description:
          'Commercial panels specified for the operating hours, orientation and ambient light of each location.',
      },
      {
        title: 'Central visibility across sites',
        description:
          'Remote monitoring so a failed player or a dark screen is known centrally, not discovered by a customer.',
      },
    ],
    environments: [
      'Reception and lobby',
      'Retail floors',
      'Campus and wayfinding',
      'Cafeteria and menu boards',
    ],
  },
  {
    id: 'auditorium',
    label: 'An auditorium',
    prompt: 'You want every seat to hear clearly.',
    icon: 'audio-lines',
    solutionSlug: 'professional-audio-and-auditoriums',
    challenges: [
      'Speech is loud at the front and unintelligible at the back',
      'Feedback limits how far microphones can be turned up',
      'The room sounds different full than it did during the demonstration',
    ],
    capabilities: [
      {
        title: 'Coverage designed against the acoustic',
        description:
          'Loudspeaker selection and aiming planned for the room shape and surfaces, so intelligibility is even rather than just loud.',
      },
      {
        title: 'Measured commissioning',
        description:
          'The system is tuned and measured on site, and the results are documented — not signed off on a listening test alone.',
      },
      {
        title: 'Operable by non-specialists',
        description:
          'Presets for the ways the room is actually used, so a routine event does not need an audio engineer.',
      },
    ],
    environments: [
      'Auditoriums',
      'Assembly and convocation halls',
      'Banquet halls',
      'Worship spaces',
    ],
  },
  {
    id: 'classroom',
    label: 'A classroom or lecture theatre',
    prompt: 'You want teaching technology that gets used.',
    icon: 'presentation',
    solutionSlug: 'interactive-learning-spaces',
    challenges: [
      'Panels were installed but teachers went back to the whiteboard',
      'Remote students cannot hear questions asked from the back of the room',
      'Mounting height suits the installer, not the person teaching',
    ],
    capabilities: [
      {
        title: 'Designed around the teaching, not the device',
        description:
          'Sightlines, mounting height and reach planned for how the room is taught in, including for shorter teachers and seated students.',
      },
      {
        title: 'Audio that includes the room',
        description:
          'Microphone coverage that picks up student questions, so hybrid sessions work in both directions.',
      },
      {
        title: 'Training as part of handover',
        description:
          'Practical sessions for the teaching staff who will use it daily, because confidence is what determines whether it gets used.',
      },
    ],
    environments: [
      'Classrooms',
      'Lecture theatres',
      'Seminar and tutorial rooms',
      'Computer and language labs',
    ],
  },
  {
    id: 'led-wall',
    label: 'An LED wall',
    prompt: 'You want large-format impact that lasts.',
    icon: 'grid-2x2',
    solutionSlug: 'led-and-video-walls',
    challenges: [
      'Pixel pitch chosen on price, then content looks coarse at real viewing distance',
      'Structure, power and heat load discovered late in the build programme',
      'No practical access for servicing individual modules after handover',
    ],
    capabilities: [
      {
        title: 'Pitch selected against real viewing distance',
        description:
          'Specified for where people will actually stand, so you neither pay for resolution nobody sees nor install a wall that looks coarse.',
      },
      {
        title: 'Coordinated with the building',
        description:
          'Structure, power, ventilation and containment agreed with the other trades before anything is ordered.',
      },
      {
        title: 'Serviceable by design',
        description:
          'Access, spares and calibration planned at design stage, so a single failed module is a short visit rather than a project.',
      },
    ],
    environments: [
      'Lobbies and atriums',
      'Auditorium stages',
      'Control rooms',
      'Retail and exhibition spaces',
    ],
  },
  {
    id: 'video-wall',
    label: 'A video wall',
    prompt: 'You want many sources visible at once.',
    icon: 'grid-2x2',
    solutionSlug: 'led-and-video-walls',
    challenges: [
      'Operators cannot rearrange sources without calling for help',
      'Bezels fall exactly where the important content sits',
      'Displays drift in colour and brightness against each other over time',
    ],
    capabilities: [
      {
        title: 'Layouts built around the operators',
        description:
          'Presets for the ways the wall is genuinely used, recallable in one action during an incident.',
      },
      {
        title: 'Processing matched to the sources',
        description:
          'Signal management specified for the real mix of inputs, resolutions and latency requirements.',
      },
      {
        title: 'Uniformity maintained',
        description:
          'Calibration at commissioning and again at maintenance visits, so the wall still looks like one surface in three years.',
      },
    ],
    environments: [
      'Control and command rooms',
      'Network operations centres',
      'Broadcast and monitoring',
      'Corporate lobbies',
    ],
  },
  {
    id: 'professional-audio',
    label: 'Professional audio',
    prompt: 'You want a system built for speech and music.',
    icon: 'audio-lines',
    solutionSlug: 'professional-audio-and-auditoriums',
    challenges: [
      'Wireless microphones drop out as more channels are added',
      'Volume is adjusted by whoever is nearest the rack',
      'The system was specified for music but is mostly used for speech',
    ],
    capabilities: [
      {
        title: 'Specified for the real programme material',
        description:
          'Designed for how the space is used week to week, not for the most demanding event it will host twice a year.',
      },
      {
        title: 'Managed wireless coordination',
        description:
          'Frequency planning and antenna placement so channel count is reliable rather than optimistic.',
      },
      {
        title: 'Controlled, documented settings',
        description:
          'Locked processing with recallable presets, so the system cannot be gradually detuned by well-meaning adjustment.',
      },
    ],
    environments: [
      'Auditoriums and halls',
      'Conference and banquet spaces',
      'Sports and multipurpose halls',
      'Houses of worship',
    ],
  },
  {
    id: 'room-automation',
    label: 'Room automation and control',
    prompt: 'You want complex rooms to be simple to use.',
    icon: 'sliders-horizontal',
    solutionSlug: 'room-automation-and-control',
    challenges: [
      'Four remote controls and a laminated instruction sheet',
      'Projectors and displays left running overnight',
      'Facilities has no view of which rooms have a fault',
    ],
    capabilities: [
      {
        title: 'Interfaces designed around real use',
        description:
          'The common actions are one touch; the rare ones are still reachable. A visitor should not need to be shown.',
      },
      {
        title: 'Integrated with the room, not just the AV',
        description:
          'Displays, sources, audio, lighting and shades responding together, including scheduled and occupancy-aware behaviour.',
      },
      {
        title: 'Central status and diagnostics',
        description:
          'Room state visible to facilities, so faults and lamp or filter maintenance are known before a user reports them.',
      },
    ],
    environments: [
      'Boardrooms',
      'Divisible conference spaces',
      'Lecture theatres',
      'Executive and VIP rooms',
    ],
  },
  {
    id: 'support-or-upgrade',
    label: 'Support or an upgrade',
    prompt: 'You already have a system and need it to work properly.',
    icon: 'life-buoy',
    solutionSlug: 'managed-av-services',
    challenges: [
      'The original installer is no longer contactable',
      'Nobody has the documentation, passwords or configuration files',
      'Some equipment is fine and some is past end of support, and it is unclear which',
    ],
    capabilities: [
      {
        title: 'Assessment before recommendation',
        description:
          'We survey what is installed and tell you honestly what to keep, what to reconfigure and what genuinely needs replacing.',
      },
      {
        title: 'Documentation recovered',
        description:
          'Configuration captured, credentials recorded and as-built documentation produced, so you are not dependent on any one supplier again.',
      },
      {
        title: 'Scheduled attention afterwards',
        description:
          'Preventive maintenance and a logged support route, so problems surface during a planned visit rather than during a meeting.',
      },
    ],
    environments: [
      'Inherited installations',
      'Estates with mixed equipment ages',
      'Sites without a maintenance contract',
      'Phased refresh programmes',
    ],
  },
];
