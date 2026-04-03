export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 px-4 pt-28 pb-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[28px] skeleton-shimmer h-80" />
          <div className="rounded-[28px] bg-white p-8 space-y-4 shadow-sm">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 skeleton-shimmer rounded-xl" />
            ))}
            <div className="h-14 skeleton-shimmer rounded-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
