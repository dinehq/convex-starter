import { useState } from "react";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut, Plus } from "lucide-react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p className="text-sm text-black/50">Loading…</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Home />;
}

function Home() {
  const { signOut } = useAuthActions();
  const me = useQuery(api.users.me);
  const notes = useQuery(api.notes.list);
  const createNote = useMutation(api.notes.create);
  const [text, setText] = useState("");

  return (
    <main className="mx-auto max-w-xl p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">convex-starter</h1>
          <p className="text-sm text-black/60">
            Signed in as {me?.name ?? me?.email ?? "…"}
          </p>
        </div>
        <button
          onClick={() => void signOut()}
          className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-3 py-1.5 text-sm"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </header>

      {/* Example feature — delete me. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = text.trim();
          if (!value) return;
          void createNote({ text: value });
          setText("");
        }}
        className="mt-8 flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note…"
          className="flex-1 rounded-md border border-black/15 px-3 py-2 text-sm"
        />
        <button className="inline-flex items-center gap-1.5 rounded-md bg-black px-4 py-2 text-sm text-white">
          <Plus className="size-4" />
          Add
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {notes?.map((note) => (
          <li
            key={note._id}
            className="rounded-md border border-black/10 px-3 py-2 text-sm"
          >
            {note.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
