"use client";

import { Skeleton } from "../components/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Navigation Skeleton */}
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-14" />
        </ul>
      </nav>

      {/* Top Glowing Line */}
      <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* Title Skeleton */}
      <div className="py-3.5 px-0.5 z-10">
        <Skeleton className="h-12 w-64 sm:h-16 sm:w-80 md:h-24 md:w-96" />
      </div>

      {/* Bottom Glowing Line */}
      <div className="hidden w-screen h-px md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      {/* Description Skeleton */}
      <div className="my-16 text-center">
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
    </div>
  );
}

