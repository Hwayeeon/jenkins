import { Skeleton, SkeletonText } from "../../../components/skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Header */}
      <header className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black">
        <div className="container relative isolate overflow-hidden py-24 sm:py-32 mx-auto">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
            {/* Back button */}
            <Skeleton className="h-10 w-10 rounded-full mb-8" />
            
            {/* Date and Views */}
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex lg:max-w-none lg:gap-x-16 lg:gap-y-6 xl:gap-x-8">
              <div className="flex justify-center items-center gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Title */}
            <Skeleton className="mt-6 h-12 w-96 max-w-full sm:h-14 md:h-16" />

            {/* Description */}
            <div className="mt-6 max-w-2xl w-full">
              <SkeletonText lines={2} className="mx-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless max-w-3xl">
        {/* Paragraph 1 */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-64 mb-4" />
          <SkeletonText lines={4} />
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-48 mb-4" />
          <SkeletonText lines={3} />
        </div>

        {/* Code Block Skeleton */}
        <div className="mt-8 rounded-lg bg-zinc-100 p-4">
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 bg-zinc-200 ${i % 2 === 0 ? 'w-full' : 'w-4/5'}`} />
            ))}
          </div>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-56 mb-4" />
          <SkeletonText lines={3} />
        </div>
      </article>
    </div>
  );
}
