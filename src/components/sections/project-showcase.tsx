import Image from 'next/image';

import { TextLink } from '@/components/ui/button';
import {
  projects,
  type ProjectId,
  type ProjectPhoto,
} from '@/content/projects';
import { cn } from '@/lib/utils';

function Photo({
  photo,
  sizes,
  className,
}: {
  photo: ProjectPhoto;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn('group', className)} data-reveal="clip">
      <figure className="relative size-full overflow-hidden rounded-[var(--radius-card)] border border-white/[0.06] bg-ink-850">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="zoom-img object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
        <figcaption className="label absolute bottom-4 left-4 rounded-full border border-white/10 bg-ink-950/80 px-3 py-1 text-fog-200 backdrop-blur">
          {photo.caption}
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * Home page proof of delivered work: a bento of SAAN's own site photos with the
 * headline number and scope.
 */
export function ProjectSpotlight({ id = 'iisc' }: { id?: ProjectId }) {
  const p = projects[id];
  const ph = p.photos;
  return (
    <section
      aria-labelledby="project-title"
      className="border-t border-white/[0.07] bg-ink-900 py-24 md:py-32"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-signal-400" data-reveal>
              Project spotlight
            </p>
            <h2
              id="project-title"
              className="display mt-5 max-w-[16ch] text-[clamp(2.4rem,4.8vw,4.5rem)] text-fog-50"
              data-reveal
            >
              {p.title}
            </h2>
          </div>
          <p
            className="text-lg leading-relaxed text-fog-400 lg:col-span-5"
            data-reveal
            style={{ ['--d' as string]: 120 }}
          >
            {p.summary}
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12">
          <Photo
            photo={ph.conference!}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[560px]"
          />
          <div
            className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-signal-500 p-8 text-ink-950 md:col-span-5 md:p-10"
            data-reveal
          >
            <p className="display text-[clamp(3.6rem,6.4vw,6rem)] leading-none">
              {p.stat.value}
            </p>
            <div>
              <p
                className="text-xl font-semibold"
                style={{ fontStretch: '108%' }}
              >
                {p.stat.label}
              </p>
              <p className="mt-1 text-ink-950/75">
                {p.client}, {p.place}
              </p>
            </div>
          </div>
          <Photo
            photo={ph.seminar!}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/3] md:col-span-5"
          />
          {/* Stretch to the scope card's height so the row ends level. */}
          <Photo
            photo={ph.lectern!}
            sizes="(min-width: 768px) 32vw, 100vw"
            className="aspect-[4/3] md:col-span-4 md:aspect-auto md:min-h-[300px]"
          />
          <Photo
            photo={ph.classroom!}
            sizes="(min-width: 768px) 32vw, 100vw"
            className="aspect-[4/3] md:col-span-4 md:aspect-auto md:min-h-[300px]"
          />
          <div
            className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-white/[0.08] bg-ink-850 p-8 md:col-span-4"
            data-reveal
          >
            <div>
              <p className="label text-fog-500">Scope</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.scope.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-sm text-fog-200"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <TextLink href="/solutions/acoustics-interiors">
                Acoustics & interiors
              </TextLink>
              <TextLink href="/solutions/smart-classrooms">
                Smart classrooms
              </TextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A three-photo strip of delivered work for solution pages. */
export function ProjectStrip({
  id,
  photos,
}: {
  id: ProjectId;
  photos: string[];
}) {
  const p = projects[id];
  const picked = photos
    .map((k) => p.photos[k])
    .filter((x): x is ProjectPhoto => Boolean(x));
  return (
    <section
      aria-labelledby="delivered-title"
      className="border-t border-white/[0.07] bg-ink-950 py-24 md:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-signal-400" data-reveal>
              Delivered
            </p>
            <h2
              id="delivered-title"
              className="display mt-5 max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50"
              data-reveal
            >
              {p.title}
            </h2>
          </div>
          <p
            className="max-w-md text-lg leading-relaxed text-fog-400"
            data-reveal
            style={{ ['--d' as string]: 120 }}
          >
            <span className="font-semibold text-fog-50">{p.stat.value}</span>{' '}
            {p.stat.label}: {p.scope.slice(0, 4).join(', ').toLowerCase()} and
            more.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {picked.map((photo) => (
            <Photo
              key={photo.src}
              photo={photo}
              sizes="(min-width: 768px) 32vw, 100vw"
              className="aspect-[4/3]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
