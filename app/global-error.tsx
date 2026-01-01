"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-black text-white">
          <h1 className="text-6xl font-bold text-red-500">Fatal Error</h1>
          <p className="mt-4 text-xl text-zinc-400">
            Something went critically wrong
          </p>
          {error.digest && (
            <p className="mt-2 text-sm text-zinc-600 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex gap-4 mt-12">
            <button
              onClick={reset}
              className="px-6 py-3 text-sm font-medium bg-zinc-800 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-all"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 text-sm font-medium bg-zinc-100 text-black rounded-lg hover:bg-white transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
