import { Skeleton, SkeletonNav, SkeletonCard, SkeletonText } from "../../components/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="relative pb-16">
      <SkeletonNav />

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <Skeleton className="h-10 w-48 sm:h-12" />
          <div className="mt-4">
            <SkeletonText lines={2} />
          </div>
        </div>
        
        <div className="w-full h-px bg-zinc-800" />

        {/* Featured + Top 2,3 */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {/* Featured Card (Large) */}
          <div className="overflow-hidden relative duration-700 border rounded-xl border-zinc-600">
            <div className="relative w-full h-full p-4 md:p-8">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="mt-4 h-10 w-3/4 sm:h-12" />
              <div className="mt-4">
                <SkeletonText lines={3} />
              </div>
              <div className="absolute bottom-4 md:bottom-8">
                <Skeleton className="h-4 w-24 hidden lg:block" />
              </div>
            </div>
          </div>

          {/* Top 2 and 3 */}
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>

        <div className="hidden w-full h-px md:block bg-zinc-800" />

        {/* Article Grid (3 columns) */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, col) => (
            <div key={col} className="grid grid-cols-1 gap-4">
              {Array.from({ length: 2 }).map((_, row) => (
                <SkeletonCard key={row} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
