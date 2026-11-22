/**
 * Works around a Next.js static-export bug on Windows only.
 *
 * The client router prefetches flat segment files such as
 *   /products/__next.products.__PAGE__.txt
 * but on Windows `next build` joins the segment path with backslashes and writes
 *   /products/__next.products/__PAGE__.txt
 * so every prefetch 404s. This renames them to the flat form. On Linux (and on
 * Cloudflare's builder) the export is already correct and this does nothing.
 */
import { readdir, rename, rm } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.platform !== 'win32') process.exit(0);

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');

async function files(dir) {
  const list = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) list.push(...(await files(p)));
    else list.push(p);
  }
  return list;
}

let moved = 0;
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (
      !e.isDirectory() ||
      e.name === '_next' ||
      e.name === '_img' ||
      e.name === 'images'
    )
      continue;
    const p = join(dir, e.name);
    if (!e.name.startsWith('__next.')) {
      await walk(p);
      continue;
    }
    for (const f of await files(p)) {
      const flat = [e.name, ...relative(p, f).split(/[\\/]/)].join('.');
      await rename(f, join(dir, flat));
      moved++;
    }
    await rm(p, { recursive: true });
  }
}

await walk(out);
if (moved) console.log(`fix-windows-export: flattened ${moved} segment files`);
