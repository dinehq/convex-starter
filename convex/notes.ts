import { v } from "convex/values";
import { authedMutation, authedQuery } from "./functions";

// Example feature — delete me along with the `notes` table in schema.ts.

export const list = authedQuery({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("notes"),
      _creationTime: v.number(),
      userId: v.id("users"),
      text: v.string(),
      createdAt: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", ctx.userId))
      .order("desc")
      .collect();
  },
});

export const create = authedMutation({
  args: { text: v.string() },
  returns: v.id("notes"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      userId: ctx.userId,
      text: args.text,
      createdAt: Date.now(),
    });
  },
});
