import type { SolutionDetail } from '@/content/schemas';

/**
 * Depth content for the eight solution pages.
 *
 * Written to be specific rather than interchangeable: the challenges, the
 * evaluation criteria, the architecture and the FAQs on each page could not be
 * moved to another page without becoming wrong. Where two solutions genuinely
 * share a concern — network readiness, for instance — it is expressed in terms
 * of that solution's consequences, not as a shared paragraph.
 *
 * No model numbers. No pricing. No response-time commitments.
 */
export const solutionDetails: SolutionDetail[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'meeting-and-collaboration-spaces',
    intro:
      'A meeting room is judged in its first ninety seconds. If the call connects, the far end can hear the person at the end of the table and a guest can share a screen without hunting for an adaptor, nobody thinks about the technology again. Everything below exists to make those ninety seconds unremarkable.',
    challenges: [
      {
        title: 'The far end cannot hear half the room',
        description:
          'Microphone coverage is usually specified from a room-size chart rather than from the table. Long tables, hard glass walls and ceiling heights above three metres all defeat that assumption, and the people furthest from the microphone are usually the ones chairing the meeting.',
      },
      {
        title: 'Every room behaves differently',
        description:
          'Rooms fitted in different years by different suppliers each have their own start sequence. Staff learn one room and avoid the others, and visitors need somebody to help them begin.',
      },
      {
        title: 'Sharing content is the failure point',
        description:
          'Guests arrive with a mix of laptops, ports and operating systems. Where there is only one cable and no wireless fallback, the first five minutes are spent looking for an adaptor.',
      },
      {
        title: 'Nobody knows a room is broken until a meeting starts',
        description:
          'Without monitoring, a failed display or an unplugged camera is discovered by whoever booked the room, usually with visitors present.',
      },
    ],
    evaluates: [
      {
        title: 'Table geometry and seating positions',
        description:
          'Where people actually sit determines microphone pickup pattern and count, and whether one camera can frame the room or two are needed.',
      },
      {
        title: 'Acoustics and background noise',
        description:
          'Glass, plasterboard and exposed ceilings each change reverberation. We check the noise floor from air conditioning, because it sets the useful limit on microphone gain.',
      },
      {
        title: 'Sightlines and display size',
        description:
          'Display size is calculated from the furthest seat and the smallest text people expect to read, not from what fits the wall.',
      },
      {
        title: 'Platform and account model',
        description:
          'Teams, Zoom and Meet each impose different room-device, licensing and management requirements. Multi-platform rooms need that decided before hardware is chosen.',
      },
      {
        title: 'Network readiness',
        description:
          'Room systems need addressing, bandwidth, quality-of-service and firewall rules agreed with your IT team before installation week, not during it.',
      },
      {
        title: 'Who administers the room afterwards',
        description:
          'Whether devices are managed by your IT team or by us changes the enrolment model, the credentials and the escalation route.',
      },
    ],
    applications: [
      {
        title: 'Boardrooms',
        description:
          'Longer tables, higher expectations of finish, and usually the room where a failure is least acceptable.',
      },
      {
        title: 'Huddle and focus rooms',
        description:
          'Two to six people, high daily usage, and the rooms most sensitive to a slow or confusing start.',
      },
      {
        title: 'Training rooms',
        description:
          'Presenter mobility, participant microphones and the ability to record or stream a session.',
      },
      {
        title: 'Divisible conference spaces',
        description:
          'Rooms that combine and separate need audio and control that follow the partition rather than being reconfigured by hand.',
      },
    ],
    architecture: {
      caption:
        'A typical meeting room: camera and microphones feed the room system, which drives the display and connects to your meeting platform over the network.',
      nodes: [
        { id: 'cam', label: 'CAMERA', kind: 'camera', x: 14, y: 14 },
        { id: 'mic', label: 'MICROPHONES', kind: 'microphone', x: 14, y: 34 },
        { id: 'src', label: 'GUEST INPUT', kind: 'source', x: 14, y: 54 },
        { id: 'ctl', label: 'ROOM SYSTEM', kind: 'control', x: 45, y: 34 },
        { id: 'disp', label: 'DISPLAY', kind: 'display', x: 76, y: 14 },
        { id: 'spk', label: 'LOUDSPEAKERS', kind: 'speaker', x: 76, y: 34 },
        { id: 'net', label: 'NETWORK', kind: 'network', x: 76, y: 54 },
      ],
      links: [
        { from: 'cam', to: 'ctl' },
        { from: 'mic', to: 'ctl' },
        { from: 'src', to: 'ctl' },
        { from: 'ctl', to: 'disp' },
        { from: 'ctl', to: 'spk' },
        { from: 'ctl', to: 'net', type: 'data' },
      ],
    },
    deliveryNote:
      'Meeting rooms are usually fitted while the floor around them stays occupied, so the constraint is rarely the installation itself — it is access, noise and the order of trades.',
    deliveryPoints: [
      'First-fix containment and power coordinated with the electrical contractor before ceilings close',
      'Rooms commissioned one at a time so a floor is never entirely out of use',
      'A test call placed on every room against your own platform tenancy before handover',
      'Identical configuration applied across rooms so behaviour matches everywhere',
    ],
    lifecycle: [
      {
        title: 'Firmware and platform changes',
        description:
          'Meeting platforms update continuously and occasionally change certification requirements. Room devices need a planned update route rather than being left on the version they shipped with.',
      },
      {
        title: 'Consistency as rooms are added',
        description:
          'New rooms should match the existing ones. We keep the configuration and the design so a room fitted in three years behaves like the ones fitted today.',
      },
    ],
    faqs: [
      {
        question: 'Can we keep our existing displays?',
        answer:
          'Often, yes. If the panel is commercial-grade, still supported and the right size for the room, the sensible upgrade is usually the camera, audio and control layer. We will tell you when a display is genuinely the limiting factor and when it is not.',
      },
      {
        question:
          'We use more than one meeting platform. Does that change things?',
        answer:
          'It changes the room device and the licensing, not the room design. Some systems switch between platforms natively; others need a dedicated device per platform. We work out which applies before specifying, because retrofitting the second platform later is the expensive path.',
      },
      {
        question: 'Do we need a dedicated room system, or is a USB kit enough?',
        answer:
          'For small rooms driven by a visitor laptop, a good USB kit is often the honest answer. Once you want one-touch join, scheduling on the door, remote management or consistent behaviour across many rooms, a dedicated system starts paying for itself.',
      },
      {
        question:
          'What happens if the room is not ready on the installation date?',
        answer:
          'We survey before we schedule, and we confirm site readiness in writing beforehand. If the ceiling is open or power is not in, we reschedule rather than part-installing and returning — part-installed rooms are how cabling gets damaged by other trades.',
      },
    ],
    ctaHeadline: 'Tell us about the room and how it is used',
    ctaBody:
      'Send us the table size, the seating count and the platform you have standardised on. That is usually enough for a first, useful conversation.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'digital-signage',
    intro:
      'Signage fails quietly. Nobody files a ticket because a screen is showing last month’s campaign — it simply stops being looked at. The design problem is therefore less about displays than about whether publishing is easy enough that somebody actually does it every week.',
    challenges: [
      {
        title: 'Content goes stale because publishing is awkward',
        description:
          'Where updating a screen means raising a request with IT, screens stop being updated. The workflow has to fit the person who owns the message, not the person who owns the network.',
      },
      {
        title: 'Nobody knows when a screen is down',
        description:
          'A failed player or a display stuck on an input is usually discovered by a customer. Without monitoring, the estate is only as reliable as how often somebody walks past it.',
      },
      {
        title: 'Consumer televisions fail early',
        description:
          'Panels built for a few hours of domestic viewing are being asked to run twelve or more hours a day, often in portrait, often in bright light. They fail out of warranty and at the worst moment.',
      },
      {
        title: 'One message does not fit every site',
        description:
          'A network that can only broadcast the same content everywhere forces branches to work around it, usually with a laptop taped behind a screen.',
      },
    ],
    evaluates: [
      {
        title: 'Ambient light at each location',
        description:
          'A lobby with a glass frontage needs several times the brightness of an internal corridor. Specifying one panel for every location guarantees some are unreadable and others are overspecified.',
      },
      {
        title: 'Operating hours and orientation',
        description:
          'Duty cycle and portrait mounting both affect which panels are suitable and how their warranties apply.',
      },
      {
        title: 'Who publishes, and how approval works',
        description:
          'Whether one team publishes centrally or each site manages its own content determines the whole permission model in the CMS.',
      },
      {
        title: 'Network access at each site',
        description:
          'Some sites have reliable wired connectivity; some have neither. That decides whether players are cloud-managed, locally cached or both.',
      },
      {
        title: 'Content sources and formats',
        description:
          'Live data, scheduled campaigns, room booking, dashboards and video each place different demands on the player and the layout.',
      },
      {
        title: 'Physical access for service',
        description:
          'A screen above a stairwell is a different maintenance proposition from one at head height. We plan mounts and access at design stage.',
      },
    ],
    applications: [
      {
        title: 'Reception and lobby',
        description:
          'Wayfinding, visitor welcome and corporate messaging where first impressions carry weight.',
      },
      {
        title: 'Retail floors and windows',
        description:
          'High-brightness displays for daylight, with content scheduled around trading hours.',
      },
      {
        title: 'Campus and wayfinding',
        description:
          'Timetables, directions and announcements distributed across buildings from one place.',
      },
      {
        title: 'Staff and production areas',
        description:
          'Shift information, safety messaging and performance data visible where the work happens.',
      },
    ],
    architecture: {
      caption:
        'A signage network: content is scheduled centrally, distributed over the network to players at each site, and monitored back from them.',
      nodes: [
        { id: 'cms', label: 'CMS', kind: 'cloud', x: 14, y: 30 },
        { id: 'net', label: 'NETWORK', kind: 'network', x: 40, y: 30 },
        { id: 'p1', label: 'PLAYER', kind: 'player', x: 66, y: 12 },
        { id: 'p2', label: 'PLAYER', kind: 'player', x: 66, y: 32 },
        { id: 'p3', label: 'PLAYER', kind: 'player', x: 66, y: 52 },
        { id: 'd1', label: 'DISPLAY', kind: 'display', x: 90, y: 12 },
        { id: 'd2', label: 'DISPLAY', kind: 'display', x: 90, y: 32 },
        { id: 'd3', label: 'DISPLAY', kind: 'display', x: 90, y: 52 },
      ],
      links: [
        { from: 'cms', to: 'net', type: 'data' },
        { from: 'net', to: 'p1', type: 'data' },
        { from: 'net', to: 'p2', type: 'data' },
        { from: 'net', to: 'p3', type: 'data' },
        { from: 'p1', to: 'd1' },
        { from: 'p2', to: 'd2' },
        { from: 'p3', to: 'd3' },
      ],
    },
    deliveryNote:
      'The installation is rarely the hard part of a signage rollout. Agreeing the content workflow and getting the first month of material ready is what determines whether the network is still current a year later.',
    deliveryPoints: [
      'Content templates and zones built with the team who will publish them',
      'A pilot site commissioned and reviewed before the rollout is scheduled',
      'Player enrolment and network rules agreed with IT ahead of installation',
      'Training delivered to the publishing team, not only to facilities',
    ],
    lifecycle: [
      {
        title: 'Monitoring and proactive replacement',
        description:
          'Remote monitoring reports offline players and displays. Panels approaching end of life can be replaced on a planned cycle rather than after a failure.',
      },
      {
        title: 'Content review',
        description:
          'A network with no review process drifts. We recommend a scheduled content audit alongside the maintenance visit.',
      },
    ],
    faqs: [
      {
        question: 'Can we use ordinary televisions to save money?',
        answer:
          'For a screen running a few hours a day in a low-stakes location, sometimes. For anything running long hours, mounted in portrait, or sitting in daylight, a commercial panel is cheaper over its life because it is rated for the duty cycle and its warranty covers that use.',
      },
      {
        question: 'Cloud or on-premise content management?',
        answer:
          'Cloud is simpler to operate and easier across multiple sites. On-premise makes sense where network policy prohibits outbound connections or where content must not leave the building. Both work; the decision is usually made by your IT policy rather than by the signage.',
      },
      {
        question: 'What happens when a site loses connectivity?',
        answer:
          'Players cache their schedule locally, so screens keep playing the last approved content rather than showing an error. Monitoring flags the site as offline so you know before a customer tells you.',
      },
      {
        question: 'Who owns the CMS licence after handover?',
        answer:
          'You do. We will set it up, configure it and train your team, but the account, the licences and the content belong to you. You are not dependent on us to publish a message.',
      },
    ],
    ctaHeadline: 'Tell us how many screens, and who will publish to them',
    ctaBody:
      'The number of locations and the shape of your approval process tell us more about the right design than the screen sizes do.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'led-and-video-walls',
    intro:
      'Large-format installations are where specification errors become permanent and expensive. Pixel pitch, structure, power and access are decided months before anyone sees an image, and every one of them is difficult to change afterwards.',
    challenges: [
      {
        title: 'Pixel pitch chosen on price rather than distance',
        description:
          'Pitch determines the closest useful viewing distance. Chosen on budget alone, the wall either looks coarse to anyone standing near it or costs far more than the room needs.',
      },
      {
        title: 'Structure and power discovered late',
        description:
          'LED walls are heavy and draw significant current. When the load is raised after the structural design is signed off, the remedy is expensive and visible.',
      },
      {
        title: 'Heat and noise in enclosed spaces',
        description:
          'A large wall in a sealed room changes the thermal load. Cooling designed without it becomes audible during quiet moments.',
      },
      {
        title: 'No practical way to service it',
        description:
          'A single failed module becomes a project when nobody planned access, kept spares from the same production batch, or recorded the calibration data.',
      },
    ],
    evaluates: [
      {
        title: 'Closest and furthest viewing positions',
        description:
          'Pitch is selected from where people will actually stand, which in a lobby is often much closer than the design assumed.',
      },
      {
        title: 'Content type and source resolution',
        description:
          'A wall carrying live dashboards has different processing and latency requirements from one carrying brand video.',
      },
      {
        title: 'Structure, fixings and floor loading',
        description:
          'Wall build-up, fixing points and whether the structure can carry the array — coordinated with the architect or structural engineer, not assumed.',
      },
      {
        title: 'Power distribution and redundancy',
        description:
          'Circuit capacity, distribution and whether the installation needs redundant supply for continuous operation.',
      },
      {
        title: 'Ambient light and finishes',
        description:
          'Brightness is specified against daylight and surrounding surfaces so the wall is neither washed out nor uncomfortable.',
      },
      {
        title: 'Service access and spares strategy',
        description:
          'Front or rear access, the clearance required, and how many spare modules from the same batch should be held.',
      },
    ],
    applications: [
      {
        title: 'Lobbies and atriums',
        description:
          'High ambient light, close viewing and a finish standard that has to match the architecture.',
      },
      {
        title: 'Auditorium stages',
        description:
          'Large-format backdrops where content changes per event and rigging must be practical.',
      },
      {
        title: 'Control and operations rooms',
        description:
          'Continuous operation, many simultaneous sources and operators seated close to the surface.',
      },
      {
        title: 'Retail and exhibition',
        description:
          'Frequent content changes, daylight, and installations that may be relocated.',
      },
    ],
    architecture: {
      caption:
        'A video wall: multiple sources are managed by a processor that drives the array, with control and monitoring alongside.',
      nodes: [
        { id: 's1', label: 'SOURCES', kind: 'source', x: 12, y: 16 },
        { id: 's2', label: 'LIVE DATA', kind: 'network', x: 12, y: 40 },
        { id: 'proc', label: 'PROCESSOR', kind: 'player', x: 40, y: 28 },
        { id: 'wall1', label: 'LED ARRAY', kind: 'display', x: 72, y: 14 },
        { id: 'wall2', label: 'LED ARRAY', kind: 'display', x: 72, y: 34 },
        { id: 'ctl', label: 'CONTROL', kind: 'control', x: 40, y: 54 },
      ],
      links: [
        { from: 's1', to: 'proc' },
        { from: 's2', to: 'proc', type: 'data' },
        { from: 'proc', to: 'wall1' },
        { from: 'proc', to: 'wall2' },
        { from: 'ctl', to: 'proc', type: 'data' },
      ],
    },
    deliveryNote:
      'Large-format work is a construction activity as much as an AV one. The programme is driven by structure, power and access, and those are agreed with other trades long before the modules arrive.',
    deliveryPoints: [
      'Structural and electrical requirements issued early enough to affect the building design',
      'Delivery and installation sequenced against site access and lift capacity',
      'Modules calibrated as an array after installation, not individually before it',
      'Calibration data and spare-module records handed over with the system',
    ],
    lifecycle: [
      {
        title: 'Uniformity over time',
        description:
          'Modules drift in brightness and colour at slightly different rates. Recalibration at maintenance visits keeps the wall reading as one surface rather than a grid.',
      },
      {
        title: 'Spares from the same batch',
        description:
          'Replacement modules from a later production run can differ visibly. Holding batch-matched spares from the outset avoids a patchwork repair.',
      },
    ],
    faqs: [
      {
        question: 'LCD video wall or direct-view LED?',
        answer:
          'LCD is usually more economical and perfectly good where the bezel lines fall outside the important content, and where viewers are not close. Direct-view LED gives a seamless surface and higher brightness, and is the right answer for lobbies, stages and anywhere people stand near it. The deciding factors are viewing distance, ambient light and whether bezels would cut across what matters.',
      },
      {
        question: 'How do we choose pixel pitch without overspending?',
        answer:
          'Work from the closest position anybody will realistically stand. A finer pitch beyond that point is resolution nobody perceives. We calculate it against your actual floor plan rather than a general rule.',
      },
      {
        question: 'What happens if a module fails?',
        answer:
          'With planned access and batch-matched spares held on site, a module swap is a short visit. Without them it can mean waiting for stock that no longer colour-matches. This is why we plan access and spares at design stage rather than after handover.',
      },
      {
        question: 'Can an LED wall run continuously?',
        answer:
          'Yes, provided brightness, cooling and power are specified for that duty. Running a wall at full brightness continuously shortens its life considerably, so we usually design for a sensible operating level with headroom rather than for the maximum figure on the datasheet.',
      },
    ],
    ctaHeadline: 'Send us the wall size, the room and where people will stand',
    ctaBody:
      'Those three things determine most of the specification. A floor plan or a photograph of the space is genuinely useful at this stage.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'professional-audio-and-auditoriums',
    intro:
      'In a large room, intelligibility is the whole job. A system can be comfortably loud everywhere and still leave a third of the audience unable to follow a speaker, because loudness and clarity are not the same problem.',
    challenges: [
      {
        title: 'Clear at the front, unintelligible at the back',
        description:
          'A single pair of loudspeakers at the stage cannot cover a deep room evenly. The back rows hear more reflected sound than direct sound, and consonants are the first thing lost.',
      },
      {
        title: 'Feedback limits usable level',
        description:
          'Where microphones sit inside the loudspeaker coverage, gain has to be reduced until the room is quiet enough to hear but too quiet to carry.',
      },
      {
        title: 'The room sounds different when it is full',
        description:
          'An empty hall is far more reverberant than an occupied one. Systems tuned in an empty room are frequently wrong on the night.',
      },
      {
        title: 'The settings drift',
        description:
          'Without locked presets, controls get adjusted event by event until nobody knows what the correct starting point was.',
      },
    ],
    evaluates: [
      {
        title: 'Room geometry and seating layout',
        description:
          'Depth, width, balcony overhangs and rake determine how many loudspeaker positions are needed for even coverage.',
      },
      {
        title: 'Surfaces and reverberation',
        description:
          'Glass, stone and hard plaster extend reverberation time and blur speech. We assess whether the answer is loudspeaker directivity, acoustic treatment, or both.',
      },
      {
        title: 'Programme material',
        description:
          'A hall used mainly for speech has different requirements from one hosting live music. Designing for the rare event compromises the common one.',
      },
      {
        title: 'Microphone types and channel count',
        description:
          'Lectern, lapel, handheld and delegate microphones behave differently. Wireless channel count needs frequency coordination, not optimism.',
      },
      {
        title: 'Who will operate it',
        description:
          'If routine events are run by staff rather than an audio engineer, the system needs locked presets and a simple panel rather than a mixing desk.',
      },
      {
        title: 'Background noise from building services',
        description:
          'Air conditioning noise sets the floor the system has to work above, and it is often the reason a room feels hard to listen in.',
      },
    ],
    applications: [
      {
        title: 'Auditoriums and lecture theatres',
        description:
          'Deep, raked seating where even coverage and speech clarity carry the room.',
      },
      {
        title: 'Assembly and convocation halls',
        description:
          'Large, often reverberant spaces used for ceremony and announcement.',
      },
      {
        title: 'Banquet and multipurpose halls',
        description:
          'Rooms that divide, and that host both speech and music in the same week.',
      },
      {
        title: 'Places of worship',
        description:
          'Long reverberation, mixed speech and music, and volunteer operators.',
      },
    ],
    architecture: {
      caption:
        'An auditorium system: microphone and programme sources pass through the mixer and processor, which feeds distributed loudspeaker zones.',
      nodes: [
        { id: 'mic', label: 'MICROPHONES', kind: 'microphone', x: 12, y: 16 },
        { id: 'src', label: 'PROGRAMME', kind: 'source', x: 12, y: 40 },
        { id: 'mix', label: 'MIXER / DSP', kind: 'control', x: 42, y: 28 },
        { id: 'z1', label: 'STAGE ZONE', kind: 'speaker', x: 74, y: 10 },
        { id: 'z2', label: 'MID ZONE', kind: 'speaker', x: 74, y: 30 },
        { id: 'z3', label: 'REAR ZONE', kind: 'speaker', x: 74, y: 50 },
      ],
      links: [
        { from: 'mic', to: 'mix' },
        { from: 'src', to: 'mix' },
        { from: 'mix', to: 'z1' },
        { from: 'mix', to: 'z2' },
        { from: 'mix', to: 'z3' },
      ],
    },
    deliveryNote:
      'Audio work is finished on site, not in the design. The design gets the loudspeakers into the right positions; the commissioning visit is where the system is actually made to sound right in that room.',
    deliveryPoints: [
      'Rigging and structural fixings coordinated before loudspeaker positions are finalised',
      'System measured and tuned on site, with the results documented',
      'Presets built for the ways the room is genuinely used week to week',
      'Operator training given to the people who will run routine events',
    ],
    lifecycle: [
      {
        title: 'Presets stay locked',
        description:
          'Protected settings mean a visiting operator cannot leave the system detuned for the next event. Changes are made deliberately and recorded.',
      },
      {
        title: 'Wireless coordination as the environment changes',
        description:
          'New transmitters nearby and changes to local broadcast allocation can disturb wireless microphone channels. Periodic re-coordination avoids dropouts appearing without explanation.',
      },
    ],
    faqs: [
      {
        question: 'Why can we hear it clearly but still not understand it?',
        answer:
          'That is almost always reverberation rather than level. When reflected sound arrives close behind the direct sound, consonants blur. The remedy is loudspeaker directivity that puts sound onto the audience rather than the walls, and sometimes acoustic treatment. Turning the system up makes it worse.',
      },
      {
        question: 'Do we need acoustic treatment as well as a sound system?',
        answer:
          'Sometimes. In very reverberant rooms a well-designed system alone will not reach good intelligibility, and treatment is the cheaper half of the fix. We will tell you honestly if the room needs it rather than selling more loudspeakers.',
      },
      {
        question: 'How many wireless microphones can we run?',
        answer:
          'It depends on the available spectrum in your location and on antenna placement, not on the number of receivers you buy. We coordinate frequencies as part of the design so the channel count you are promised is the channel count that works.',
      },
      {
        question: 'Can our own staff run the system?',
        answer:
          'Yes, if it is designed for that. Locked presets recalled from a simple panel let staff run routine events confidently, with full control available to an engineer when a larger event needs it.',
      },
    ],
    ctaHeadline: 'Tell us about the hall and what happens in it',
    ctaBody:
      'Seating capacity, the mix of speech and music, and who runs events week to week shape the design more than any equipment choice.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'interactive-learning-spaces',
    intro:
      'Teaching technology succeeds or fails on whether a teacher will use it in week three without help. That is a design question about reach, sightlines and confidence long before it is a question about panels.',
    challenges: [
      {
        title: 'Panels were installed and then avoided',
        description:
          'When the mounting height suits the installer rather than the teacher, or the start sequence takes too long between periods, staff return to the whiteboard.',
      },
      {
        title: 'Remote students cannot hear the room',
        description:
          'A microphone that captures only the teacher makes hybrid teaching one-directional. Questions from the class are lost.',
      },
      {
        title: 'Equipment does not survive daily use',
        description:
          'Rooms used every period by different people need robust mounting, protected cabling and hardware rated for continuous operation.',
      },
      {
        title: 'Rooms drift apart',
        description:
          'Once classrooms are fitted in different phases with different equipment, staff cannot move between rooms confidently and support becomes unpredictable.',
      },
    ],
    evaluates: [
      {
        title: 'Reach and mounting height',
        description:
          'Interactive panels must be usable by teachers of different heights and, where relevant, by seated students. Height is a design decision, not an install-day one.',
      },
      {
        title: 'Sightlines from the back and sides',
        description:
          'Text size at the furthest seat determines panel size. Sitting in the back corner during a survey settles it quickly.',
      },
      {
        title: 'Daylight and glare',
        description:
          'Window position and blind control affect whether the panel is readable in the afternoon.',
      },
      {
        title: 'Audio in both directions',
        description:
          'Whether the room needs voice reinforcement for the teacher, microphone coverage for students, or both.',
      },
      {
        title: 'Estate consistency',
        description:
          'How many rooms will eventually be fitted, and how to keep them identical as the programme is phased over budget years.',
      },
      {
        title: 'Who supports it during term',
        description:
          'Whether there is on-site technical support determines how much the system must tolerate being left in an odd state.',
      },
    ],
    applications: [
      {
        title: 'Classrooms',
        description:
          'High turnover, multiple teachers per day, and the rooms where robustness matters most.',
      },
      {
        title: 'Lecture theatres',
        description:
          'Larger cohorts, projection or large displays, and usually lecture capture.',
      },
      {
        title: 'Seminar and tutorial rooms',
        description: 'Smaller groups, collaborative work and shared screens.',
      },
      {
        title: 'Training and demonstration rooms',
        description:
          'Corporate and clinical training where sessions are recorded or streamed.',
      },
    ],
    architecture: {
      caption:
        'A hybrid teaching room: the interactive panel is the focal device, with room audio and capture feeding remote participants.',
      nodes: [
        {
          id: 'panel',
          label: 'INTERACTIVE PANEL',
          kind: 'display',
          x: 20,
          y: 16,
        },
        { id: 'mic', label: 'ROOM MICS', kind: 'microphone', x: 20, y: 44 },
        { id: 'cam', label: 'CAMERA', kind: 'camera', x: 48, y: 16 },
        { id: 'ctl', label: 'ROOM SYSTEM', kind: 'control', x: 48, y: 44 },
        { id: 'spk', label: 'SPEAKERS', kind: 'speaker', x: 76, y: 16 },
        { id: 'net', label: 'CAMPUS NETWORK', kind: 'network', x: 76, y: 44 },
      ],
      links: [
        { from: 'panel', to: 'ctl' },
        { from: 'mic', to: 'ctl' },
        { from: 'cam', to: 'ctl' },
        { from: 'ctl', to: 'spk' },
        { from: 'ctl', to: 'net', type: 'data' },
      ],
    },
    deliveryNote:
      'Education work is governed by the academic calendar. Installation windows are short, fixed and unforgiving, which makes sequencing and pre-configuration more important than raw installation speed.',
    deliveryPoints: [
      'Rooms configured and tested off site so on-site time is installation only',
      'Programmes sequenced into vacation windows agreed at the start',
      'A pilot room fitted and reviewed with teaching staff before the rollout',
      'Teacher training scheduled inside term, not on the last day of the holiday',
    ],
    lifecycle: [
      {
        title: 'Phased estates staying consistent',
        description:
          'Rooms fitted across several budget years should still behave identically. We keep the design and configuration so later phases match the first.',
      },
      {
        title: 'Refresher training',
        description:
          'Teaching staff change. A short refresher session each year keeps confidence high and support calls low.',
      },
    ],
    faqs: [
      {
        question: 'Interactive panel or projector for a classroom?',
        answer:
          'For most standard classrooms a panel wins: brighter in daylight, nothing to replace as a consumable, no shadowing, and no alignment to maintain. Projection still makes sense where the image needs to be very large or where the throw distance suits a room that a panel cannot cover.',
      },
      {
        question: 'How do we stop the panels going unused?',
        answer:
          'Mount them at a height the teaching staff chose, keep the start sequence to one action, make every room identical, and train people properly at handover. Most abandoned panels were abandoned for one of those four reasons.',
      },
      {
        question: 'Can we fit rooms over several years?',
        answer:
          'Yes, and most institutions do. The important thing is agreeing the room standard at the start so phase three still matches phase one. We keep the design and configuration between phases.',
      },
      {
        question: 'Do we need lecture capture in every room?',
        answer:
          'Usually not. Capture tends to be needed in a subset of rooms, and specifying it everywhere adds cost and complexity that goes unused. We would rather identify the rooms that genuinely need it.',
      },
    ],
    ctaHeadline: 'Tell us how many rooms, and when your vacation windows fall',
    ctaBody:
      'Room count and the academic calendar shape an education programme more than anything else. We can work backwards from your windows.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'commercial-displays-and-projection',
    intro:
      'The projector-versus-display question is usually settled by ambient light and running cost rather than by preference. We would rather give you the honest comparison than the one that suits a larger order.',
    challenges: [
      {
        title: 'Images washed out by daylight',
        description:
          'Brightness specified without measuring the room means the image is unusable exactly when the room is busiest.',
      },
      {
        title: 'Screens too small to read from the back',
        description:
          'Display size chosen to fit the wall rather than calculated from the furthest seat and the smallest text people need to read.',
      },
      {
        title: 'Consumer panels in commercial use',
        description:
          'Domestic televisions in continuous operation fail early, and their warranties often exclude that use entirely.',
      },
      {
        title: 'Consumables nobody budgeted for',
        description:
          'Lamp-based projection carries a running cost and a maintenance requirement that is frequently discovered after the first replacement.',
      },
    ],
    evaluates: [
      {
        title: 'Ambient light through the day',
        description:
          'Window orientation, blinds and lighting control determine the brightness the image actually has to compete with.',
      },
      {
        title: 'Furthest viewing distance and smallest text',
        description:
          'Together these set the minimum image size. Spreadsheets and drawings demand more than presentation slides.',
      },
      {
        title: 'Operating hours and duty cycle',
        description:
          'Continuous operation calls for commercial panels rated for it, with warranties that reflect the use.',
      },
      {
        title: 'Throw distance, mounting and sightlines',
        description:
          'Whether a projector can be positioned without shadowing the presenter, and whether a display can be mounted where it is actually visible.',
      },
      {
        title: 'Total cost over the installed life',
        description:
          'Purchase price, running cost, consumables and expected replacement compared honestly across the options.',
      },
      {
        title: 'Serviceability',
        description:
          'Whether the device can be reached for cleaning, filter changes or replacement without scaffolding.',
      },
    ],
    applications: [
      {
        title: 'Large-venue projection',
        description:
          'Halls and theatres where image size outweighs ambient-light challenges.',
      },
      {
        title: 'Meeting and training rooms',
        description:
          'Commercial displays sized from the furthest seat, running for a full working day.',
      },
      {
        title: 'Public information areas',
        description:
          'Continuous operation in daylight, often in portrait orientation.',
      },
      {
        title: 'Specialist viewing environments',
        description:
          'Rooms where colour accuracy or fine detail matters more than size.',
      },
    ],
    architecture: {
      caption:
        'A presentation space: sources are switched and scaled to the display or projector, with control and audio alongside.',
      nodes: [
        { id: 'src', label: 'SOURCES', kind: 'source', x: 14, y: 18 },
        { id: 'byod', label: 'GUEST INPUT', kind: 'source', x: 14, y: 44 },
        { id: 'sw', label: 'SWITCHER', kind: 'control', x: 44, y: 31 },
        { id: 'disp', label: 'DISPLAY', kind: 'display', x: 76, y: 14 },
        { id: 'proj', label: 'PROJECTOR', kind: 'player', x: 76, y: 34 },
        { id: 'spk', label: 'AUDIO', kind: 'speaker', x: 76, y: 54 },
      ],
      links: [
        { from: 'src', to: 'sw' },
        { from: 'byod', to: 'sw' },
        { from: 'sw', to: 'disp' },
        { from: 'sw', to: 'proj' },
        { from: 'sw', to: 'spk' },
      ],
    },
    deliveryNote:
      'Display work looks simple and is mostly about mounting and finish. The difference between an acceptable and an excellent installation is almost entirely in bracket selection, cable management and how the wall is made good.',
    deliveryPoints: [
      'Wall construction verified before bracket selection, not assumed from the drawing',
      'Cabling concealed and terminated so no trailing leads are visible',
      'Screen and projector geometry aligned and locked at commissioning',
      'Making good and finishing treated as part of the installation, not an extra',
    ],
    lifecycle: [
      {
        title: 'Filters, cleaning and consumables',
        description:
          'Projection carries a maintenance requirement. Scheduled cleaning and filter changes prevent gradual brightness loss that nobody notices until it is severe.',
      },
      {
        title: 'Planned replacement',
        description:
          'Panels and light sources have predictable lives. Planning replacement against that curve is far cheaper than reacting to failures.',
      },
    ],
    faqs: [
      {
        question: 'Projector or professional display — which should we choose?',
        answer:
          'In a room with normal daylight and a viewing distance under about eight metres, a commercial display usually wins on brightness, running cost and maintenance. Projection wins when you need a genuinely large image, when the room can be darkened, or when the throw geometry suits a space no single panel can cover. Room dimensions and light levels answer this faster than any general rule.',
      },
      {
        question: 'How big should the display be?',
        answer:
          'Measure from the furthest seat and decide the smallest text people must read. Presentation slides tolerate a smaller image; spreadsheets and drawings do not. We size from those two numbers rather than from what fits the wall.',
      },
      {
        question: 'Is a commercial display really worth the difference?',
        answer:
          'For continuous operation, yes — it is rated for the hours, usually brighter, mountable in portrait, and its warranty covers commercial use. For a screen used briefly in a small room, a consumer panel can be the sensible choice and we will say so.',
      },
      {
        question: 'Can you re-use our existing projectors?',
        answer:
          'Often. If brightness is still adequate for the room and the unit is supported, the better investment is usually the switching, control and audio around it. We assess what is installed before recommending replacement.',
      },
    ],
    ctaHeadline: 'Tell us the room size and how bright it gets',
    ctaBody:
      'Dimensions, the furthest seat and the daylight situation will usually settle the projector-versus-display question in one conversation.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'room-automation-and-control',
    intro:
      'Control systems are judged by whether a visitor can start a meeting without being shown. That is an interface design problem, and it is solved by removing choices rather than adding buttons.',
    challenges: [
      {
        title: 'Several remotes and a laminated instruction sheet',
        description:
          'When a room needs a sequence of actions in the right order, meetings start late and somebody has to be called.',
      },
      {
        title: 'Equipment left running',
        description:
          'Projectors, displays and audio left on overnight shorten equipment life and waste energy that nobody is measuring.',
      },
      {
        title: 'Facilities cannot see room status',
        description:
          'Without central visibility, a fault is only known when a user reports it, and usually only after it has spoiled a meeting.',
      },
      {
        title: 'Interfaces built for the installer',
        description:
          'Panels that expose every possible function are harder to use than the equipment they replaced.',
      },
    ],
    evaluates: [
      {
        title: 'What people actually do in the room',
        description:
          'The three or four common actions should be one touch. Everything else can sit a level deeper without cluttering the main screen.',
      },
      {
        title: 'Who uses the room',
        description:
          'A room used by visitors needs a different interface from one used by the same trained team every day.',
      },
      {
        title: 'Which systems should respond together',
        description:
          'Displays, sources, audio, lighting, blinds and HVAC — deciding what is genuinely worth integrating, and what adds risk without benefit.',
      },
      {
        title: 'Scheduling and occupancy behaviour',
        description:
          'Whether the room should wake for a booking, shut down when vacant, and how it should behave outside working hours.',
      },
      {
        title: 'Network and security requirements',
        description:
          'Control processors sit on your network. Addressing, segmentation and update policy are agreed with IT during design.',
      },
      {
        title: 'How faults should be reported',
        description:
          'Whether room status should reach a facilities dashboard, a helpdesk ticket, or both.',
      },
    ],
    applications: [
      {
        title: 'Boardrooms and executive rooms',
        description:
          'Where the room must work first time and often for visitors.',
      },
      {
        title: 'Divisible conference spaces',
        description:
          'Audio, sources and control that follow the partition automatically.',
      },
      {
        title: 'Lecture theatres',
        description:
          'Simple presenter control with full capability available when needed.',
      },
      {
        title: 'Estates with many similar rooms',
        description:
          'Where consistency and central monitoring matter more than per-room customisation.',
      },
    ],
    architecture: {
      caption:
        'A controlled room: the processor sits between the user interface and the equipment, and reports status centrally.',
      nodes: [
        { id: 'panel', label: 'TOUCH PANEL', kind: 'control', x: 14, y: 30 },
        { id: 'proc', label: 'PROCESSOR', kind: 'player', x: 44, y: 30 },
        { id: 'disp', label: 'DISPLAYS', kind: 'display', x: 76, y: 10 },
        { id: 'aud', label: 'AUDIO', kind: 'speaker', x: 76, y: 30 },
        { id: 'src', label: 'SOURCES', kind: 'source', x: 76, y: 50 },
        { id: 'net', label: 'MONITORING', kind: 'network', x: 44, y: 56 },
      ],
      links: [
        { from: 'panel', to: 'proc', type: 'data' },
        { from: 'proc', to: 'disp' },
        { from: 'proc', to: 'aud' },
        { from: 'proc', to: 'src' },
        { from: 'proc', to: 'net', type: 'data' },
      ],
    },
    deliveryNote:
      'Control work is mostly programming, and programming is only as good as the agreement about what the room should do. We settle the interface on paper before anything is written.',
    deliveryPoints: [
      'Interface layout agreed with the people who use the room, before programming',
      'Processor addressing and security reviewed with IT during design',
      'Every function tested against a written control test plan at commissioning',
      'Source code and configuration handed over with the system',
    ],
    lifecycle: [
      {
        title: 'You own the configuration',
        description:
          'Programming and configuration are handed over. You are never locked into one supplier because nobody else can open the file.',
      },
      {
        title: 'Behaviour evolves',
        description:
          'How a room is used changes. Small control adjustments are far cheaper than replacing equipment that was fine.',
      },
    ],
    faqs: [
      {
        question: 'Do we need a control system at all?',
        answer:
          'Not always. A room with one display and one source rarely benefits from one. Control earns its place when there are several sources, several destinations, audio to manage, or a fleet of rooms where consistency and monitoring matter.',
      },
      {
        question: 'Can facilities see whether a room is working?',
        answer:
          'Yes. Room status, device health and usage can be reported to a dashboard or into your existing helpdesk, so a fault becomes a ticket before it becomes a complaint.',
      },
      {
        question: 'What happens if the control processor fails?',
        answer:
          'We design so the critical path degrades gracefully — a display and a source should still work manually. Total dependence on a single processor is a design decision we would rather avoid.',
      },
      {
        question: 'Will we be locked in to SAAN for changes?',
        answer:
          'No. Configuration and source code are handed over at project close. We would rather keep your work by being useful than by holding the file.',
      },
    ],
    ctaHeadline: 'Tell us what the room should do in one touch',
    ctaBody:
      'Describe the three things people do most often in the space. That is the whole starting point for a control design.',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'managed-av-services',
    intro:
      'Most AV estates degrade quietly. Nothing fails outright; rooms just become slightly less reliable until people stop booking the difficult ones. Managed support exists to catch that drift while it is still cheap to fix.',
    challenges: [
      {
        title: 'Faults are found by users, in meetings',
        description:
          'Without monitoring or scheduled checks, the first report of a problem comes from whoever booked the room, usually with guests present.',
      },
      {
        title: 'The original installer has gone',
        description:
          'Inherited systems frequently arrive with no drawings, no credentials and no record of how anything was configured.',
      },
      {
        title: 'Mixed equipment ages, unclear status',
        description:
          'Estates built up over years contain equipment that is fine, equipment past support, and equipment about to fail, with nothing distinguishing them.',
      },
      {
        title: 'Budgeting by emergency',
        description:
          'Without lifecycle planning, replacement happens reactively at the worst time and at the worst price.',
      },
    ],
    evaluates: [
      {
        title: 'What is actually installed',
        description:
          'A documented inventory of devices, firmware, configuration and warranty status — usually the first thing missing on an inherited estate.',
      },
      {
        title: 'Which rooms matter most',
        description:
          'A board room and a spare huddle room do not warrant the same response. Criticality shapes the maintenance schedule.',
      },
      {
        title: 'What can be monitored remotely',
        description:
          'Which devices report health, what can be resolved without a visit, and what network access that requires.',
      },
      {
        title: 'Support routes and escalation',
        description:
          'Who reports a fault, how it is logged, and what happens when the first response does not resolve it.',
      },
      {
        title: 'Spares and consumables',
        description:
          'Which failures are common enough to justify holding spares, and what consumables need scheduling.',
      },
      {
        title: 'Realistic refresh horizon',
        description:
          'When each part of the estate should be planned for replacement, so budgets are prepared rather than surprised.',
      },
    ],
    applications: [
      {
        title: 'Multi-room corporate estates',
        description:
          'Where consistency across floors and buildings matters and downtime is visible.',
      },
      {
        title: 'Campuses',
        description:
          'Many similar rooms, term-time constraints and limited on-site technical staff.',
      },
      {
        title: 'Inherited installations',
        description:
          'Systems SAAN did not install, taken on with a documentation and assessment stage first.',
      },
      {
        title: 'Sites without in-house AV staff',
        description:
          'Where facilities carry AV alongside everything else and need a clear escalation route.',
      },
    ],
    architecture: {
      caption:
        'Managed support: room devices report health to a monitoring service, with remote diagnosis first and on-site attendance where needed.',
      nodes: [
        { id: 'r1', label: 'ROOM', kind: 'display', x: 12, y: 14 },
        { id: 'r2', label: 'ROOM', kind: 'display', x: 12, y: 34 },
        { id: 'r3', label: 'ROOM', kind: 'display', x: 12, y: 54 },
        { id: 'net', label: 'NETWORK', kind: 'network', x: 42, y: 34 },
        { id: 'mon', label: 'MONITORING', kind: 'cloud', x: 70, y: 20 },
        { id: 'desk', label: 'SUPPORT DESK', kind: 'control', x: 70, y: 48 },
      ],
      links: [
        { from: 'r1', to: 'net', type: 'data' },
        { from: 'r2', to: 'net', type: 'data' },
        { from: 'r3', to: 'net', type: 'data' },
        { from: 'net', to: 'mon', type: 'data' },
        { from: 'mon', to: 'desk', type: 'data' },
      ],
    },
    deliveryNote:
      'A support agreement starts with an assessment, not a contract. We would rather document what you have and tell you honestly what needs attention than quote for a service before either side knows the condition of the estate.',
    deliveryPoints: [
      'Estate assessment and documented inventory before any agreement is priced',
      'Room criticality agreed with you, so the schedule reflects your priorities',
      'Monitoring and remote access arranged with IT, respecting your security policy',
      'Visit reports issued after every scheduled maintenance visit',
    ],
    lifecycle: [
      {
        title: 'Planned rather than reactive replacement',
        description:
          'Knowing which rooms are approaching end of support turns replacement into a budget line rather than an emergency.',
      },
      {
        title: 'Documentation kept current',
        description:
          'As-built records are updated as changes are made, so the estate never returns to the undocumented state it started in.',
      },
    ],
    faqs: [
      {
        question: 'Will you support systems you did not install?',
        answer:
          'Yes, and it is a large part of what we do. We start with an assessment to document what is installed and identify anything unsupported or unsafe, then agree a maintenance scope from there.',
      },
      {
        question: 'One-time installation or a managed support agreement?',
        answer:
          'If you have one or two rooms and somebody technical on site, ad-hoc support may be perfectly sufficient. A managed agreement pays for itself when downtime is visible, when there are many rooms, or when nobody in-house owns AV. We would rather you chose on that basis than on a fixed rule.',
      },
      {
        question: 'What does a preventive maintenance visit actually involve?',
        answer:
          'Physical inspection, cleaning and filter changes where relevant, firmware and configuration checks, a functional test of each room, and a written report of anything found. The point is to catch things while they are still minor.',
      },
      {
        question: 'What response times do you offer?',
        answer:
          'Response commitments are agreed per contract against room criticality, and we would rather set them with you than publish a figure here that may not match your estate. Ask us and we will discuss what is realistic for your sites.',
      },
    ],
    ctaHeadline: 'Tell us what you have inherited',
    ctaBody:
      'Even a rough room count and a description of what keeps going wrong is enough for us to suggest where an assessment should start.',
  },
];
