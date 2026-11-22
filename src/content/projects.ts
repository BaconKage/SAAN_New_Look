/**
 * Delivered work, with SAAN's own site photography (from the company
 * presentation). Claims here follow SAAN's own reference material: confirm the
 * client is happy to be named before launch, as with `references` in home.ts.
 */
export interface ProjectPhoto {
  src: string;
  alt: string;
  /** Short caption shown on the photo. */
  caption: string;
}

export interface Project {
  id: string;
  client: string;
  place: string;
  title: string;
  summary: string;
  stat: { value: string; label: string };
  scope: string[];
  photos: Record<string, ProjectPhoto>;
}

export const iisc: Project = {
  id: 'iisc',
  client: 'Indian Institute of Science',
  place: 'Bengaluru',
  title: 'Turnkey learning spaces at IISc Bengaluru',
  summary:
    'Classrooms, seminar halls and conference rooms delivered complete, from acoustic wall panelling and furniture to projection, document cameras and lecture recording, and handed over ready to teach in.',
  stat: { value: '35+', label: 'departments fitted out end to end' },
  scope: [
    'Acoustic wall panelling',
    'Furniture & seating',
    'Projection & screens',
    'Document cameras',
    'Lecture recording',
    'Turnkey handover',
  ],
  photos: {
    conference: {
      src: '/images/projects/iisc-conference-room.jpg',
      alt: 'U-shaped conference room at IISc with a projection screen, whiteboard, acoustic wall panels and a camera on a tripod',
      caption: 'Conference room',
    },
    seminar: {
      src: '/images/projects/iisc-seminar-hall.jpg',
      alt: 'Seminar hall at IISc with a projection screen between whiteboards, tablet-arm seating, wooden flooring and a recording camera',
      caption: 'Seminar hall',
    },
    lectern: {
      src: '/images/projects/iisc-seminar-lectern.jpg',
      alt: "Lecturer's desk at IISc with a document camera, facing rows of red tablet-arm chairs in front of acoustic wall panels",
      caption: 'Lectern & document camera',
    },
    seating: {
      src: '/images/projects/iisc-seminar-seating.jpg',
      alt: "Seminar hall at IISc seen from the lecturer's desk, with a document camera and rows of tablet-arm chairs",
      caption: 'Seminar seating',
    },
    classroom: {
      src: '/images/projects/iisc-classroom-projection.jpg',
      alt: 'IISc classroom with a ceiling projector, projection screen and whiteboard above desks, with red and grey acoustic wall panels',
      caption: 'Classroom',
    },
    desks: {
      src: '/images/projects/iisc-classroom-desks.jpg',
      alt: 'IISc classroom with rows of desks, a camera on a tripod and dark acoustic wall finish',
      caption: 'Classroom with recording',
    },
  },
};

export const projects = { iisc } as const;
export type ProjectId = keyof typeof projects;
