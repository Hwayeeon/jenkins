import { Skeleton, SkeletonNav, SkeletonCircle } from "../../components/skeleton";

export default function ContactLoading() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <SkeletonNav />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden relative duration-700 border rounded-xl border-zinc-600"
            >
              <div className="p-4 relative flex flex-col items-center gap-4 md:gap-8 md:py-24 lg:pb-48 md:p-16">
                <span
                  className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-700 via-zinc-700/50 to-transparent"
                  aria-hidden="true"
                />
                <SkeletonCircle size="md" />
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-6 w-40 lg:h-8" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
