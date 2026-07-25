/**
 * Content placeholder audit.
 *
 * Reports every unresolved piece of content SAAN has not yet supplied or
 * confirmed. Reporting-only during development; a hard launch gate under
 * `--strict`, which exits non-zero while anything remains.
 *
 *   npm run audit:content
 *   npm run audit:content -- --strict
 *
 * Three things count as unresolved, because a placeholder can enter the site
 * three ways:
 *
 *   1. A literal `[CONTENT REQUIRED: …]` marker in source or content.
 *   2. `missing('…')` in the site configuration — a contact detail, social
 *      profile or registration number that has not been supplied.
 *   3. `<ContentRequired what="…">` / `<ContentRequiredBlock what="…">` in a
 *      component — a section rendering its structure without real content.
 *
 * Grepping only for (1) would have reported three items while the site
 * actually carried well over a dozen.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SEARCH_DIRS = ['src'];
const EXTENSIONS = ['.ts', '.tsx', '.css'];

const PATTERNS: Array<{ kind: string; regex: RegExp }> = [
  { kind: 'marker', regex: /\[CONTENT REQUIRED:\s*([^\]]*)\]/g },
  { kind: 'config', regex: /\bmissing\(\s*['"`]([^'"`]+)['"`]/g },
  {
    kind: 'component',
    regex: /<ContentRequired(?:Block)?[^>]*?\bwhat=["']([^"']+)["']/g,
  },
];

/** Files that define the mechanism rather than use it. */
const IGNORED = [
  join('src', 'lib', 'content-required.ts'),
  join('src', 'components', 'ui', 'content-required.tsx'),
  join('src', 'tests'),
];

interface Finding {
  file: string;
  line: number;
  kind: string;
  description: string;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'node_modules' || entry === '.next') continue;
      walk(full, files);
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

function audit(): Finding[] {
  const findings: Finding[] = [];

  for (const dir of SEARCH_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const relativePath = relative(ROOT, file);
      if (IGNORED.some((ignored) => relativePath.startsWith(ignored))) continue;

      const lines = readFileSync(file, 'utf8').split('\n');
      lines.forEach((line, index) => {
        for (const { kind, regex } of PATTERNS) {
          // Fresh lastIndex per line: the regexes are global.
          regex.lastIndex = 0;
          for (const match of line.matchAll(regex)) {
            findings.push({
              file: relativePath,
              line: index + 1,
              kind,
              description: (match[1] ?? '').trim(),
            });
          }
        }
      });
    }
  }

  return findings;
}

const strict = process.argv.includes('--strict');
const findings = audit();

if (findings.length === 0) {
  console.log('✓ No unresolved content placeholders.');
  process.exit(0);
}

const byKind = new Map<string, number>();
for (const finding of findings) {
  byKind.set(finding.kind, (byKind.get(finding.kind) ?? 0) + 1);
}

console.log(
  `\n${findings.length} unresolved content placeholder${
    findings.length === 1 ? '' : 's'
  } (${[...byKind].map(([k, n]) => `${n} ${k}`).join(', ')}):\n`
);

const grouped = new Map<string, Finding[]>();
for (const finding of findings) {
  const list = grouped.get(finding.file) ?? [];
  list.push(finding);
  grouped.set(finding.file, list);
}

for (const [file, items] of [...grouped].sort()) {
  console.log(`  ${file}`);
  for (const item of items) {
    console.log(
      `    ${String(item.line).padStart(4)}  [${item.kind}] ${item.description}`
    );
  }
  console.log('');
}

console.log('Every item above has a row in docs/CONTENT_TODO.md.');

if (strict) {
  console.error(
    '\n✗ Launch builds must not contain unresolved content placeholders.'
  );
  process.exit(1);
}

console.log('(Reporting only. Use --strict to fail the build.)\n');
