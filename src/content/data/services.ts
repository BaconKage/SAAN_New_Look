import type { ProcessStage, ServiceSummary } from '@/content/schemas';

/**
 * The eight delivery services.
 *
 * These pages carry a disproportionate amount of the site's credibility,
 * because almost no competitor publishes what actually happens between the
 * purchase order and a working room.
 */
export const services: ServiceSummary[] = [
  {
    slug: 'consultation-and-requirement-analysis',
    title: 'Consultation and requirement analysis',
    navLabel: 'Consultation',
    outcome: 'Understand the requirement before specifying anything.',
    summary:
      'We start with how the space will be used, who will use it and what has not worked before. The output is a written requirement both sides agree on.',
    icon: 'message-square-text',
    deliverables: [
      'Documented requirement summary',
      'Usage and platform assessment',
      'Indicative approach and options',
    ],
    seo: {
      metaTitle: 'AV Consultation and Requirement Analysis | SAAN',
      metaDescription:
        'SAAN begins every project by understanding how a space will be used, then documents an agreed requirement before any product or system is specified.',
    },
    order: 1,
  },
  {
    slug: 'site-survey-and-system-design',
    title: 'Site survey and system design',
    navLabel: 'Survey & design',
    outcome: 'A design that fits the actual building.',
    summary:
      'We measure the room, check sightlines, power, structure, network and acoustics, then produce a system design that can be built as drawn.',
    icon: 'ruler',
    deliverables: [
      'Site survey report',
      'System schematic and rack elevation',
      'Cable schedule and containment requirements',
    ],
    seo: {
      metaTitle: 'AV Site Survey and System Design Services | SAAN',
      metaDescription:
        'Site surveys and AV system design from SAAN: sightlines, acoustics, power, structure and network checked on site, then documented as a buildable design.',
    },
    order: 2,
  },
  {
    slug: 'supply-and-installation',
    title: 'Supply and installation',
    navLabel: 'Supply & installation',
    outcome: 'Equipment supplied and installed to a finish standard.',
    summary:
      'Procurement, delivery, mounting, rack build, cabling and termination, carried out to a documented standard and coordinated with other trades on site.',
    icon: 'hard-hat',
    deliverables: [
      'Supplied equipment with warranty documentation',
      'Installed and dressed racks',
      'Labelled, terminated and tested cabling',
    ],
    seo: {
      metaTitle: 'AV Equipment Supply and Installation | SAAN',
      metaDescription:
        'SAAN supplies and installs AV equipment to a documented finish standard, coordinating with other trades and handing over tested, labelled systems.',
    },
    order: 3,
  },
  {
    slug: 'integration-and-commissioning',
    title: 'Integration and commissioning',
    navLabel: 'Commissioning',
    outcome: 'A system proven to work before you accept it.',
    summary:
      'Configuration, platform integration, control programming and signal verification, tested against a written commissioning plan rather than a quick demonstration.',
    icon: 'circuit-board',
    deliverables: [
      'Completed commissioning test record',
      'Configured control and platform integration',
      'As-built documentation',
    ],
    seo: {
      metaTitle: 'AV Integration and Commissioning Services | SAAN',
      metaDescription:
        'Integration, control programming and commissioning from SAAN, tested against a written plan and handed over with a test record and as-built documents.',
    },
    order: 4,
  },
  {
    slug: 'training-and-handover',
    title: 'Training and handover',
    navLabel: 'Training & handover',
    outcome: 'Your team confident on day one.',
    summary:
      'Practical training for the people who will actually use and administer the system, with documentation written for them rather than for engineers.',
    icon: 'graduation-cap',
    deliverables: [
      'On-site user and administrator training',
      'Plain-language operating guide',
      'Handover pack with warranties and contacts',
    ],
    seo: {
      metaTitle: 'AV System Training and Handover | SAAN',
      metaDescription:
        'SAAN trains the people who will use and administer the system, and hands over plain-language documentation, warranties and support contacts at handover.',
    },
    order: 5,
  },
  {
    slug: 'amc-and-preventive-maintenance',
    title: 'AMC and preventive maintenance',
    navLabel: 'AMC & maintenance',
    outcome: 'Problems found before your users find them.',
    summary:
      'Scheduled maintenance visits that check, clean, update and test installed systems, so faults are caught during a planned visit rather than during a board meeting.',
    icon: 'calendar-check',
    deliverables: [
      'Scheduled preventive maintenance visits',
      'Visit reports with findings and actions',
      'Consumable and spare-part planning',
    ],
    seo: {
      metaTitle: 'AV AMC and Preventive Maintenance Services | SAAN',
      metaDescription:
        'Annual maintenance contracts and scheduled preventive maintenance from SAAN, with visit reports so faults are found before they interrupt a meeting.',
    },
    order: 6,
  },
  {
    slug: 'technical-support',
    title: 'Technical support',
    navLabel: 'Technical support',
    outcome: 'A clear route to help when something stops working.',
    summary:
      'Logged support requests with a reference number, remote diagnosis where possible and on-site attendance where necessary.',
    icon: 'headset',
    deliverables: [
      'Logged request with a unique reference',
      'Remote diagnosis and resolution where possible',
      'On-site attendance when required',
    ],
    seo: {
      metaTitle: 'AV Technical Support Services | SAAN',
      metaDescription:
        'Technical support for installed AV systems: logged requests with a reference, remote diagnosis where possible and on-site attendance where necessary.',
    },
    order: 7,
  },
  {
    slug: 'upgrades-and-lifecycle-management',
    title: 'Upgrades and lifecycle management',
    navLabel: 'Upgrades & lifecycle',
    outcome: 'Plan the refresh instead of reacting to a failure.',
    summary:
      'Assessment of installed estates, honest advice on what to keep, and staged upgrade plans that reuse what still performs rather than replacing everything.',
    icon: 'refresh-cw',
    deliverables: [
      'Installed estate assessment',
      'Staged upgrade and refresh plan',
      'Reuse and disposal recommendations',
    ],
    seo: {
      metaTitle: 'AV Upgrades and Lifecycle Management | SAAN',
      metaDescription:
        'SAAN assesses installed AV estates and produces staged upgrade plans that reuse equipment that still performs, so refresh budgets go where they matter.',
    },
    order: 8,
  },
];

/** The four-stage delivery process, told as a scroll story on the homepage. */
export const processStages: ProcessStage[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    icon: 'search',
    description:
      'We start with the requirement, not the catalogue. How is the space used, who uses it, what has failed before, and what does success look like once the room is live?',
    outputs: [
      'Documented requirement',
      'Site survey and measurements',
      'Constraints identified early',
    ],
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    icon: 'pencil-ruler',
    description:
      'We design the complete system — displays, audio, control, network and the connections between them — and document it so it can be built, checked and maintained.',
    outputs: [
      'System schematic and rack elevation',
      'Cable schedule',
      'Agreed scope and acceptance criteria',
    ],
  },
  {
    id: 'deliver',
    number: '03',
    title: 'Deliver',
    icon: 'hard-hat',
    description:
      'We supply, install, integrate and commission the system against the design, coordinating with other trades and testing to a written plan before handover.',
    outputs: [
      'Installed and dressed system',
      'Completed commissioning record',
      'User and administrator training',
    ],
  },
  {
    id: 'support',
    number: '04',
    title: 'Support',
    icon: 'life-buoy',
    description:
      'The relationship continues after handover: scheduled maintenance, a clear support route, and lifecycle planning so the system is refreshed deliberately rather than after it fails.',
    outputs: [
      'Preventive maintenance schedule',
      'Logged support with a reference',
      'Lifecycle and upgrade planning',
    ],
  },
];
