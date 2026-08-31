# CLAUDE.md

## Project overview

**mai** is a portfolio/agency website — Astro (SSR, Vercel adapter) + React islands + Sanity CMS. The Studio is embedded at `/studio`. Pages are built from block-based sections driven by Sanity content.

## Tech stack

- **Astro 5** — SSR, Vercel adapter
- **React 19** — interactive islands (`.tsx`)
- **Sanity v5** — headless CMS, Studio at `/studio`
- **Three.js + GSAP** — 3D/animation (SSR-safe via `vite.ssr.noExternal`)
- **CSS Modules** — scoped styles per component
- **pnpm** — package manager

## Environment variables

Required in `.env` (see `.env.example`):

```
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=   # optional — private datasets only
```

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm preview      # preview build
pnpm lint         # ESLint on src/
pnpm lint:css     # Stylelint on src/**/*.css
```

## Architecture

- **Sections renderer** — `src/components/sections-renderer/sections-renderer.astro` maps Sanity block types to components. To add a block: create schema in `src/schemas/`, export from `src/schemas/index.ts`, add component in `src/components/blocks/`, register in the renderer.
- **Sanity client** — singleton at `src/lib/sanity.ts`; use `urlFor()` for images.
- **GROQ queries** — `src/lib/queries.ts`.

## Code conventions

**File naming** — kebab-case enforced by ESLint `check-file`. Dynamic routes (`[slug].astro`) exempt.

**CSS**
- One CSS Module per component: `<component>.module.css`
- kebab-case class names, no BEM separators (Stylelint)
- Alphabetical property order (Stylelint)
- No hex or named colours — use CSS custom properties
- Widely-available baseline features only (`stylelint-plugin-use-baseline`)
- `composes` / `compose-with` allowed

**Commits** — Conventional Commits enforced by Commitlint + Husky (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).

## Deployment

Vercel via `@astrojs/vercel` adapter. Studio served from the same deployment at `/studio`.
