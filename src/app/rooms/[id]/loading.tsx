export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[50vh] min-h-[400px] skeleton-shimmer" />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-8 skeleton-shimmer rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-4 skeleton-shimmer rounded" />
              <div className="h-4 skeleton-shimmer rounded w-5/6" />
              <div className="h-4 skeleton-shimmer rounded w-4/5" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 skeleton-shimmer rounded-xl" />
              ))}
            </div>
            <div className="aspect-[16/9] skeleton-shimmer rounded-2xl" />
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-[28px] border border-stone-200 p-6 space-y-4">
              <div className="h-4 skeleton-shimmer rounded w-1/3" />
              <div className="h-10 skeleton-shimmer rounded w-2/3" />
              <div className="h-4 skeleton-shimmer rounded" />
              <div className="h-12 skeleton-shimmer rounded-full" />
              <div className="h-12 skeleton-shimmer rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
