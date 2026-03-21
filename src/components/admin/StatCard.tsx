export default function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "accent" | "warn";
}) {
  const toneClass =
    tone === "accent"
      ? "border-gold/30 bg-beige"
      : tone === "warn"
        ? "border-amber-300 bg-amber-50"
        : "border-stone-200 bg-white";

  return (
    <div className={`rounded-[28px] border p-6 ${toneClass}`}>
      <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-text-light">{label}</p>
      <p className="mt-4 font-serif text-4xl text-charcoal">{value}</p>
    </div>
  );
}
