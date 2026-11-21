export type ProductCategory = 'conferencing' | 'control' | 'audio' | 'display';

export const productCategories: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'conferencing', label: 'Video conferencing' },
  { id: 'display', label: 'Displays & sharing' },
  { id: 'audio', label: 'Audio' },
  { id: 'control', label: 'Control & booking' },
];

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  image: string;
  /** Intrinsic size of the trimmed image, for layout. */
  w: number;
  h: number;
  summary: string;
  highlights: string[];
  solutions: string[];
}

/**
 * Representative products SAAN specifies. Listing a product here is not a
 * claim of authorised-distributor status; availability is confirmed per quote.
 */
export const products: Product[] = [
  {
    id: 'logitech-rally-bar',
    brand: 'Logitech',
    name: 'Rally Bar',
    category: 'conferencing',
    image: '/images/products/logitech-rally-bar.png',
    w: 1081,
    h: 228,
    summary: 'All-in-one video bar for medium rooms, with a motorised pan, tilt and zoom camera and room-filling audio.',
    highlights: ['Motorised PTZ with 15x HD zoom', 'AI framing and speaker view', 'Teams, Zoom and Meet appliance modes', 'Expandable with Mic Pods and Sight'],
    solutions: ['boardrooms', 'video-conferencing'],
  },
  {
    id: 'logitech-rally-bar-mini',
    brand: 'Logitech',
    name: 'Rally Bar Mini',
    category: 'conferencing',
    image: '/images/products/logitech-rally-bar-mini.png',
    w: 949,
    h: 180,
    summary: 'Compact all-in-one video bar for small and huddle rooms, with AI framing and built-in audio.',
    highlights: ['Built for small and huddle rooms', 'Automatic framing', 'Appliance or USB mode', 'Single cable to the display'],
    solutions: ['video-conferencing', 'smart-classrooms'],
  },
  {
    id: 'logitech-sight',
    brand: 'Logitech',
    name: 'Sight',
    category: 'conferencing',
    image: '/images/products/logitech-sight.png',
    w: 312,
    h: 1007,
    summary: 'Tabletop companion camera that adds a centre-of-table view, so people at the far end of the table are seen clearly.',
    highlights: ['Dual-lens, 315-degree coverage', 'Works alongside Rally Bar', 'Intelligent multi-camera switching', 'Built-in microphones'],
    solutions: ['boardrooms', 'video-conferencing'],
  },
  {
    id: 'logitech-tap-ip',
    brand: 'Logitech',
    name: 'Tap IP',
    category: 'control',
    image: '/images/products/logitech-tap-ip.png',
    w: 892,
    h: 198,
    summary: 'Network-connected touch controller for one-touch join, mountable on the table or wall.',
    highlights: ['10.1-inch touchscreen', 'Power over Ethernet', 'Table, wall and riser mounting', 'Teams, Zoom and Meet'],
    solutions: ['boardrooms', 'video-conferencing', 'control-automation'],
  },
  {
    id: 'logitech-tap-scheduler',
    brand: 'Logitech',
    name: 'Tap Scheduler',
    category: 'control',
    image: '/images/products/logitech-tap-scheduler.png',
    w: 1069,
    h: 716,
    summary: 'Room booking panel for outside the meeting room, showing availability and allowing walk-up bookings.',
    highlights: ['10.1-inch touchscreen', 'Glass or wall mounting', 'Status lights visible down the corridor', 'Microsoft 365 and Google calendars'],
    solutions: ['boardrooms', 'video-conferencing'],
  },
  {
    id: 'logitech-mic-pod',
    brand: 'Logitech',
    name: 'Rally Mic Pod',
    category: 'audio',
    image: '/images/products/logitech-mic-pod.png',
    w: 1177,
    h: 732,
    summary: 'Modular table microphone for Rally systems. Add pods as the table grows so every seat is picked up.',
    highlights: ['Daisy-chain expansion', 'One-touch mute with status ring', 'Extension cables and mounts', 'Graphite and white finishes'],
    solutions: ['boardrooms', 'video-conferencing'],
  },
  {
    id: 'barco-clickshare-cx50',
    brand: 'Barco',
    name: 'ClickShare CX-50 Gen 2',
    category: 'display',
    image: '/images/products/barco-clickshare-cx50.jpg',
    w: 763,
    h: 1074,
    summary: 'Wireless conferencing for medium rooms. Guests click a button to share and run calls through the room camera and audio.',
    highlights: ['One-click wireless sharing', 'Bring-your-own-meeting with room peripherals', 'Works with any conferencing platform', 'Centrally managed'],
    solutions: ['boardrooms', 'video-conferencing'],
  },
  {
    id: 'lg-105bm5p',
    brand: 'LG',
    name: '105BM5P Ultra Stretch',
    category: 'display',
    image: '/images/products/lg-105bm5p.jpg',
    w: 1400,
    h: 609,
    summary: '105-inch 21:9 ultra-stretch commercial display for long boardroom tables, lobbies and signage.',
    highlights: ['105-inch 21:9 panel', '5K resolution', 'Split screen for content and people', 'Commercial-grade operation'],
    solutions: ['boardrooms', 'digital-signage', 'led-video-walls'],
  },
  {
    id: 'sharp-pn-lc752',
    brand: 'Sharp',
    name: 'PN-LC752 Interactive Display',
    category: 'display',
    image: '/images/products/sharp-pn-lc752.jpg',
    w: 1400,
    h: 937,
    summary: '75-inch 4K interactive display for classrooms and huddle rooms, with precise multi-touch writing.',
    highlights: ['75-inch 4K panel', 'Precision multi-touch', 'Whiteboarding and annotation', 'OPS computer option'],
    solutions: ['smart-classrooms', 'digital-signage'],
  },
  {
    id: 'panasonic-roombook-7',
    brand: 'Panasonic',
    name: 'RoomBook 7',
    category: 'control',
    image: '/images/products/panasonic-roombook-7.jpg',
    w: 1400,
    h: 935,
    summary: '7.5-inch anti-glare e-paper room scheduler. Readable in any light, with very low power draw.',
    highlights: ['7.5-inch e-paper display', 'Microsoft 365 and Google calendar support', 'Anti-glare, wide viewing angle', 'Low power operation'],
    solutions: ['video-conferencing', 'digital-signage'],
  },
  {
    id: 'shure-mxa925',
    brand: 'Shure',
    name: 'MXA925 Ceiling Array',
    category: 'audio',
    image: '/images/products/shure-mxa925.png',
    w: 906,
    h: 905,
    summary: 'Ceiling array microphone that keeps tables clear while covering the whole room with steerable pickup.',
    highlights: ['Steerable coverage areas', 'Ceiling tile or suspended mounting', 'Network audio', 'Designed for meeting rooms and classrooms'],
    solutions: ['boardrooms', 'professional-audio'],
  },
  {
    id: 'sennheiser-tcc2',
    brand: 'Sennheiser',
    name: 'TeamConnect Ceiling 2',
    category: 'audio',
    image: '/images/products/sennheiser-tcc2.png',
    w: 660,
    h: 655,
    summary: 'Ceiling microphone with dynamic beamforming that follows the speaker around the room.',
    highlights: ['Dynamic beamforming', 'Ceiling or suspended installation', 'Dante network audio', 'Medium and large rooms'],
    solutions: ['professional-audio', 'smart-classrooms'],
  },
  {
    id: 'crestron-tsw-1070',
    brand: 'Crestron',
    name: 'TSW-1070 Touch Screen',
    category: 'control',
    image: '/images/products/crestron-tsw-1070.png',
    w: 849,
    h: 775,
    summary: 'Wall-mount touch screen for room control and scheduling, programmed for each room.',
    highlights: ['10.1-inch touch screen', 'Room control or scheduling modes', 'Power over Ethernet', 'Custom interface design'],
    solutions: ['control-automation', 'led-video-walls'],
  },
  {
    id: 'yamaha-dm3',
    brand: 'Yamaha',
    name: 'DM3 Digital Mixer',
    category: 'audio',
    image: '/images/products/yamaha-dm3.jpg',
    w: 1168,
    h: 846,
    summary: 'Compact digital mixing console for halls, auditoriums and events, with touchscreen control.',
    highlights: ['Compact desktop format', 'Touchscreen workflow', 'Dante-equipped models', 'Scene recall for repeat events'],
    solutions: ['professional-audio'],
  },
  {
    id: 'qsys-core-8-flex',
    brand: 'Q-SYS',
    name: 'Core 8 Flex',
    category: 'audio',
    image: '/images/products/qsys-core-8-flex.jpg',
    w: 1400,
    h: 419,
    summary: 'Audio, video and control processor for meeting spaces, with flexible analogue inputs and outputs.',
    highlights: ['DSP, control and network audio in one', 'Flexible analogue I/O', 'Software-based scaling', 'Echo cancellation for conferencing'],
    solutions: ['professional-audio', 'control-automation'],
  },
];

export function getProducts(ids: string[]) {
  return ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));
}
