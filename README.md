# SAAN website

New website for **Saan Protocol Experts Private Limited** — a greenfield build,
independent of the existing WordPress site.

> The live site at `saanpro.com` is untouched. No DNS, hosting or email change
> happens without explicit written approval.

## Quick start

```bash
npm install
npm run dev
```

The application runs with **no environment configuration at all**. Copy
`.env.example` to `.env.local` only when you need a non-default site URL.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, strict + `noUncheckedIndexedAccess` |
| `npm run format` / `format:check` | Prettier |
| `npm run test:unit` | Vitest — tokens, content, routes, config |
| `npm run test:e2e` | Playwright — all projects |
| `npm run test:a11y` | axe accessibility sweep only |
| `npm run validate:content` | Parse all content through its Zod schema |
| `npm run audit:content` | List unresolved `[CONTENT REQUIRED]` items |
| `npm run lhci` | Lighthouse CI |
| `npm run verify` | lint → typecheck → validate → unit → build |

## Architecture

**Content adapter.** Every page reads content through the `ContentSource`
interface in `src/content/source/`. A local implementation backed by typed
modules ships today; a Sanity implementation drops in behind the same interface
later. The application builds and runs with no CMS credentials, so content
delivery is never on the critical path.

**Schemas are the contract.** Zod schemas in `src/content/schemas/` are shared
by the local source, the CMS and the validation scripts, so a record that would
break a page cannot be published from either side.

**Central configuration.** Every company detail — legal name, address, phone
numbers, emails, social profiles, canonical domain — lives in
`src/config/site.ts`. An ESLint rule fails the build if a phone number or the
domain is written literally anywhere else.

**Content integrity.** Facts SAAN has not confirmed are represented by visible
`[CONTENT REQUIRED]` markers, never by invented values. `npm run audit:content`
lists them; the launch build fails while any remain.

```
src/
├── app/            routes, sitemap, robots, error and 404 states
├── components/     layout, navigation, sections, cards, ui, media, interactive
├── config/         site.ts, navigation.ts, routes.ts
├── content/        schemas (Zod) · data (local) · source (adapter)
├── lib/            metadata, redirects, analytics, content-required, utils
├── styles/         tokens.css, globals.css
└── tests/          unit (Vitest) · e2e (Playwright)
docs/               planning, design, content, SEO and launch documentation
```

## Design system

The palette is derived from SAAN's own logo — `#E38700` amber with near-black —
rather than invented. Full token set and the binding contrast rules are in
[`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

Two rules are enforced by tests rather than convention:

- Amber-500 is a **fill**, never text (2.72:1 on white) and never a focus ring.
  Focus uses amber-600 on light, amber-400 on dark.
- Container widths are named `--layout-*`. `--container-*` is a reserved
  Tailwind v4 namespace that silently redefines `w-full`.

## Documentation

Planning and launch documentation lives in [`docs/`](docs/) — start with
[`PROJECT_PLAN.md`](docs/PROJECT_PLAN.md). Outstanding content and decisions
requiring SAAN are tracked in [`CONTENT_TODO.md`](docs/CONTENT_TODO.md).
