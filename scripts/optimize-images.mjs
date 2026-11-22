/**
 * Post-build step for the static export: writes a resized WebP of every JPG/PNG
 * in public/images at each width next/image can ask for, matching the loader in
 * src/lib/image-loader.ts:
 *
 *   public/images/photos/hero.jpg  ->  out/_img/images/photos/hero.1080.webp
 *
 * Images are never enlarged: widths above the original reuse the full-size file.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const outDir = join(root, 'out', '_img');
const RASTER = /\.(jpe?g|png)$/i;

const sizes = JSON.parse(
  await readFile(join(root, 'src/lib/image-sizes.json'), 'utf8')
);
const widths = [...new Set([...sizes.deviceSizes, ...sizes.imageSizes])].sort(
  (a, b) => a - b
);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (RASTER.test(entry.name)) yield path;
  }
}

async function optimise(file) {
  const input = await readFile(file);
  const { width: original } = await sharp(input).metadata();
  const rel = relative(publicDir, file).replace(/\\/g, '/').replace(RASTER, '');
  const target = join(outDir, rel);
  await mkdir(dirname(target), { recursive: true });
  // Logos and product cut-outs are PNGs with fine edges: a little more quality.
  const quality = /\.png$/i.test(file) ? 82 : 75;
  const encoded = new Map();
  let bytes = 0;
  for (const w of widths) {
    const size = Math.min(w, original);
    if (!encoded.has(size)) {
      encoded.set(
        size,
        await sharp(input)
          .resize({ width: size })
          .webp({ quality, effort: 5 })
          .toBuffer()
      );
    }
    const buf = encoded.get(size);
    bytes += buf.length;
    await writeFile(`${target}.${w}.webp`, buf);
  }
  return bytes;
}

const started = Date.now();
const files = [];
for await (const f of walk(join(publicDir, 'images'))) files.push(f);

let total = 0;
const queue = [...files];
await Promise.all(
  Array.from({ length: 4 }, async () => {
    for (let f = queue.shift(); f; f = queue.shift())
      total += await optimise(f);
  })
);

console.log(
  `optimize-images: ${files.length} images x ${widths.length} widths, ` +
    `${(total / 1048576).toFixed(1)} MB in ${((Date.now() - started) / 1000).toFixed(1)} s`
);
