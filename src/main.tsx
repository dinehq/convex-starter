import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const root = createRoot(document.getElementById("root")!);

if (!convexUrl) {
  root.render(
    <StrictMode>
      <main className="grid min-h-screen place-items-center p-6">
        <div className="max-w-md rounded-lg border border-black/10 p-6">
          <h1 className="text-xl font-bold">Convex URL is not configured</h1>
          <p className="mt-2 text-sm text-black/60">
            Set <code>VITE_CONVEX_URL</code> in <code>.env.local</code>, then
            restart Vite.
          </p>
        </div>
      </main>
    </StrictMode>
  );
} else {
  const convex = new ConvexReactClient(convexUrl);
  root.render(
    <StrictMode>
      <ConvexAuthProvider client={convex}>
        <RouterProvider router={router} />
      </ConvexAuthProvider>
    </StrictMode>
  );
}
