export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[272px_1fr] gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-3 rounded-2xl bg-white p-5">
          <div className="h-6 skeleton-shimmer rounded w-3/4" />
          <div className="h-3 skeleton-shimmer rounded w-1/2" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="h-9 skeleton-shimmer rounded-xl" />
            ))}
          </div>
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6">
            <div className="h-7 skeleton-shimmer rounded w-1/3 mb-2" />
            <div className="h-4 skeleton-shimmer rounded w-2/3" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 skeleton-shimmer rounded-2xl" />
            ))}
          </div>
          <div className="rounded-2xl bg-white p-6 h-64 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
