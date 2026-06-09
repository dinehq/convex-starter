---
name: convex-starter
description: Scaffold a new web app with the house stack — Vite + React 19 (React Compiler) + Convex + Convex Auth (Google + optional GitHub) + TanStack Router (file-based) + Tailwind v4 + ESLint/Prettier/knip + pnpm. Use when starting a new frontend project, "scaffold/bootstrap a new app", "new Convex project", "set up a React + Convex repo", or spinning up a new product from scratch. The convex-starter repo itself is the template.
---

# convex-starter

Bootstraps a new project from the conventions distilled across prior apps
(moodr, mage, fiche, mise, poche). **No product logic** — only auth wiring,
routing, tooling, and config.

This skill lives **inside** the `convex-starter` repo, and that repo **is** the
template — there is no separate copy. Scaffolding = copy the repo (minus its
git / skill / dependency / generated paths) into a new directory.

## When to use

- "Scaffold / bootstrap a new app", "start a new Convex project", "set up a
  React + Convex repo from scratch".
- Any new frontend that should use Convex + Convex Auth.

When **not** to use: adding Convex/auth/routing to an *existing* app — lift the
relevant file from the repo instead of copying the whole thing.

## The stack (pinned to the newest project's versions)

| Layer | Choice |
| --- | --- |
| Build | Vite 8 (`^8.0.16`, Rolldown), `@vitejs/plugin-react@6` |
| UI | React `19.2`, **React Compiler** (`babel-plugin-react-compiler@1`) via `@rolldown/plugin-babel` |
| Routing | **TanStack Router, file-based** (`@tanstack/react-router@1.170`, `@tanstack/router-plugin@1.168` Vite plugin) |
| Backend | Convex `^1.40` + `convex-helpers` (auth wrappers) |
| Auth | Convex Auth `@convex-dev/auth@0.0.93` + `@auth/core` — **Google + optional GitHub** |
| Styling | **Tailwind v4** (`4.3.0`, CSS-first, `@tailwindcss/vite`, no config file) |
| Lint/format | ESLint 10 flat + `typescript-eslint@8.60` (type-checked) + `@convex-dev/eslint-plugin`, Prettier 3.8 + `prettier-plugin-tailwindcss`, knip 6 |
| Lang | TypeScript `~6.0.3` |
| PM | pnpm (`pnpm-workspace.yaml` → `allowBuilds: { esbuild: true }`), `concurrently` for dev |

## How to scaffold

The template root is the repo that hosts this skill — normally
`~/Sites/convex-starter` (equivalently `<this-skill-dir>/../../..`).

1. Choose a target dir (default `~/Sites/<name>`; ask the user for the name).
2. Copy the repo, excluding git / skill / dependency / generated paths:
   ```sh
   REPO=~/Sites/convex-starter
   rsync -a \
     --exclude='.git' --exclude='.claude' --exclude='node_modules' \
     --exclude='dist' --exclude='.convex' \
     --exclude='src/routeTree.gen.ts' --exclude='convex/_generated' \
     "$REPO/" ~/Sites/<name>/
   ```
3. **Rename**: set `name` in `package.json`; update `index.html` `<title>`, OG
   tags, and `theme-color`; update `README.md`. Pick a unique Vite dev `port`
   in `vite.config.ts` if running alongside other projects.
4. `pnpm install`
5. `pnpm exec convex dev` — creates the Convex project and generates
   `convex/_generated/`. Leave running, or use `pnpm dev` (Convex + Vite).
6. **Convex Auth:**
   - `pnpm exec @convex-dev/auth` to generate `JWT_PRIVATE_KEY` / `JWKS` /
     `SITE_URL`, or follow <https://labs.convex.dev/auth>.
   - Set `AUTH_GOOGLE_ID` + `AUTH_GOOGLE_SECRET` in the Convex dashboard.
   - **GitHub is optional** — set `AUTH_GITHUB_ID` + `AUTH_GITHUB_SECRET` to
     enable it. The provider and its login button appear only when configured
     (`convex/auth.ts` gates on `AUTH_GITHUB_ID`; the login page reads
     `api.auth.availableProviders`).
7. Copy `.env.local.example` → `.env.local`; set `VITE_CONVEX_URL`.
8. `pnpm dev`. First run generates `src/routeTree.gen.ts` (gitignored) and
   `convex/_generated/` (committed) — expect import errors until then.

## Conventions encoded (and why)

- **File-based routing** — TanStack's recommended mode; routes live in
  `src/routes/`, the tree is generated to `src/routeTree.gen.ts`, the router is
  created in `main.tsx`. The router plugin must precede `@vitejs/plugin-react`.
- **Auth is client-side gated**, not via route loaders — `useConvexAuth()` lives
  in React, so guards are components (`<Navigate to="/login" />`), matching how
  every prior app does it. `prompt: "select_account"` on Google.
- **Server-side auth enforcement** — `convex/functions.ts` exposes
  `authedQuery`/`authedMutation` (convex-helpers `customFunctions`) that inject a
  guaranteed `ctx.userId` and throw for anonymous callers; route guards are UX
  only. No custom `createOrUpdateUser`, so `convex/auth.ts` stays
  rule-disable-free (cross-provider email linking is an opt-in add-on).
- **Optional providers** — GitHub registers only when its env var is set, and
  the login page renders buttons from the `availableProviders` query. Add more
  providers the same way (gate on env, expose via the query).
- **Tailwind v4, zero config** — `@import "tailwindcss"` + `@theme {}` in
  `src/styles.css`, driven by `@tailwindcss/vite`. No `tailwind.config.*`, no
  PostCSS. knip ignores `tailwindcss` (used only via the plugin).
- **Convex functions** use `args` + `returns` validators and explicit table ids
  (`ctx.db.get("users", id)`), per `convex/_generated/ai/guidelines.md`.
- **Heavy lifting via components** — `convex/convex.config.ts` is pre-seeded with
  pointers to Aggregate / Workflow / Workpool; reach for those instead of
  hand-rolling counts, durable pipelines, or background jobs.
- **Scripts**: `dev` runs Convex + Vite via `concurrently`; `build` is
  `tsc -b && vite build`; `fix` = Prettier + ESLint; plus `clone` (copy prod
  Convex data into dev).
- **No `packageManager` field / no `@` alias / no `convex.json`** — matches the
  newest projects, which dropped them.

## Customize / delete the example

The `notes` feature exists only to demonstrate the query/mutation/auth-gating
pattern. To remove it: delete the `notes` table in `convex/schema.ts`, delete
`convex/notes.ts`, and remove the notes UI in `src/routes/index.tsx`.

## Keeping this skill current

When the house stack moves on, bump `package.json` (and configs)
in the repo to match the newest project; new scaffolds inherit it.
