"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-4 text-center">
      <div className="rounded-2xl border border-red-200 bg-white p-10 shadow-sm">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-red-500">Admin Error</p>
        <h2 className="mt-3 font-serif text-2xl text-stone-800">Something went wrong</h2>
        <p className="mt-3 max-w-sm font-sans text-sm text-stone-500">
          An unexpected error occurred in the admin panel. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-xl bg-stone-800 px-5 py-2.5 font-sans text-xs text-white transition hover:bg-stone-700"
          >
            Retry
          </button>
          <a
            href="/admin"
            className="rounded-xl border border-stone-300 px-5 py-2.5 font-sans text-xs text-stone-600 transition hover:bg-stone-50"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
