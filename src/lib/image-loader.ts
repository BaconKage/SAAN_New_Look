/**
 * next/image loader for the static build (there is no image server on Cloudflare).
 *
 * Every JPG/PNG under /public is pre-resized to WebP at each width in
 * image-sizes.json by scripts/optimize-images.mjs, which runs after `next build`:
 *
 *   /images/photos/hero.jpg at 1080 px  ->  /_img/images/photos/hero.1080.webp
 *
 * SVGs and other files are served as they are. In development the original file
 * is served; the `?w=` only tells next/image that the loader honours width.
 */
const RASTER = /\.(jpe?g|png)$/i;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (
    process.env.NODE_ENV === 'development' ||
    !src.startsWith('/') ||
    !RASTER.test(src)
  ) {
    return `${src}?w=${width}`;
  }
  return `/_img${src.replace(RASTER, '')}.${width}.webp`;
}
