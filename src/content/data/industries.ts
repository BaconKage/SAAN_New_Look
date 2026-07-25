import type { IndustrySummary } from '@/content/schemas';

/** The seven sectors SAAN serves. */
export const industries: IndustrySummary[] = [
  {
    slug: 'corporate',
    title: 'Corporate',
    navLabel: 'Corporate',
    outcome: 'Meeting estates that behave the same in every room.',
    summary:
      'Offices where a visitor can walk into any room and start a meeting without help, and where facilities can see what is working across the floor.',
    icon: 'building-2',
    environments: [
      'Boardrooms and executive suites',
      'Huddle and focus rooms',
      'Training and town-hall spaces',
      'Reception and workplace signage',
    ],
    image: {
      id: 'IND-corporate-hero',
      src: null,
      alt: 'A corporate boardroom fitted with a display and conferencing system',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Corporate AV Solutions and Meeting Rooms | SAAN',
      metaDescription:
        'AV systems for corporate offices: consistent meeting rooms, boardrooms, training spaces and workplace signage, designed, installed and supported by SAAN.',
    },
    order: 1,
  },
  {
    slug: 'education',
    title: 'Education',
    navLabel: 'Education',
    outcome: 'Teaching technology that gets used, not switched off.',
    summary:
      'Schools, colleges and universities where equipment has to survive daily use, work for teachers with no technical support nearby, and scale across many identical rooms.',
    icon: 'graduation-cap',
    environments: [
      'Classrooms and interactive teaching spaces',
      'Lecture theatres and seminar rooms',
      'Auditoriums and assembly halls',
      'Campus signage and wayfinding',
    ],
    image: {
      id: 'IND-education-hero',
      src: null,
      alt: 'A lecture theatre with projection and audio systems installed',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'AV Solutions for Schools and Universities | SAAN',
      metaDescription:
        'Classroom, lecture theatre and auditorium technology for education. Robust systems, consistent design across campuses, and training built into handover.',
    },
    order: 2,
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    navLabel: 'Healthcare',
    outcome: 'Reliable systems in environments that cannot pause.',
    summary:
      'Hospitals and medical institutions where installation must work around live operations, infection-control requirements and strict confidentiality.',
    icon: 'heart-pulse',
    environments: [
      'Clinical training and demonstration theatres',
      'Conference and academic rooms',
      'Waiting-area and wayfinding displays',
      'Administrative meeting spaces',
    ],
    image: {
      id: 'IND-healthcare-hero',
      src: null,
      alt: 'A hospital training theatre with display and audio systems',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Healthcare AV and Display Solutions | SAAN',
      metaDescription:
        'AV systems for hospitals and medical institutions: training theatres, conference rooms, wayfinding and information displays, fitted around live operations.',
    },
    order: 3,
  },
  {
    slug: 'retail',
    title: 'Retail',
    navLabel: 'Retail',
    outcome: 'Store screens that stay current across every location.',
    summary:
      'Retail environments where content changes constantly, displays run long hours, and one team needs to publish to many sites without visiting them.',
    icon: 'shopping-bag',
    environments: [
      'In-store promotional displays',
      'Window and high-brightness screens',
      'Menu boards and price displays',
      'Multi-site signage networks',
    ],
    image: {
      id: 'IND-retail-hero',
      src: null,
      alt: 'In-store digital signage displays showing promotional content',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Retail Digital Signage and Display Solutions | SAAN',
      metaDescription:
        'Retail signage and display systems built for long duty cycles and frequent content changes, with central publishing across stores and remote monitoring.',
    },
    order: 4,
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    navLabel: 'Hospitality',
    outcome: 'Spaces that adapt from conference to banquet in an hour.',
    summary:
      'Hotels and venues where the same room hosts a board meeting in the morning and a wedding in the evening, and where guest-facing technology has to look effortless.',
    icon: 'concierge-bell',
    environments: [
      'Banquet and conference halls',
      'Divisible meeting spaces',
      'Lobby and guest information displays',
      'Restaurant and event signage',
    ],
    image: {
      id: 'IND-hospitality-hero',
      src: null,
      alt: 'A hotel banquet hall configured with audio and display systems',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Hospitality AV Solutions for Hotels and Venues | SAAN',
      metaDescription:
        'AV systems for hotels, banquet halls and venues: divisible room audio, conference technology, guest displays and signage that reconfigure between events.',
    },
    order: 5,
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    navLabel: 'Manufacturing',
    outcome: 'Information visible where the work happens.',
    summary:
      'Plants and industrial sites where displays must survive the environment, communicate at a glance, and connect the shop floor to the offices above it.',
    icon: 'factory',
    environments: [
      'Production and shop-floor displays',
      'Control and monitoring rooms',
      'Safety and compliance signage',
      'Plant meeting and training rooms',
    ],
    image: {
      id: 'IND-manufacturing-hero',
      src: null,
      alt: 'Shop-floor information displays in a manufacturing plant',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Manufacturing and Industrial AV Solutions | SAAN',
      metaDescription:
        'Display and AV systems for manufacturing: shop-floor information, control rooms, safety signage and meeting spaces built for demanding environments.',
    },
    order: 6,
  },
  {
    slug: 'government-and-public-sector',
    title: 'Government and public sector',
    navLabel: 'Government',
    outcome: 'Documented systems that stand up to scrutiny.',
    summary:
      'Public institutions where procurement is formal, documentation matters as much as delivery, and systems must remain serviceable for many years.',
    icon: 'landmark',
    environments: [
      'Council chambers and committee rooms',
      'Command and control rooms',
      'Training and induction facilities',
      'Public information displays',
    ],
    image: {
      id: 'IND-government-and-public-sector-hero',
      src: null,
      alt: 'A council chamber with installed audio and display systems',
      width: 2400,
      height: 1029,
    },
    seo: {
      metaTitle: 'Government and Public Sector AV Solutions | SAAN',
      metaDescription:
        'AV systems for government and public institutions: chambers, control rooms, training facilities and displays, with the documentation procurement needs.',
    },
    order: 7,
  },
];
