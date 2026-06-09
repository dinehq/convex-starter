import {
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

// Auth-enforcing wrappers: handlers get a guaranteed `ctx.userId`, and the
// function throws for anonymous callers. Use these instead of bare
// query/mutation for anything that must not run unauthenticated — client-side
// route guards are UX only, this is the real enforcement.

export const authedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    return { userId };
  })
);

export const authedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not authenticated");
    return { userId };
  })
);
