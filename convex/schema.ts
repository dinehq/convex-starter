import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  // Convex Auth tables: users, authAccounts, authSessions, etc.
  // (authTables.users already ships an `email` index, used by the
  // cross-provider account linking in convex/auth.ts.)
  ...authTables,

  // Example table — delete me. Shows the house conventions: user-scoped rows,
  // a createdAt timestamp, and a `by_user` index.
  notes: defineTable({
    userId: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
