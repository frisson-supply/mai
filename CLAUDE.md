# CLAUDE.md

## Project overview

**mai** is a portfolio/agency website built with Astro (SSR, Vercel adapter), React, and Sanity as the CMS. The Sanity Studio is embedded at `/studio`. Content is modelled as schemas and rendered via a block-based sections system.

## Tech stack

- **Astro 5** — SSR, server output, Vercel adapter
- **React 19** — interactive islands (`.tsx`)
- **Sanity v5** — headless CMS, embedded Studio at `/studio`
- **Three.js + GSAP** — 3D / animation (SSR-safe via `vite.ssr.noExternal`)
- **CSS Modules** — scoped styles per component
- **pnpm** — package manager

## Environment variables

Required in `.env` (see `.env.example`):

```
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=        # optional — only needed for private datasets
```

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm preview      # preview production build
pnpm lint         # ESLint on src/
pnpm lint:css     # Stylelint on src/**/*.css
```

## Project structure

```
src/
  components/     # reusable UI components (Astro + React)
    blocks/       # page-builder block components
  layouts/        # shared page layout
  lib/            # sanity client + GROQ queries
  pages/          # file-based routing
    index.astro           # home
    about/                # about page
    works/[slug]/         # dynamic project pages
  schemas/        # Sanity schema definitions
  studio/         # Sanity Studio customisation (Dashboard)
  utils/          # shared utilities (cn.ts)
  global.css      # global styles
```

## Architecture patterns

- **Sections renderer** — `src/components/sections-renderer/sections-renderer.astro` maps Sanity block types to block components. Add a new block by: (1) creating a schema in `src/schemas/`, (2) exporting it from `src/schemas/index.ts`, (3) adding the corresponding component in `src/components/blocks/`, and (4) registering the mapping in the sections renderer.
- **Sanity client** — singleton in `src/lib/sanity.ts`; use `urlFor()` for image URLs.
- **GROQ queries** — kept in `src/lib/queries.ts`.

## Code conventions

### File naming
All source files must be **kebab-case** (enforced by ESLint `check-file` plugin). Dynamic route files (e.g. `[slug].astro`) are exempt.

### CSS
- One CSS Module per component, named `<component>.module.css`.
- Class names must follow **BEM-compatible kebab-case** (enforced by Stylelint).
- CSS properties must be in **alphabetical order** (enforced by Stylelint).
- No hex colours (`color-no-hex: true`). No named colours (`color-named: never`). Use CSS custom properties instead.
- Only use **widely-available baseline** CSS features (enforced by `stylelint-plugin-use-baseline`).
- `composes` / `compose-with` are allowed in CSS Modules.

### Commits
Conventional Commits are enforced by Commitlint + Husky:
```
feat: ...
fix: ...
chore: ...
docs: ...
refactor: ...
```

## Deployment

Deployed on **Vercel** via the `@astrojs/vercel` adapter (SSR). The Sanity Studio is served from the same deployment at `/studio`.
