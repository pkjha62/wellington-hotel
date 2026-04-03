export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 px-4 sm:px-6">
      <div className="h-64 w-full skeleton-shimmer rounded-2xl mb-12" />
      <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-[28px] border border-stone-200 bg-white p-8 space-y-4">
            <div className="h-4 skeleton-shimmer rounded w-1/3" />
            <div className="h-6 skeleton-shimmer rounded w-2/3" />
            <div className="h-3 skeleton-shimmer rounded" />
            <div className="h-3 skeleton-shimmer rounded w-4/5" />
            <div className="h-4 skeleton-shimmer rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
