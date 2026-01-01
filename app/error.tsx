"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-red-500/50 to-zinc-300/0" />

      <div className="relative py-8 text-center">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          Oops!
        </h1>
        <p className="mt-4 text-xl text-zinc-400">
          Something went wrong
        </p>
        {error.digest && (
          <p className="mt-2 text-sm text-zinc-600 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-red-500/50 to-zinc-300/0" />

      <div className="flex gap-4 mt-12 animate-fade-in">
        <button
          onClick={reset}
          className="px-6 py-3 text-sm font-medium text-zinc-200 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-300"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 text-sm font-medium text-zinc-900 bg-zinc-100 rounded-lg hover:bg-white transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
