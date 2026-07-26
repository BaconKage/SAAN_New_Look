import type { IndustryDetail } from '@/content/schemas';

/**
 * Depth content for the seven industry pages.
 *
 * Each sector's challenges are the ones that genuinely differ — access
 * constraints, procurement, calendars, duty cycles — rather than a restatement
 * of the solution copy. `relevantSolutions` is a real subset: listing all eight
 * on every page is what made the pages interchangeable in the first place.
 */
export const industryDetails: IndustryDetail[] = [
  {
    slug: 'corporate',
    intro:
      'Corporate estates are judged on consistency. One excellent boardroom does not help if the eleven rooms around it each behave differently, because staff learn to avoid the difficult ones and visitors always need somebody to help them start.',
    challenges: [
      {
        title: 'Rooms fitted in different years by different suppliers',
        description:
          'Each generation has its own start sequence and its own remote. Nobody can walk into an unfamiliar room and begin a meeting without help.',
      },
      {
        title: 'Hybrid meetings that work in only one direction',
        description:
          'Remote participants hear the person nearest the microphone and nobody else, so the people in the room dominate by default.',
      },
      {
        title: 'Facilities have no view of what is broken',
        description:
          'Faults surface as complaints after a meeting has already been disrupted, rather than as tickets beforehand.',
      },
    ],
    benefits: [
      {
        title: 'Any room, same behaviour',
        description:
          'A standard room design applied across floors means staff and visitors can use any space without being shown.',
      },
      {
        title: 'Faults become tickets, not complaints',
        description:
          'Central room status lets facilities act on a failed display before the room is booked again.',
      },
      {
        title: 'Predictable refresh budgeting',
        description:
          'A documented estate with known equipment ages turns replacement into a planned line rather than an emergency.',
      },
    ],
    deliveryApproach: {
      summary:
        'Corporate fit-outs almost always happen around occupied floors, so the constraint is access and noise rather than the installation itself.',
      considerations: [
        'Works scheduled outside core hours where drilling or ceiling access is required',
        'Rooms commissioned in batches so a floor is never entirely out of use',
        'Standard room configurations applied identically, so later rooms match the first',
      ],
    },
    relevantSolutions: [
      'meeting-and-collaboration-spaces',
      'room-automation-and-control',
      'digital-signage',
      'managed-av-services',
    ],
    ctaHeadline: 'How many rooms, and how different are they today?',
    ctaBody:
      'A room count and an honest description of how inconsistent the estate has become is enough for a first conversation.',
  },

  {
    slug: 'education',
    intro:
      'Education programmes are governed by the calendar. Installation windows are short, fixed and cannot slip, and the equipment has to survive being used by a different person every period without anyone technical nearby.',
    challenges: [
      {
        title: 'Fixed vacation windows',
        description:
          'Work has to be finished before term starts. A programme that overruns does not simply delay — it collides with teaching.',
      },
      {
        title: 'Technology installed and then avoided',
        description:
          'Panels mounted at the wrong height, or with a start sequence too slow for the gap between lessons, get quietly abandoned.',
      },
      {
        title: 'Rooms drifting apart across phases',
        description:
          'Estates fitted over several budget years end up with equipment that behaves differently room to room, so staff cannot move between them.',
      },
    ],
    benefits: [
      {
        title: 'Teaching staff who actually use it',
        description:
          'Rooms designed around how people teach, with training at handover, are the rooms that stay in use in week ten.',
      },
      {
        title: 'Hybrid sessions that include the room',
        description:
          'Microphone coverage that picks up student questions makes remote participation two-directional rather than a broadcast.',
      },
      {
        title: 'A repeatable room standard',
        description:
          'Later phases match the first, so support stays predictable and staff confidence carries across buildings.',
      },
    ],
    deliveryApproach: {
      summary:
        'We work backwards from the academic calendar, and we pre-configure as much as possible so on-site time is installation rather than setup.',
      considerations: [
        'Equipment configured and tested off site before the vacation window opens',
        'A pilot room fitted and reviewed with teaching staff before the wider rollout',
        'Training scheduled inside term, when the staff who need it are present',
      ],
    },
    relevantSolutions: [
      'interactive-learning-spaces',
      'professional-audio-and-auditoriums',
      'commercial-displays-and-projection',
      'digital-signage',
    ],
    ctaHeadline: 'Tell us your room count and your vacation windows',
    ctaBody:
      'Those two facts shape an education programme more than any equipment decision. We can plan backwards from them.',
  },

  {
    slug: 'healthcare',
    intro:
      'Hospitals do not pause. Installation happens around live clinical operations, under infection-control constraints, in buildings where the route your cable takes is a governance question as much as an engineering one.',
    challenges: [
      {
        title: 'No possibility of downtime',
        description:
          'Work has to fit around clinical activity, with routes, timings and noise agreed in advance and adhered to exactly.',
      },
      {
        title: 'Infection control and access restrictions',
        description:
          'Clean areas impose real limits on tools, materials, dust and who may be present. These are not negotiable on the day.',
      },
      {
        title: 'Confidentiality in shared spaces',
        description:
          'Displays in corridors and waiting areas must never show patient-identifiable information, which constrains both content and placement.',
      },
    ],
    benefits: [
      {
        title: 'Training delivered without leaving site',
        description:
          'Well-designed demonstration and conference rooms let clinical staff train and attend sessions without travelling.',
      },
      {
        title: 'Clearer wayfinding',
        description:
          'Consistent information displays reduce the number of people asking staff for directions.',
      },
      {
        title: 'Systems that tolerate continuous operation',
        description:
          'Equipment rated for long duty cycles, in an environment where failure is disruptive rather than merely inconvenient.',
      },
    ],
    deliveryApproach: {
      summary:
        'Healthcare work is planned with the estates and infection-control teams before any date is set, and the method statement matters as much as the design.',
      considerations: [
        'Access routes, working hours and containment agreed with estates in advance',
        'Dust and noise controls appropriate to adjacent clinical areas',
        'Content and placement reviewed so nothing patient-identifiable is visible',
      ],
    },
    relevantSolutions: [
      'meeting-and-collaboration-spaces',
      'digital-signage',
      'commercial-displays-and-projection',
      'managed-av-services',
    ],
    ctaHeadline: 'Tell us which areas are affected and when access is possible',
    ctaBody:
      'For hospital work, the access constraints shape the programme. It is the right place to start the conversation.',
  },

  {
    slug: 'retail',
    intro:
      'Retail signage lives or dies on how quickly a message can change. A network that takes a week to update is a network that will be showing last season by the time anyone notices.',
    challenges: [
      {
        title: 'Content changing faster than the process allows',
        description:
          'Promotions turn over weekly. If publishing needs a support request, stores end up printing signs instead.',
      },
      {
        title: 'Daylight in shop windows',
        description:
          'Standard displays are unreadable behind glass in daylight, which is precisely when the message matters most.',
      },
      {
        title: 'Faults discovered by customers',
        description:
          'Without monitoring across sites, a dark screen in one store can go unnoticed for days.',
      },
    ],
    benefits: [
      {
        title: 'One team publishing to every store',
        description:
          'Central scheduling with per-store overrides means campaigns land everywhere on the same morning.',
      },
      {
        title: 'Readable in the window',
        description:
          'High-brightness displays specified for daylight so window messaging works during trading hours.',
      },
      {
        title: 'Estate visibility',
        description:
          'Remote monitoring reports offline screens centrally, so problems are known before a customer sees them.',
      },
    ],
    deliveryApproach: {
      summary:
        'Retail rollouts are repetitive by design. The pilot store matters more than the plan, because it is where the install pack gets corrected.',
      considerations: [
        'A pilot store installed and reviewed before the rollout is scheduled',
        'Installation outside trading hours, with the shop floor left clear',
        'A repeatable install pack so every store is fitted identically',
      ],
    },
    relevantSolutions: [
      'digital-signage',
      'commercial-displays-and-projection',
      'led-and-video-walls',
      'managed-av-services',
    ],
    ctaHeadline: 'How many stores, and how often does the message change?',
    ctaBody:
      'Store count and content frequency tell us more about the right design than the screen sizes do.',
  },

  {
    slug: 'hospitality',
    intro:
      'A hospitality space earns its keep by changing. The same hall hosts a board meeting at nine and a wedding at seven, and the technology has to reconfigure in the gap without a specialist present.',
    challenges: [
      {
        title: 'Rooms that combine and divide',
        description:
          'When a partition moves, audio zones, sources and control have to follow it. Reconfiguring by hand is slow and gets it wrong.',
      },
      {
        title: 'Operated by banqueting staff, not engineers',
        description:
          'The people setting up an event need presets they can recall confidently, not a mixing desk.',
      },
      {
        title: 'Technology that must not be visible',
        description:
          'Guest-facing spaces are designed to look a certain way. Equipment has to be integrated into that, not applied on top of it.',
      },
    ],
    benefits: [
      {
        title: 'Faster turnarounds between events',
        description:
          'Preset room configurations recalled in one action mean a space can change use in minutes rather than an hour.',
      },
      {
        title: 'Fewer escalations during events',
        description:
          'Systems that banqueting staff can operate confidently reduce the calls that arrive mid-event.',
      },
      {
        title: 'A finish that suits the room',
        description:
          'Equipment integrated into the architecture rather than surface-mounted across it.',
      },
    ],
    deliveryApproach: {
      summary:
        'Hospitality venues rarely close, so work is sequenced around the events diary and the finish standard is a guest-facing one.',
      considerations: [
        'Programme built around confirmed bookings rather than a fixed run of days',
        'Concealed containment and finishing appropriate to a guest-facing space',
        'Operator training for banqueting and events staff, not only for maintenance',
      ],
    },
    relevantSolutions: [
      'professional-audio-and-auditoriums',
      'room-automation-and-control',
      'digital-signage',
      'commercial-displays-and-projection',
    ],
    ctaHeadline: 'Tell us how the space changes through the week',
    ctaBody:
      'The range of events a room has to host, and who sets it up, shape the design more than the room dimensions.',
  },

  {
    slug: 'manufacturing',
    intro:
      'On a plant floor, a display is industrial equipment. It has to be readable at a distance, survive the environment it sits in, and carry information that changes shift by shift.',
    challenges: [
      {
        title: 'Environments that destroy ordinary equipment',
        description:
          'Dust, vibration, temperature range and washdown all defeat displays specified for an office.',
      },
      {
        title: 'Information that has to read at a glance',
        description:
          'Operators are moving and often at distance. Content designed for a desk monitor is useless on a shop floor.',
      },
      {
        title: 'A gap between the floor and the offices',
        description:
          'Production data lives in systems the people doing the work cannot see, so problems surface late.',
      },
    ],
    benefits: [
      {
        title: 'Live information where the work happens',
        description:
          'Production and quality data visible on the floor lets teams react during the shift rather than afterwards.',
      },
      {
        title: 'Safety messaging that is actually seen',
        description:
          'Displays positioned and sized for the environment, rather than notices nobody stops to read.',
      },
      {
        title: 'Equipment rated for the conditions',
        description:
          'Enclosures and mounting specified for the plant, so replacement is planned rather than frequent.',
      },
    ],
    deliveryApproach: {
      summary:
        'Plant work is governed by site safety and by production. Permits, inductions and shutdown windows drive the programme.',
      considerations: [
        'Permits to work, inductions and site safety requirements built into the schedule',
        'Installation planned around shutdown windows and shift patterns',
        'Enclosures and mounting specified for dust, vibration and temperature',
      ],
    },
    relevantSolutions: [
      'digital-signage',
      'led-and-video-walls',
      'meeting-and-collaboration-spaces',
      'managed-av-services',
    ],
    ctaHeadline: 'Tell us about the environment and the shift pattern',
    ctaBody:
      'Conditions on the floor and when the line can stop determine both the equipment and the programme.',
  },

  {
    slug: 'government-and-public-sector',
    intro:
      'Public-sector work is judged on documentation as much as on delivery. The system has to be specified transparently, procured through a formal process, and remain serviceable long after the people who commissioned it have moved on.',
    challenges: [
      {
        title: 'Formal procurement and specification',
        description:
          'Requirements must be written so they can be tendered fairly, which means describing outcomes and standards rather than naming a product.',
      },
      {
        title: 'Long service life expectations',
        description:
          'Systems are expected to remain serviceable for many years, so availability of parts and support matters more than the newest feature.',
      },
      {
        title: 'Accountability for what was installed',
        description:
          'Without complete as-built documentation, a future team inherits a system nobody can safely modify.',
      },
    ],
    benefits: [
      {
        title: 'Specifications that can be tendered',
        description:
          'Requirements written against outcomes and standards, so procurement is defensible and comparable.',
      },
      {
        title: 'Complete handover documentation',
        description:
          'Drawings, configuration, test records and credentials handed over, so the institution owns its system.',
      },
      {
        title: 'Serviceable for the long term',
        description:
          'Equipment selected with support horizon in mind, and a maintenance route that outlasts individual staff.',
      },
    ],
    deliveryApproach: {
      summary:
        'Public-sector projects carry a documentation burden that has to be planned for, not produced at the end. We build it into the programme.',
      considerations: [
        'Documentation, test records and compliance evidence produced as work proceeds',
        'Security, access and clearance requirements agreed before mobilisation',
        'Handover pack structured for an institution rather than for an individual',
      ],
    },
    relevantSolutions: [
      'professional-audio-and-auditoriums',
      'meeting-and-collaboration-spaces',
      'led-and-video-walls',
      'managed-av-services',
    ],
    ctaHeadline: 'Tell us what the specification has to satisfy',
    ctaBody:
      'If you are preparing a tender, we can help describe the requirement in outcome terms that procurement can evaluate fairly.',
  },
];
