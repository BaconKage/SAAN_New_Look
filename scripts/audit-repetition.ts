/**
 * Content repetition audit.
 *
 * Fetches the rendered pages and looks for sentences that appear on several of
 * them. Working from rendered output rather than from the content files is
 * deliberate: it catches paragraphs hard-coded into a shared page template,
 * which is exactly how the Phase 3A review found the same closing paragraph on
 * all eight solution pages.
 *
 * The shared header and footer are stripped first, so genuine site chrome does
 * not drown out the signal.
 *
 *   npm run audit:repetition            (server must be running)
 *   npm run audit:repetition -- --strict
 */

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

/** Pages whose body copy should be distinct from one another. */
const paths = [
  '/',
  '/solutions',
  '/solutions/meeting-and-collaboration-spaces',
  '/solutions/digital-signage',
  '/solutions/led-and-video-walls',
  '/solutions/professional-audio-and-auditoriums',
  '/solutions/interactive-learning-spaces',
  '/solutions/commercial-displays-and-projection',
  '/solutions/room-automation-and-control',
  '/solutions/managed-av-services',
  '/industries',
  '/industries/corporate',
  '/industries/education',
  '/industries/healthcare',
  '/industries/retail',
  '/industries/hospitality',
  '/industries/manufacturing',
  '/industries/government-and-public-sector',
  '/services',
  '/services/consultation-and-requirement-analysis',
  '/services/site-survey-and-system-design',
  '/services/supply-and-installation',
  '/services/integration-and-commissioning',
  '/services/training-and-handover',
  '/services/amc-and-preventive-maintenance',
  '/services/technical-support',
  '/services/upgrades-and-lifecycle-management',
  '/about',
  '/contact',
  '/support',
  '/projects',
  '/partners',
  '/resources',
  '/recognition',
  '/plan-your-project',
];

/**
 * Repetition that is deliberate.
 *
 * Two things legitimately repeat across pages: a positioning statement we want
 * stated identically everywhere, and a disclaimer that must not be reworded.
 * They are listed here with a reason so the report stays signal — an audit that
 * always shows the same known items is an audit people stop reading.
 *
 * Cross-link labels (a solution's title and outcome used as a link on an
 * industry page) are also expected: they are navigation, not body copy.
 */
const intentional: Array<{ match: string; reason: string }> = [
  {
    match: 'SAAN studies the space, the way people work in it',
    reason:
      'Positioning statement specified in the brief; stated identically on every solution page by design.',
  },
  {
    match: 'Illustrative system overview',
    reason:
      'Required disclaimer on every system diagram. Must not be reworded per page.',
  },
  {
    match: 'Sectors we deliver this in',
    reason: 'Cross-link navigation rail, not body copy.',
  },
  {
    match: 'Every room is different',
    reason:
      'Opening clause of the same brief-specified positioning statement, split by sentence segmentation.',
  },
  {
    match: 'The problems that bring people to us',
    reason: 'Section heading, not body copy.',
  },
];

/** Cross-link rails render a title plus its one-line outcome. */
const crossLinkLabels = [
  'Managed AV services Rooms that keep working',
  'Digital signage and content management The right message',
  'Commercial displays and projection Display technology chosen',
  'Meeting and collaboration spaces Rooms that connect',
  'LED and video walls Large-format visuals',
  'Professional audio and auditoriums Every seat hears',
  'Interactive learning spaces Classrooms teachers actually use',
  'Room automation and control One button that does',
];

function classify(sentence: string): string | null {
  const known = intentional.find((entry) => sentence.includes(entry.match));
  if (known) return known.reason;
  if (crossLinkLabels.some((label) => sentence.includes(label))) {
    return 'Cross-link navigation label, not body copy.';
  }
  return null;
}

/** How many pages a sentence may appear on before it counts as repetition. */
const THRESHOLD = 3;

/** Sentences shorter than this are structural labels, not prose. */
const MIN_WORDS = 8;

function extractBodyText(html: string): string {
  // Drop the shared chrome and anything non-textual.
  let text = html
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  text = text
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&mdash;/g, '—')
    .replace(/\s+/g, ' ');

  return text.trim();
}

function toSentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= MIN_WORDS);
}

async function main(): Promise<void> {
  const strict = process.argv.includes('--strict');
  const occurrences = new Map<string, string[]>();

  for (const path of paths) {
    let html: string;
    try {
      const response = await fetch(BASE + path);
      if (!response.ok) {
        console.error(`✗ ${path} returned ${response.status}`);
        process.exitCode = 1;
        continue;
      }
      html = await response.text();
    } catch {
      console.error(
        `\n✗ Could not reach ${BASE}. Start the server first:\n    npm run build && npm run start\n`
      );
      process.exit(1);
    }

    for (const sentence of toSentences(extractBodyText(html))) {
      const pages = occurrences.get(sentence) ?? [];
      if (!pages.includes(path)) pages.push(path);
      occurrences.set(sentence, pages);
    }
  }

  const repeated = [...occurrences.entries()]
    .filter(([, pages]) => pages.length >= THRESHOLD)
    .sort((a, b) => b[1].length - a[1].length);

  const unexpected = repeated.filter(
    ([sentence]) => classify(sentence) === null
  );
  const expected = repeated.filter(([sentence]) => classify(sentence) !== null);

  console.log(
    `\nChecked ${paths.length} pages for sentences repeated on ${THRESHOLD} or more.\n`
  );

  if (unexpected.length === 0) {
    console.log('✓ No unexpected cross-page repetition.\n');
  } else {
    console.log(`✗ ${unexpected.length} unexpected repeated sentence(s):\n`);
    for (const [sentence, pages] of unexpected) {
      console.log(
        `  ${pages.length} pages — "${sentence.slice(0, 110)}${sentence.length > 110 ? '…' : ''}"`
      );
      console.log(
        `      ${pages.slice(0, 6).join(', ')}${pages.length > 6 ? ', …' : ''}\n`
      );
    }
  }

  if (expected.length > 0) {
    console.log(`Intentional repetition (${expected.length}):\n`);
    for (const [sentence, pages] of expected) {
      console.log(
        `  ${pages.length} pages — "${sentence.slice(0, 70)}…"\n      ${classify(sentence)}`
      );
    }
    console.log('');
  }

  if (strict && unexpected.length > 0) {
    console.error('✗ Unexpected repeated body copy across pages.');
    process.exit(1);
  }
}

// Invoked rather than top-level awaited: tsx transforms this file to CJS,
// where top-level await is unavailable.
void main();

export {};
