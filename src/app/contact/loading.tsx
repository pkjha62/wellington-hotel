export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 px-4 sm:px-6">
      <div className="h-64 w-full skeleton-shimmer rounded-2xl mb-12" />
      <div className="mx-auto max-w-5xl grid gap-16 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="h-6 skeleton-shimmer rounded w-1/3" />
          <div className="h-10 skeleton-shimmer rounded w-2/3" />
          <div className="h-4 skeleton-shimmer rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 skeleton-shimmer rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 skeleton-shimmer rounded w-1/4" />
                <div className="h-4 skeleton-shimmer rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 skeleton-shimmer rounded-xl" />
          ))}
          <div className="h-36 skeleton-shimmer rounded-xl" />
          <div className="h-12 skeleton-shimmer rounded-full w-40" />
        </div>
      </div>
    </div>
  );
}
