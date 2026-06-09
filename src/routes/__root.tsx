import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
});

function RootLayout() {
  return <Outlet />;
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <Link to="/" className="mt-3 inline-block text-sm underline">
          Go home
        </Link>
      </div>
    </main>
  );
}

function RouteError({ error }: { error: Error }) {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 max-w-md text-sm text-black/60">{error.message}</p>
        <Link to="/" className="mt-3 inline-block text-sm underline">
          Go home
        </Link>
      </div>
    </main>
  );
}
