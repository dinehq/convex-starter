import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const providers = useQuery(api.auth.availableProviders);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-black/50">Loading…</p>
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-sm rounded-xl border border-black/10 p-8">
        <h1 className="text-center text-2xl font-bold">convex-starter</h1>
        <p className="mt-1 text-center text-sm text-black/60">
          Sign in to continue
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => void signIn("google")}
            className="w-full rounded-md border border-black/15 px-4 py-2.5 text-sm font-medium"
          >
            Continue with Google
          </button>
          {providers?.github && (
            <button
              onClick={() => void signIn("github")}
              className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white"
            >
              Continue with GitHub
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
