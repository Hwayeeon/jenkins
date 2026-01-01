interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-700/50 ${className}`}
    />
  );
}

// Common skeleton patterns
export function SkeletonText({ className = "", lines = 1 }: SkeletonProps & { lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? "w-4/5" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ className = "", size = "md" }: SkeletonProps & { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <Skeleton className={`rounded-full ${sizes[size]} ${className}`} />
  );
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`overflow-hidden relative duration-700 border rounded-xl border-zinc-600 ${className}`}
    >
      <div className="p-4 md:p-8 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

export function SkeletonIcon({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 ${className}`}
    >
      <Skeleton className="w-12 h-12 rounded" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

// Navigation skeleton
export function SkeletonNav() {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b bg-zinc-900/0 border-transparent">
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-8 rounded" />
          </div>
          <Skeleton className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}

