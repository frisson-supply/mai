# mai

Portfolio/agency website built with Astro, React, and Sanity CMS.

## Stack

- **Astro 5** — SSR, Vercel adapter
- **React 19** — interactive islands
- **Sanity v5** — headless CMS at `/studio`
- **Three.js + GSAP** — 3D/animation
- **CSS Modules** — scoped styles

## Setup

1. Copy `.env.example` to `.env` and fill in Sanity credentials
2. `pnpm install`
3. `pnpm dev`

## Commands

| Command          | Action                        |
| :--------------- | :---------------------------- |
| `pnpm dev`       | Start dev server (`localhost:4321`) |
| `pnpm build`     | Build for production          |
| `pnpm preview`   | Preview production build      |
| `pnpm lint`      | ESLint                        |
| `pnpm lint:css`  | Stylelint                     |

## Deployment

Deployed on Vercel. Sanity Studio is served from the same deployment at `/studio`.
