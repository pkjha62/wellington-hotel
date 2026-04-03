export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 px-4 sm:px-6">
      <div className="h-64 w-full skeleton-shimmer rounded-2xl mb-12" />
      <div className="mx-auto max-w-6xl space-y-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className={`flex flex-col gap-10 lg:items-center ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            <div className="h-80 w-full lg:w-1/2 skeleton-shimmer rounded-[28px]" />
            <div className="lg:w-1/2 space-y-4">
              <div className="h-4 skeleton-shimmer rounded w-1/4" />
              <div className="h-7 skeleton-shimmer rounded w-3/4" />
              <div className="h-4 skeleton-shimmer rounded" />
              <div className="flex gap-2 mt-2">
                <div className="h-7 skeleton-shimmer rounded-full w-20" />
                <div className="h-7 skeleton-shimmer rounded-full w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
