Status: ready-for-agent

# Remove work grid, homepage shows list only

## Problem Statement

The homepage currently offers a Grid/List toggle for browsing work items. The grid view (with its per-item column/row positioning and "featured hero" first item) adds visual and code complexity that isn't earning its keep — the list view is the one that matters, and maintaining two parallel layouts (plus the toggle, the GSAP Flip transition between them, and the Sanity fields that position grid tiles) is ongoing overhead for a feature nobody needs to choose between anymore.

## Solution

The homepage will show only the list view of work items — no toggle, no grid layout, no positional per-item configuration in Sanity. The list becomes the sole, permanent way work items are presented, styled and behaving exactly as the current list view already does (uniform rows, no hero/featured emphasis, ordered by the array order editors set in Studio).

Everything that only existed to support the grid — the grid markup, the toggle UI, the view-switching animation/state logic, the grid-positioning Sanity fields, and the custom Studio grid-position editor — is deleted rather than hidden, since none of it will be reachable code once there's no grid to show.

The existing production Sanity content is migrated in place (not discarded): the singleton document that stores today's `homeGrid` items is converted to the new `homeList` document type, keeping the same project references and the same order, with the grid-only fields (`featured`, `columnStart`, `columnSpan`, `rowStart`, `rowSpan`) stripped from each item.

## User Stories

1. As a site visitor, I want to see the homepage work section as a single list, so that I have one consistent, predictable way to browse work items instead of choosing between two layouts.
2. As a site visitor, I want the homepage to load without the grid/list toggle UI, so that the interface is simpler and there's nothing to switch.
3. As a site visitor navigating the list, I want the existing list hover/active-item behavior (highlighting the item under the cursor/in view) to keep working exactly as it does today, so that the removal of the grid doesn't regress the list experience.
4. As a site visitor with `prefers-reduced-motion` enabled, I want the homepage to render correctly without any leftover grid/reduced-motion special-casing, so that the page isn't carrying dead logic that no longer applies.
5. As a content editor in Sanity Studio, I want to manage the homepage's work items as a plain reorderable list of project references, so that I no longer have to think about column/row positioning or a "featured hero" flag that no longer does anything.
6. As a content editor, I want my existing homepage work item list (its projects and their order) to still be there after this change ships, so that I don't have to manually re-add and re-order every project from scratch.
7. As a content editor, I want the Studio document for the homepage work list to be clearly named/labelled as a list (not a "grid"), so that the naming in Studio matches what the feature actually does.
8. As a developer maintaining this codebase, I want the grid-only code paths (grid markup, toggle component, Flip-based view-switch animation, localStorage view-preference persistence) fully deleted rather than left dormant, so that there's no dead code implying a feature that no longer exists.
9. As a developer, I want the Sanity schema to no longer expose `featured`/`columnStart`/`columnSpan`/`rowStart`/`rowSpan` fields, so that the schema accurately reflects that positioning data is no longer used anywhere.
10. As a developer, I want the custom Studio grid-position input component removed and replaced with a standard array input, so that there's no bespoke UI code maintaining a feature that no longer exists.
11. As a developer, I want the renamed `homeList` schema/document/component names to replace `homeGrid`/`work-grid` throughout the codebase, so that naming reflects the current feature rather than its removed predecessor.
12. As a developer running the migration, I want to verify the production data migration (type rename + field stripping) against a dry run before applying it, so that the one irreversible/data-affecting step in this change is verified before it touches real content.
13. As a developer, I want the GSAP Flip import/usage removed from `layout.astro` once nothing else in the codebase depends on it, so that no unused animation library code remains wired into the layout.
14. As a developer, I want no new automated test framework introduced for this change, so that the change stays consistent with this repo's existing convention of no automated tests (lint-only via ESLint/Stylelint).

## Implementation Decisions

- **Scope: full removal, not a hidden/dormant toggle.** All grid-only code, markup, styles, schema fields, and the custom Studio input are deleted outright. Nothing is left "off by default" for a future revert; git history is the revert path if ever needed.
- **List presentation stays uniform.** No first-item/hero emphasis is carried over from the grid's `data-featured`/2-column-span treatment on item index 0. The list renders every item identically, matching the current list-view behavior exactly (this is a pure removal, not a list redesign).
- **List ordering source stays the same.** Order is determined by the array order of items in the Sanity document (drag-to-reorder in Studio), exactly as today — the list view never used `columnStart`/`rowStart` for ordering, only the grid did.
- **List hover/active-item interaction is preserved unchanged.** The existing IntersectionObserver-driven "active item" hover/scroll behavior for the list stays as-is; it is not part of what's being removed.
- **Renaming.** The Sanity schema/document type `homeGrid` becomes `homeList` (document title updates from "Home Grid" to a list-appropriate label, e.g. "Home List" or "Homepage Work"). The Astro component `work-grid.astro`/`work-grid.module.css` is renamed to a list-appropriate name (e.g. `work-list.astro`/`work-list.module.css`). The `WorkToggle` component and its module are deleted entirely (no replacement — there is nothing left to toggle). CSS/HTML identifiers that reference "grid" (e.g. `#work-section[data-view="grid"]`, `work-item` inline grid-position CSS custom properties `--col-start`/`--col-span`/`--row-start`/`--row-span`) are removed along with the grid markup; list-specific identifiers (`work-list-names`, `work-list-name`) are kept, since they already describe the list.
- **Sanity schema changes.** Remove `featured`, `columnStart`, `columnSpan`, `rowStart`, `rowSpan` fields from the `gridItem` object type (renamed alongside the parent, e.g. to `listItem`). The `project` reference field is kept as the only per-item field besides array ordering. The custom `components: { input: GridEditorInput }` on the items array is removed so the array falls back to Sanity's default array/reference input (with drag-to-reorder retained natively).
- **Studio custom editor removal.** `src/studio/grid-editor.tsx` (`GridEditorInput`) is deleted. `src/studio/dashboard.tsx`'s link to editing the home document is updated to reflect the renamed document (label and/or referenced type name).
- **View-switching logic removal.** In the layout (`src/layouts/layout.astro`), remove: the `[data-view-btn]` click handler and `applyWorkView(view)`, the `localStorage` get/set of `"workView"`, the GSAP Flip-based transition between grid and list layouts, and the `prefers-reduced-motion` forced-grid special case. The list-hover/active-item logic (`initListHover()`) and its IntersectionObserver are kept, adapted only if it was reading `data-view` state that no longer exists (in which case it should just always run, since list is now the only view).
- **GSAP Flip dependency.** Since Flip usage is confined to this one view-switch code path (confirmed via repo-wide search — no other file imports `gsap/Flip`), removing that code path removes the only usage; the `gsap` package dependency itself is not touched since GSAP is used elsewhere in the codebase for other animations.
- **Data migration.** A one-off migration (a small script using the Sanity client with a write token, or the Sanity CLI's migration tooling) patches the existing singleton production document: renames its `_type` from `homeGrid` to `homeList`, and unsets the `featured`/`columnStart`/`columnSpan`/`rowStart`/`rowSpan` keys from each item in the array, while leaving the `project` reference and array order untouched. This is run once against production data as part of shipping this change, after being verified with a dry run (see Testing Decisions).
- **GROQ query update.** `src/lib/queries.ts` and any type definitions (e.g. `HomeGridItem` in `src/lib/types`) are updated to query/type the renamed `homeList` document and `listItem` shape instead of `homeGrid`/`gridItem`.

## Testing Decisions

- This repo has no automated test framework (no vitest/jest/playwright, no `*.test.*` files; only `pnpm lint` / `pnpm lint:css` exist as checks). This change does not introduce one — consistent with existing project convention, adding test infrastructure for a deletion-heavy change would be disproportionate.
- **Migration script:** run with a dry-run/preview mode first (query and log the intended patch without applying it) against the production dataset, and manually confirm the projected result (correct `_type`, correct stripped fields, project references and order unchanged) before applying the real patch. This is the one seam worth deliberate verification, since it's the only step in this change that touches real, hard-to-recreate data.
- **Everything else (deleted markup/CSS/JS, renamed schema/component/query) is pure deletion/rename with no new logic** — verified via `pnpm build` succeeding and a manual browser check of the homepage: the list renders all work items in the correct order, links to each project work correctly, the list hover/active-item behavior still works, and there is no grid/toggle UI visible.
- `pnpm lint` and `pnpm lint:css` must pass on the changed files (enforced by this repo's existing tooling; no new lint rules needed).

## Out of Scope

- Any visual/interaction redesign of the list itself (spacing, typography, animation timing) — this spec only removes the grid and its supporting code; the list's existing look and behavior are preserved as-is.
- Introducing a new automated test framework for this repo.
- Any change to the list's hover/active-item (IntersectionObserver) behavior beyond making it the only path (no longer gated behind a view check).
- Any change to how work items/projects themselves are authored or displayed on their own `/works/[slug]` pages — this is homepage-only.
- Retroactively cleaning up all other unrelated uses of `display: grid` in the codebase (`text-image-block`, `about`, `works/[slug]` pages) — those are ordinary CSS layout, not part of this feature, and are untouched.

## Further Notes

- No `docs/adr/` entry exists yet for this repo. This change (removing a whole configurable layout mode and its schema surface in favor of a single fixed presentation) is a reasonable candidate for an ADR if the team wants the "why" recorded for future readers — flagged here but not created as part of this spec; can be added separately via the domain-modeling skill if desired.
- No `CONTEXT.md` exists yet for this repo; this spec introduces the renamed terms `homeList`/`listItem` as the vocabulary going forward for what was previously `homeGrid`/`gridItem`.
