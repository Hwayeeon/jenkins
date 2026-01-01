import { Skeleton, SkeletonNav, SkeletonIcon, SkeletonText } from "../../components/skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <SkeletonNav />
      <div className="container px-4 mx-auto pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="space-y-4 mb-12">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-12 w-72 sm:h-16 md:h-20" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-48 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-12">
            <SkeletonText lines={4} />
          </div>

          {/* Tech Stack Section */}
          <div className="mb-12">
            <Skeleton className="h-6 w-32 mb-6" />
            
            {/* Languages */}
            <div className="mb-8">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonIcon key={i} />
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="mb-8">
              <Skeleton className="h-5 w-28 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonIcon key={i} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-8">
              <Skeleton className="h-5 w-16 mb-6" />
              
              {/* Dev Tools */}
              <div className="mb-6">
                <Skeleton className="h-4 w-36 mb-3 ml-2" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonIcon key={i} />
                  ))}
                </div>
              </div>

              {/* Other Tools */}
              <div className="mb-6">
                <Skeleton className="h-4 w-28 mb-3 ml-2" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonIcon key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="border-l-2 border-zinc-600 pl-6">
              <SkeletonText lines={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
