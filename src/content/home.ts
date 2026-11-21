/* Content for home-page sections that are not solutions or products. */

export interface HeroSlide {
  word: string;
  label: string;
  image: string;
  /** Image dimensions, needed by the WebGL cover-fit. */
  w: number;
  h: number;
}

export const heroSlides: HeroSlide[] = [
  {
    word: 'connect.',
    label: 'Boardrooms',
    image: '/images/photos/hero-boardroom.jpg',
    w: 1920,
    h: 1280,
  },
  {
    word: 'captivate.',
    label: 'Video walls',
    image: '/images/photos/hero-ledwall.jpg',
    w: 1920,
    h: 1151,
  },
  {
    word: 'perform.',
    label: 'Auditoriums',
    image: '/images/photos/hero-concert.jpg',
    w: 1920,
    h: 1440,
  },
  {
    word: 'teach.',
    label: 'Classrooms',
    image: '/images/photos/hero-lecture.jpg',
    w: 1920,
    h: 1440,
  },
];

export interface Hotspot {
  x: number;
  y: number;
  title: string;
  detail: string;
  brands: string;
}

export interface Room {
  id: string;
  label: string;
  capacity: string;
  image: string;
  /** Image size, used to keep hotspots on target when the photo is cropped. */
  w: number;
  h: number;
  summary: string;
  solution: string;
  hotspots: Hotspot[];
}

export const rooms: Room[] = [
  {
    id: 'huddle',
    label: 'Huddle room',
    capacity: '2 to 6 people',
    image: '/images/photos/room-huddle.jpg',
    w: 1800,
    h: 1201,
    summary:
      'A compact video bar above one display, a table controller and wireless sharing. Ready in one touch.',
    solution: 'video-conferencing',
    hotspots: [
      {
        x: 66,
        y: 38,
        title: 'Display',
        detail: '55 to 65-inch commercial display, sized to the far seat.',
        brands: 'LG, Samsung',
      },
      {
        x: 66,
        y: 26.5,
        title: 'Video bar',
        detail: 'All-in-one camera, microphones and speakers above the screen.',
        brands: 'Logitech Rally Bar Mini',
      },
      {
        x: 53,
        y: 65,
        title: 'Table audio',
        detail: 'Extra pickup for the far side of the table.',
        brands: 'Logitech Mic Pod',
      },
      {
        x: 45,
        y: 61,
        title: 'Touch controller',
        detail: 'One-touch join for scheduled Teams or Zoom meetings.',
        brands: 'Logitech Tap IP',
      },
    ],
  },
  {
    id: 'boardroom',
    label: 'Boardroom',
    capacity: '10 to 20 people',
    image: '/images/photos/hero-boardroom.jpg',
    w: 1920,
    h: 1280,
    summary:
      'A large or ultra-stretch display, camera coverage for the whole table, ceiling or table audio and a scheduler at the door.',
    solution: 'boardrooms',
    hotspots: [
      {
        x: 41.5,
        y: 33,
        title: 'Main display',
        detail:
          '86 to 105-inch display or 21:9 ultra-stretch for content and faces side by side.',
        brands: 'LG 105BM5P, Samsung',
      },
      {
        x: 41.5,
        y: 21.5,
        title: 'Front camera',
        detail: 'PTZ video bar framing the full table.',
        brands: 'Logitech Rally Bar',
      },
      {
        x: 38,
        y: 64,
        title: 'Table microphones',
        detail:
          'Mic pods spaced along the table, or a ceiling array to keep it clear.',
        brands: 'Mic Pod, Shure MXA925',
      },
      {
        x: 88,
        y: 40,
        title: 'Wireless sharing',
        detail: 'Guests share content with one click, no cables needed.',
        brands: 'Barco ClickShare CX-50',
      },
      {
        x: 9,
        y: 42,
        title: 'Room scheduler',
        detail: 'Live availability and walk-up booking outside the door.',
        brands: 'Tap Scheduler, RoomBook 7',
      },
    ],
  },
  {
    id: 'lecture',
    label: 'Lecture hall',
    capacity: '40 to 150 seats',
    image: '/images/photos/room-classroom.jpg',
    w: 1800,
    h: 1350,
    summary:
      'Projection or interactive display, voice lift for the presenter, lecture capture and a lectern that controls it all.',
    solution: 'smart-classrooms',
    hotspots: [
      {
        x: 92,
        y: 24,
        title: 'Projection or display',
        detail: 'Laser projector or interactive panel sized to the back row.',
        brands: 'Panasonic, Epson, Sharp',
      },
      {
        x: 24,
        y: 22,
        title: 'Ceiling projector',
        detail: 'Laser projection for long life and low maintenance.',
        brands: 'Panasonic, Epson',
      },
      {
        x: 58.5,
        y: 36,
        title: 'Speakers',
        detail: 'Distributed speakers for even speech coverage.',
        brands: 'JBL, Bose',
      },
      {
        x: 79,
        y: 70,
        title: 'Smart lectern',
        detail: 'Gooseneck mic, laptop inputs and a touch panel for the room.',
        brands: 'Crestron, Kramer',
      },
      {
        x: 84,
        y: 54,
        title: 'Presenter mic',
        detail: 'Wireless lapel or handheld microphone with voice lift.',
        brands: 'Shure, Sennheiser',
      },
    ],
  },
  {
    id: 'auditorium',
    label: 'Auditorium',
    capacity: '200+ seats',
    image: '/images/photos/sol-auditorium.jpg',
    w: 1800,
    h: 1200,
    summary:
      'LED stage wall, side screens, a tuned sound system and a front-of-house desk that in-house staff can run.',
    solution: 'professional-audio',
    hotspots: [
      {
        x: 40,
        y: 36,
        title: 'LED stage wall',
        detail: 'Fine-pitch LED backdrop sized to the stage and seating depth.',
        brands: 'Barco, Unilumin, Samsung',
      },
      {
        x: 82,
        y: 38,
        title: 'Side screens',
        detail:
          'Image magnification so the back rows can follow the presenter.',
        brands: 'Panasonic, Epson',
      },
      {
        x: 26,
        y: 22,
        title: 'Sound reinforcement',
        detail: 'Speakers designed for coverage and speech clarity.',
        brands: 'JBL, Electro-Voice, Dynacord',
      },
      {
        x: 41,
        y: 75,
        title: 'Front-of-house desk',
        detail: 'Digital mixer with saved scenes for each event type.',
        brands: 'Yamaha DM3, Q-SYS',
      },
      {
        x: 62,
        y: 63,
        title: 'Cameras & streaming',
        detail: 'PTZ cameras for recording and hybrid events.',
        brands: 'Logitech, PTZ cameras',
      },
    ],
  },
  {
    id: 'lobby',
    label: 'Reception',
    capacity: 'Public spaces',
    image: '/images/photos/room-lobby.jpg',
    w: 1800,
    h: 1011,
    summary:
      'A welcome wall, wayfinding screens and background audio, all scheduled from one content system.',
    solution: 'digital-signage',
    hotspots: [
      {
        x: 52,
        y: 40,
        title: 'Welcome video wall',
        detail: 'LED or LCD wall for brand content and visitor welcomes.',
        brands: 'LG, Samsung, Barco',
      },
      {
        x: 89,
        y: 60,
        title: 'Reception display',
        detail: 'Visitor information and meeting-room availability.',
        brands: 'LG, Sharp',
      },
      {
        x: 38,
        y: 18,
        title: 'Background audio',
        detail: 'Ceiling speakers with zoned volume control.',
        brands: 'Bose, JBL',
      },
      {
        x: 76,
        y: 46,
        title: 'Wayfinding',
        detail: 'Directional screens linked to room bookings.',
        brands: 'Panasonic RoomBook 11, LG',
      },
    ],
  },
];

export const process = [
  {
    title: 'Survey',
    text: 'We visit the space, measure it, photograph it and talk to the people who will use it.',
    items: ['Site survey', 'Requirement capture', 'Network and power check'],
  },
  {
    title: 'Design',
    text: 'A system design with drawings and a bill of quantities, with alternatives where they make sense.',
    items: ['Solution architecture', 'Technical BOQ', 'OEM options'],
  },
  {
    title: 'Supply',
    text: 'We source the equipment through manufacturer channels and coordinate delivery to site.',
    items: ['OEM coordination', 'Logistics', 'Warranty registration'],
  },
  {
    title: 'Integrate',
    text: 'Mounting, cabling, racks and configuration, done neatly and documented as we go.',
    items: ['Mounting and cabling', 'Rack build', 'Device configuration'],
  },
  {
    title: 'Commission',
    text: 'Every scenario tested end to end before we call the room ready.',
    items: ['Testing', 'Audio tuning', 'Acceptance checklist'],
  },
  {
    title: 'Train',
    text: 'Your users and IT team learn the room, with quick guides at the point of use.',
    items: ['User training', 'Admin handover', 'Documentation'],
  },
  {
    title: 'Support',
    text: 'Preventive maintenance, breakdown support and upgrades for the life of the system.',
    items: ['AMC plans', 'OEM escalation', 'Upgrades'],
  },
];

export const industries = [
  {
    name: 'Corporate & IT',
    line: 'Boardrooms, hybrid floors and experience centres.',
    image: '/images/photos/ind-corporate.jpg',
  },
  {
    name: 'Banking & finance',
    line: 'Secure meeting rooms and branch signage.',
    image: '/images/photos/ind-bfsi.jpg',
  },
  {
    name: 'Higher education',
    line: 'Lecture halls, labs and convocation auditoriums.',
    image: '/images/photos/ind-education.jpg',
  },
  {
    name: 'Research & government',
    line: 'Seminar halls, video walls and conference suites.',
    image: '/images/photos/ind-research.jpg',
  },
  {
    name: 'Healthcare',
    line: 'Training rooms, tele-consult and patient information.',
    image: '/images/photos/ind-healthcare.jpg',
  },
  {
    name: 'Manufacturing',
    line: 'Plant meeting rooms, training halls and shop-floor displays.',
    image: '/images/photos/ind-manufacturing.jpg',
  },
  {
    name: 'Hospitality',
    line: 'Banquet audio, lobby displays and event spaces.',
    image: '/images/photos/ind-hospitality.jpg',
  },
];

/** Logo strip. `file` lives in /public/images/brands; `ratio` is width / height of the artwork. */
export const brands = [
  { name: 'Logitech', file: 'logitech.svg', ratio: 3.29 },
  { name: 'Barco', file: 'barco.svg', ratio: 4.88 },
  { name: 'LG', file: 'lg.svg', ratio: 2.27 },
  { name: 'Samsung', file: 'samsung.svg', ratio: 6.54 },
  { name: 'Cisco', file: 'cisco.svg', ratio: 1.9 },
  { name: 'Shure', file: 'shure.png', ratio: 5.46 },
  { name: 'Sennheiser', file: 'sennheiser.svg', ratio: 1.33 },
  { name: 'Crestron', file: 'crestron.png', ratio: 8.9 },
  { name: 'Yamaha', file: 'yamahacorporation.svg', ratio: 1 },
  { name: 'Poly', file: 'poly.svg', ratio: 0.86 },
  { name: 'Bose', file: 'bose.svg', ratio: 8.48 },
  { name: 'JBL', file: 'jbl.svg', ratio: 1.78 },
  { name: 'Electro-Voice', file: 'electrovoice.svg', ratio: 5.09 },
  { name: 'Panasonic', file: 'panasonic.svg', ratio: 6.52 },
  { name: 'Sony', file: 'sony.svg', ratio: 5.69 },
  { name: 'Epson', file: 'epson.svg', ratio: 4.15 },
  { name: 'ViewSonic', file: 'viewsonic.svg', ratio: 6.16 },
  { name: 'Zoom', file: 'zoom.svg', ratio: 4.4 },
];

export interface Reference {
  name: string;
  /** File in /public/images/clients, with its pixel size. Omitted when no reliable logo exists. */
  logo?: { file: string; w: number; h: number; dark?: boolean };
}

/**
 * Historical reference names supplied by SAAN, with each organisation's public
 * logo. Confirm permission to publish each name and logo before launch.
 */
export const references: { education: Reference[]; enterprise: Reference[] } = {
  education: [
    {
      name: 'Indian Institute of Science',
      logo: { file: 'iisc.png', w: 271, h: 240 },
    },
    { name: 'IIT Bombay', logo: { file: 'iitb.png', w: 246, h: 240 } },
    {
      name: 'Indian Academy of Sciences',
      logo: { file: 'ias.png', w: 240, h: 240 },
    },
    { name: 'KSCST', logo: { file: 'kscst.png', w: 389, h: 240 } },
    {
      name: 'Central University of Karnataka',
      logo: { file: 'cuk.png', w: 225, h: 240 },
    },
    {
      name: 'Manipal Global Education',
      logo: { file: 'manipalglobal.png', w: 273, h: 43 },
    },
    { name: 'JSS Mysore', logo: { file: 'jss.png', w: 497, h: 240 } },
    { name: 'NIE Mysore', logo: { file: 'nie.png', w: 188, h: 240 } },
    { name: 'Madurai Institute of Management' },
    {
      name: 'Acharya School of Business Management',
      logo: { file: 'acharya.png', w: 194, h: 240 },
    },
    { name: 'Greenwood International' },
    {
      name: "St. Joseph's Boys High School",
      logo: { file: 'sjbhs.png', w: 135, h: 123 },
    },
  ],
  enterprise: [
    { name: 'Hewlett Packard', logo: { file: 'hp.png', w: 240, h: 240 } },
    { name: 'IBM', logo: { file: 'ibm.png', w: 500, h: 187 } },
    { name: 'Cisco', logo: { file: 'cisco.png', w: 455, h: 240 } },
    { name: 'GE', logo: { file: 'generalelectric.png', w: 240, h: 240 } },
    { name: 'ITC Infotech', logo: { file: 'itcinfotech.png', w: 461, h: 240 } },
    { name: 'ITI Limited', logo: { file: 'iti.png', w: 325, h: 240 } },
    { name: 'Myntra', logo: { file: 'myntra.png', w: 480, h: 157 } },
    {
      name: 'Himalaya Drug Company',
      logo: { file: 'himalaya.png', w: 500, h: 178 },
    },
    { name: 'Amara Raja', logo: { file: 'amararaja.png', w: 500, h: 130 } },
    {
      name: 'Centum Electronics',
      logo: { file: 'centum.png', w: 497, h: 140 },
    },
    { name: 'A. O. Smith', logo: { file: 'aosmith.png', w: 493, h: 133 } },
    {
      name: 'Karnataka Milk Federation',
      logo: { file: 'kmf.png', w: 387, h: 240 },
    },
    {
      name: 'Himatsingka Seide',
      logo: { file: 'himatsingka.png', w: 719, h: 168, dark: true },
    },
    { name: 'HomeLane', logo: { file: 'homelane.png', w: 663, h: 98 } },
    { name: 'Greenpeace', logo: { file: 'greenpeace.png', w: 500, h: 78 } },
    { name: 'Emulex', logo: { file: 'emulex.png', w: 500, h: 61 } },
  ],
};

export const recognition = [
  { year: '2015', title: 'Lifesize Partner Program' },
  { year: '2017', title: 'APAC Partner Enablement Award' },
];
