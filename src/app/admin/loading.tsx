export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-800 border-t-transparent" />
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-stone-400">Loading</p>
      </div>
    </div>
  );
}
