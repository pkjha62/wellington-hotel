export default function Loading() {
  return (
    <div className="min-h-screen bg-beige pt-32 px-4 sm:px-6">
      {/* Hero skeleton */}
      <div className="h-56 w-full skeleton-shimmer rounded-2xl mb-10" />
      {/* Cards skeleton */}
      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[28px] border border-stone-200 bg-white">
            <div className="h-56 skeleton-shimmer" />
            <div className="p-6 space-y-3">
              <div className="h-5 skeleton-shimmer rounded" />
              <div className="h-4 skeleton-shimmer rounded w-3/4" />
              <div className="h-4 skeleton-shimmer rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
