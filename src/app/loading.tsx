export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      {/* Shimmer bar */}
      <div className="w-48 h-px skeleton-shimmer rounded-full" />
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-text-light">Loading</p>
      </div>
      <div className="w-48 h-px skeleton-shimmer rounded-full" />
    </div>
  );
}
