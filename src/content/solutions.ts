export type IconKey =
  | 'video'
  | 'monitor'
  | 'microphone'
  | 'speaker'
  | 'calendar'
  | 'cast'
  | 'touch'
  | 'cable'
  | 'grid'
  | 'cpu'
  | 'wrench'
  | 'shield'
  | 'chalkboard'
  | 'broadcast'
  | 'sliders'
  | 'lightning'
  | 'users'
  | 'chart';

export interface Solution {
  slug: string;
  title: string;
  /** Short label for nav and chips. */
  short: string;
  /** One line for cards. */
  line: string;
  image: string;
  intro: string;
  outcomes: string[];
  capabilities: { icon: IconKey; title: string; text: string }[];
  system: { role: string; detail: string; brands: string[] }[];
  fits: string[];
  products: string[];
  faqs: { q: string; a: string }[];
}

export const solutions: Solution[] = [
  {
    slug: 'boardrooms',
    title: 'Boardrooms & Meeting Rooms',
    short: 'Boardrooms',
    line: 'Rooms where every voice is heard and every screen is sharp, from four-seat huddles to twenty-seat boardrooms.',
    image: '/images/photos/hero-boardroom.jpg',
    intro:
      'We plan the room around how it will be used: seating, sightlines, acoustics and the platform your team already runs. Then we design one system for display, camera, audio and control, install it, and hand over a room anyone can start in one touch.',
    outcomes: [
      'One-touch start for Microsoft Teams, Zoom or Google Meet',
      'Clear audio for every seat, not only the ones near the camera',
      'A consistent experience across every room on the floor',
    ],
    capabilities: [
      { icon: 'users', title: 'Room design consultation', text: 'Site survey, seating plan, viewing distance, display size and camera coverage worked out before anything is ordered.' },
      { icon: 'monitor', title: 'Large-format displays', text: '65 to 105-inch commercial displays, including 21:9 ultra-stretch panels for long boardroom tables.' },
      { icon: 'microphone', title: 'Table and ceiling audio', text: 'Mic pods, ceiling arrays and DSP tuning so remote participants hear the far end of the table clearly.' },
      { icon: 'touch', title: 'Touch control & scheduling', text: 'Tap controllers in the room and booking panels at the door, tied to your Microsoft 365 or Google calendars.' },
      { icon: 'cast', title: 'Wireless presentation', text: 'Guests share a laptop screen in seconds with ClickShare or AirServer, with no cables or adapters to hunt for.' },
      { icon: 'cable', title: 'Clean installation', text: 'Concealed cabling, certified mounts, labelled racks and documented handover for your facilities team.' },
    ],
    system: [
      { role: 'Video bar or camera', detail: 'All-in-one bar for small rooms, modular camera with table companion for long tables.', brands: ['Logitech Rally Bar', 'Logitech Sight', 'Poly Studio X52'] },
      { role: 'Display', detail: 'Commercial-grade panels rated for long daily use.', brands: ['LG', 'Samsung', 'Sharp'] },
      { role: 'Audio pickup', detail: 'Table mic pods or ceiling arrays matched to the room size.', brands: ['Logitech Mic Pod', 'Shure MXA925', 'Sennheiser TCC 2'] },
      { role: 'Control & booking', detail: 'In-room touch controller and outside-door scheduler.', brands: ['Logitech Tap IP', 'Tap Scheduler', 'Panasonic RoomBook'] },
      { role: 'Wireless sharing', detail: 'Button-based or app-based screen sharing for guests.', brands: ['Barco ClickShare', 'AirServer'] },
    ],
    fits: ['Corporate offices', 'Software & IT', 'BFSI', 'Leadership suites', 'Training rooms'],
    products: ['logitech-rally-bar', 'logitech-tap-ip', 'barco-clickshare-cx50', 'lg-105bm5p', 'logitech-mic-pod', 'logitech-tap-scheduler'],
    faqs: [
      { q: 'Can you work with the conferencing platform we already use?', a: 'Yes. We design for Microsoft Teams Rooms, Zoom Rooms and Google Meet, and can set up rooms that support a guest platform through BYOD mode.' },
      { q: 'Do you handle installation and cabling?', a: 'Yes. Mounting, cabling, configuration, testing and commissioning are part of how we deliver. Each proposal states exactly what is included.' },
      { q: 'Can you standardise rooms across multiple floors or cities?', a: 'We build a room standard for each size, so every room of that type looks, sounds and starts the same way.' },
    ],
  },
  {
    slug: 'video-conferencing',
    title: 'Video Conferencing & Unified Communications',
    short: 'Video conferencing',
    line: 'Teams, Zoom and Meet rooms that start on time, with certified hardware and clean BYOD switching.',
    image: '/images/photos/sol-uc.jpg',
    intro:
      'Hybrid meetings fail on small things: a camera that frames the wrong person, a laptop that will not connect, a call that drops at the hour mark. We standardise the hardware, platform settings and network requirements so rooms behave the same way every day.',
    outcomes: [
      'Certified room systems for Microsoft Teams Rooms and Zoom Rooms',
      'BYOD and BYOM modes for guests on other platforms',
      'Calendar-linked booking and status panels outside each room',
    ],
    capabilities: [
      { icon: 'video', title: 'Room systems', text: 'Appliance-based or PC-based room systems sized to each space, with intelligent framing and speaker tracking.' },
      { icon: 'calendar', title: 'Room booking', text: 'Scheduling panels synced to Microsoft 365 or Google Workspace room resources, including e-paper options.' },
      { icon: 'cast', title: 'BYOD & BYOM', text: 'Guests use the room camera and audio from their own laptop for any platform, with a single USB connection.' },
      { icon: 'cpu', title: 'Platform configuration', text: 'Device enrolment, firmware baselines, room accounts and policies set up with your IT team.' },
      { icon: 'chart', title: 'Device management', text: 'Remote monitoring and updates through vendor management portals once rooms are live.' },
      { icon: 'wrench', title: 'Troubleshooting', text: 'Structured diagnosis for camera detection, call drops and interoperability issues when they appear.' },
    ],
    system: [
      { role: 'Room system', detail: 'Video bar or modular camera with compute for Teams or Zoom.', brands: ['Logitech Rally Bar', 'Rally Bar Mini', 'Poly Studio X52', 'Cisco'] },
      { role: 'Touch controller', detail: 'Table or wall-mounted controller for one-touch join.', brands: ['Logitech Tap IP'] },
      { role: 'Scheduling panel', detail: 'Status and booking at the door, synced to the calendar.', brands: ['Logitech Tap Scheduler', 'Panasonic RoomBook'] },
      { role: 'Audio extension', detail: 'Extra mic pods or ceiling mics for larger rooms.', brands: ['Logitech Mic Pod', 'Shure', 'Sennheiser'] },
    ],
    fits: ['Hybrid offices', 'Global delivery centres', 'BFSI', 'Education', 'Government'],
    products: ['logitech-rally-bar-mini', 'logitech-sight', 'logitech-tap-ip', 'logitech-tap-scheduler', 'panasonic-roombook-7', 'logitech-mic-pod'],
    faqs: [
      { q: 'Teams Rooms or Zoom Rooms?', a: 'We follow your organisation standard. Most of the hardware we specify is certified for both, and we can enable guest joining for the other platform.' },
      { q: 'Can a room scheduler show live availability from Outlook?', a: 'Yes. Scheduling panels read the room resource mailbox, so bookings made in Outlook or Teams appear at the door automatically.' },
    ],
  },
  {
    slug: 'led-video-walls',
    title: 'LED & Video Walls',
    short: 'Video walls',
    line: 'Fine-pitch LED and tiled LCD walls for lobbies, control rooms, auditoriums and experience centres.',
    image: '/images/photos/hero-ledwall.jpg',
    intro:
      'A video wall is a structural, electrical and content project as much as a display purchase. We size pixel pitch to viewing distance, plan the mounting and power, specify the processor and control software, and commission the wall so it looks right from every seat.',
    outcomes: [
      'Pixel pitch matched to the closest viewing distance',
      'Processors and control software sized for every source',
      'Mounting, power and redundancy planned up front',
    ],
    capabilities: [
      { icon: 'grid', title: 'Fine-pitch LED', text: 'Seamless indoor LED walls from leading manufacturers, configured for 4K and higher canvases.' },
      { icon: 'monitor', title: 'Tiled LCD walls', text: 'Narrow-bezel LCD walls for control rooms and command centres where text clarity matters.' },
      { icon: 'cpu', title: 'Processing & control', text: 'Video processors, source routing and wall management software with operator workstations.' },
      { icon: 'lightning', title: 'Power & redundancy', text: 'Redundant power and signal paths where the wall cannot go dark.' },
      { icon: 'cable', title: 'Structure & mounting', text: 'Ceiling or wall mounting kits, structural checks and service access planned with your civil team.' },
      { icon: 'wrench', title: 'Commissioning', text: 'Colour calibration, testing, training and handover with documented settings.' },
    ],
    system: [
      { role: 'Display surface', detail: 'Fine-pitch LED modules or narrow-bezel LCD tiles.', brands: ['Barco', 'LG', 'Samsung', 'Unilumin'] },
      { role: 'Processor', detail: 'Scaling, windowing and multi-source layouts.', brands: ['Barco', 'Kramer'] },
      { role: 'Control software', detail: 'Operator control of layouts and sources.', brands: ['Barco CTRL'] },
      { role: 'Infrastructure', detail: 'Network switching, servers and operator workstations.', brands: ['Dell', 'HP'] },
    ],
    fits: ['Corporate lobbies', 'Control rooms', 'Auditoriums', 'Experience centres', 'Research institutions'],
    products: ['lg-105bm5p', 'qsys-core-8-flex', 'crestron-tsw-1070'],
    faqs: [
      { q: 'How do we choose pixel pitch?', a: 'We start from the closest regular viewing distance and the content you will show. Fine text needs a tighter pitch than video or imagery.' },
      { q: 'How long does a large LED wall take?', a: 'Lead time depends on the manufacturer and configuration. Larger fine-pitch walls are often built to order, so we confirm a schedule with the OEM before committing.' },
    ],
  },
  {
    slug: 'digital-signage',
    title: 'Digital Signage',
    short: 'Digital signage',
    line: 'Reception screens, wayfinding and campus-wide messaging, managed from one place.',
    image: '/images/photos/sol-signage.jpg',
    intro:
      'Signage works when it stays current. We specify displays rated for long hours, players and content management software your team can actually run, and mounting that fits the architecture of the space.',
    outcomes: [
      'Displays rated for the hours your space is open',
      'Content scheduled centrally across sites',
      'Mounting and cabling that disappears into the space',
    ],
    capabilities: [
      { icon: 'monitor', title: 'Commercial displays', text: 'High-brightness and 24/7 rated panels, including ultra-stretch formats for corridors and counters.' },
      { icon: 'broadcast', title: 'Content management', text: 'Cloud or on-premise CMS with playlists, schedules and user roles for each site.' },
      { icon: 'grid', title: 'Wayfinding', text: 'Directional and room-availability screens linked to booking systems.' },
      { icon: 'cable', title: 'Installation', text: 'Wall, ceiling, kiosk and floor-stand mounting with concealed power and data.' },
    ],
    system: [
      { role: 'Displays', detail: 'Commercial panels sized to viewing distance and ambient light.', brands: ['LG', 'Samsung', 'Sharp', 'Panasonic'] },
      { role: 'Players & CMS', detail: 'Embedded SoC or external players with central management.', brands: ['LG webOS', 'Samsung Tizen'] },
      { role: 'Mounting', detail: 'Wall, ceiling, kiosk or trolley mounts.', brands: ['Certified mounts'] },
    ],
    fits: ['Reception & lobbies', 'Retail', 'Hospitality', 'Campuses', 'Factories'],
    products: ['lg-105bm5p', 'sharp-pn-lc752', 'panasonic-roombook-7'],
    faqs: [
      { q: 'Who updates the content?', a: 'Your team does, through a content management system we set up and train them on. We can also template layouts so updates take minutes.' },
    ],
  },
  {
    slug: 'professional-audio',
    title: 'Professional Audio & Auditoriums',
    short: 'Pro audio',
    line: 'Speech-clear sound for auditoriums, training halls and multipurpose venues.',
    image: '/images/photos/sol-auditorium.jpg',
    intro:
      'Good sound is designed, not added. We look at the room shape, surfaces and use before selecting speakers, microphones and processing, then tune the system on site so speech is intelligible from the front row to the back.',
    outcomes: [
      'Even coverage and clear speech across the seating area',
      'Wireless microphones that do not drop or interfere',
      'Simple operation for in-house staff, with presets for each event type',
    ],
    capabilities: [
      { icon: 'speaker', title: 'Speaker systems', text: 'Point-source, column and line-array speakers selected for coverage and throw.' },
      { icon: 'sliders', title: 'Mixing & DSP', text: 'Digital mixers and DSP cores with presets, feedback control and room equalisation.' },
      { icon: 'microphone', title: 'Microphones', text: 'Wireless handheld and lapel systems, delegate and gooseneck mics for lecterns.' },
      { icon: 'chalkboard', title: 'Acoustic treatment', text: 'Acoustic panels, slats and ceiling tiles to control reverberation where the room needs it.' },
      { icon: 'broadcast', title: 'AV for events', text: 'Projection or LED, cameras and streaming for hybrid events and convocations.' },
      { icon: 'wrench', title: 'Tuning & training', text: 'On-site measurement, tuning and operator training at handover.' },
    ],
    system: [
      { role: 'Loudspeakers', detail: 'Main and fill speakers designed for the room geometry.', brands: ['JBL', 'Electro-Voice', 'Bose', 'Dynacord'] },
      { role: 'Mixing & DSP', detail: 'Digital mixer and DSP for routing and room control.', brands: ['Yamaha DM3', 'Q-SYS', 'ClearOne'] },
      { role: 'Microphones', detail: 'Wireless and wired microphones for presenters and delegates.', brands: ['Shure', 'Sennheiser'] },
      { role: 'Acoustics', detail: 'Panels, slats and tiles specified with the interior team.', brands: ['Acoustic PET', 'Wooden slats'] },
    ],
    fits: ['Auditoriums', 'Convocation halls', 'Training centres', 'Places of assembly', 'Multipurpose halls'],
    products: ['yamaha-dm3', 'qsys-core-8-flex', 'shure-mxa925', 'sennheiser-tcc2'],
    faqs: [
      { q: 'Can you improve an existing auditorium rather than replace everything?', a: 'Often, yes. We assess what is working, then upgrade the weakest link first, which is usually processing, microphones or acoustics.' },
    ],
  },
  {
    slug: 'smart-classrooms',
    title: 'Smart & Hybrid Classrooms',
    short: 'Smart classrooms',
    line: 'Interactive displays, lecture capture and hybrid teaching for schools, colleges and training centres.',
    image: '/images/photos/hero-lecture.jpg',
    intro:
      'Teachers have a few minutes between classes. Classroom technology has to start instantly and work the same way in every room. We specify interactive panels, audio and cameras that are simple at the front of the room and manageable for the IT team behind it.',
    outcomes: [
      'Interactive panels that start in seconds',
      'Remote students who can see the board and hear the room',
      'Standard designs that scale from one room to a whole campus',
    ],
    capabilities: [
      { icon: 'chalkboard', title: 'Interactive displays', text: '65 to 98-inch interactive flat panels with OPS computers, stands and trolleys.' },
      { icon: 'video', title: 'Lecture capture', text: 'Cameras and audio for recording and streaming lectures to remote learners.' },
      { icon: 'microphone', title: 'Classroom audio', text: 'Voice lift and lapel microphones so every student hears the teacher clearly.' },
      { icon: 'users', title: 'Hybrid learning', text: 'Teams, Zoom or Meet in the classroom with simple controls for teachers.' },
      { icon: 'grid', title: 'Labs & auditoriums', text: 'Computer labs, seminar halls and auditoriums designed as one campus standard.' },
      { icon: 'wrench', title: 'Campus support', text: 'Preventive maintenance and AMC coverage across every classroom.' },
    ],
    system: [
      { role: 'Interactive panel', detail: 'Touch display with built-in or OPS computing.', brands: ['Sharp', 'Newline', 'ViewSonic', 'MAXHUB', 'BenQ', 'Samsung'] },
      { role: 'Projection', detail: 'Laser or lamp projectors for larger halls.', brands: ['Panasonic', 'Epson', 'Sony'] },
      { role: 'Audio', detail: 'Classroom speakers and teacher microphones.', brands: ['Shure', 'Sennheiser'] },
      { role: 'Capture', detail: 'Cameras for hybrid teaching and recording.', brands: ['Logitech'] },
    ],
    fits: ['Schools', 'Universities', 'Research institutes', 'Corporate training', 'Coaching centres'],
    products: ['sharp-pn-lc752', 'logitech-rally-bar-mini', 'sennheiser-tcc2'],
    faqs: [
      { q: 'Which interactive display brand should we choose?', a: 'It depends on your software, budget and support needs. We work across several brands and recommend one based on how your teachers will use it.' },
    ],
  },
  {
    slug: 'control-automation',
    title: 'Control & Room Automation',
    short: 'Control & automation',
    line: 'One panel for displays, sources, audio, lighting and blinds. No remote-control hunting.',
    image: '/images/photos/sol-control.jpg',
    intro:
      'In a well-automated room, one button does the right thing: screens wake, the correct source appears, audio levels are set and lights dim. We design the control logic around how people use the room, then programme and test every scenario.',
    outcomes: [
      'One-touch scenes for presentations, calls and events',
      'Every device in the room on one touch panel',
      'Fewer support calls because the room behaves predictably',
    ],
    capabilities: [
      { icon: 'touch', title: 'Touch panels', text: 'Wall and table touch panels with clear, branded interfaces.' },
      { icon: 'cpu', title: 'Control processors', text: 'Programmable control for displays, switchers, DSP, lighting and blinds.' },
      { icon: 'cable', title: 'Switching & extension', text: 'HDMI and USB switching, extension and table connectivity boxes.' },
      { icon: 'sliders', title: 'Programming', text: 'Custom logic, presets and scheduled shutdown to save energy.' },
    ],
    system: [
      { role: 'Touch panel', detail: 'Wall or table mounted user interface.', brands: ['Crestron TSW-1070', 'Logitech Tap'] },
      { role: 'Control & switching', detail: 'Processors, switchers and extenders.', brands: ['Crestron', 'Kramer'] },
      { role: 'Table connectivity', detail: 'Pop-up and table boxes for laptop connections.', brands: ['Kramer TBUS'] },
    ],
    fits: ['Boardrooms', 'Auditoriums', 'Experience centres', 'Training halls'],
    products: ['crestron-tsw-1070', 'logitech-tap-ip', 'qsys-core-8-flex'],
    faqs: [
      { q: 'Can you add control to a room that is already installed?', a: 'Usually, yes. We audit what is there, check which devices can be controlled over IP or serial, and design control around the existing equipment.' },
    ],
  },
  {
    slug: 'support-amc',
    title: 'Support & Annual Maintenance',
    short: 'Support & AMC',
    line: 'Preventive maintenance, breakdown support and upgrades long after handover.',
    image: '/images/photos/sol-support.jpg',
    intro:
      'Rooms drift: firmware ages, cables get moved, users change settings. Our support and AMC plans keep systems working with scheduled preventive visits, fast breakdown response and coordination with manufacturers on warranty.',
    outcomes: [
      'Scheduled preventive maintenance on every covered system',
      'One contact for breakdowns across brands',
      'OEM warranty coordination handled for you',
    ],
    capabilities: [
      { icon: 'shield', title: 'Comprehensive AMC', text: 'Annual plans covering displays, LED walls, DSPs, microphones, cameras, controls and cabling.' },
      { icon: 'wrench', title: 'Breakdown support', text: 'Diagnosis and repair, with OEM escalation when hardware needs replacing.' },
      { icon: 'cpu', title: 'Updates & tuning', text: 'Firmware updates, audio re-tuning and configuration checks during visits.' },
      { icon: 'chart', title: 'Upgrades & renewals', text: 'Roadmaps for replacing ageing equipment before it fails.' },
    ],
    system: [
      { role: 'Preventive visits', detail: 'Scheduled health checks and cleaning.', brands: ['All installed brands'] },
      { role: 'Breakdown response', detail: 'Troubleshooting on call and on site.', brands: ['Multi-brand'] },
      { role: 'Warranty coordination', detail: 'Logging and following up OEM cases.', brands: ['Manufacturer warranty'] },
    ],
    fits: ['Auditoriums', 'Campuses', 'Corporate floors', 'Control rooms'],
    products: [],
    faqs: [
      { q: 'Do you support systems installed by someone else?', a: 'Yes. We start with an audit of the existing installation, then propose an AMC that reflects its condition.' },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
