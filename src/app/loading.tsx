export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-700 border-t-transparent" />
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-stone-400">Loading</p>
      </div>
    </div>
  );
}
