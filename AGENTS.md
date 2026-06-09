# Project Rules

- Always use pnpm as package manager.
- Do not start or stop dev servers; the user has their own.
- Do not add excessive comments.
- React Compiler is enabled; don't add useMemo/useCallback/memo in new code.
- Prefer Tailwind presets over arbitrary values or custom CSS.
- Enforce auth server-side via `authedQuery`/`authedMutation` (`convex/functions.ts`) or `getAuthUserId`; client route guards are UX only, not security.

## Heavy lifting — use Convex components

Reach for the official components instead of hand-rolling; register them in `convex/convex.config.ts`:

- [Aggregate](https://www.convex.dev/components/aggregate) — counts, sums, leaderboards without scanning the table.
- [Workflow](https://www.convex.dev/components/workflow) — durable, long-running, multi-step operations.
- [Workpool](https://www.convex.dev/components/workpool) — rate-limited / parallel background jobs.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
