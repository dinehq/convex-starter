import { defineApp } from "convex/server";

// Register Convex components for heavy lifting here — don't hand-roll these:
//   Aggregate  https://www.convex.dev/components/aggregate  — counts / sums / leaderboards without scanning
//   Workflow   https://www.convex.dev/components/workflow   — durable, long-running, multi-step operations
//   Workpool   https://www.convex.dev/components/workpool   — rate-limited / parallel background jobs
//
// e.g. after `pnpm add @convex-dev/aggregate`:
//   import aggregate from "@convex-dev/aggregate/convex.config";
//   app.use(aggregate);

const app = defineApp();

export default app;
