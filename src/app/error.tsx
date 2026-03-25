"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-amber-700">Something went wrong</p>
      <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-stone-800">
        Unexpected Error
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm leading-7 text-stone-500">
        We apologise for the inconvenience. Please try again, or return to the homepage.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full border border-amber-700 px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-amber-700 transition hover:bg-amber-700 hover:text-white"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-full bg-amber-700 px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-amber-800"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
