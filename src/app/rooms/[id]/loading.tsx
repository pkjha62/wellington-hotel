export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-beige">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
