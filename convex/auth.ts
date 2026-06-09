import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

// GitHub sign-in is optional: it activates only when AUTH_GITHUB_ID is set in
// the Convex deployment env. Out of the box the app runs on Google alone.
const githubEnabled = Boolean(process.env.AUTH_GITHUB_ID);

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    ...(githubEnabled ? [GitHub] : []),
  ],
});

// Which sign-in providers are configured. The login page reads this so it only
// shows buttons that will actually work. Safe to call before sign-in.
export const availableProviders = query({
  args: {},
  returns: v.object({
    google: v.boolean(),
    github: v.boolean(),
  }),
  handler: () => ({
    google: true,
    github: githubEnabled,
  }),
});
