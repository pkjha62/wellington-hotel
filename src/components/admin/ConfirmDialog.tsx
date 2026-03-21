"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
        <h2 className="font-serif text-2xl uppercase tracking-[0.12em] text-charcoal">{title}</h2>
        <p className="mt-3 font-sans text-sm leading-6 text-text-secondary">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-stone-300 px-5 py-2 font-sans text-xs uppercase tracking-[0.18em] text-text-secondary transition hover:border-stone-400 hover:text-charcoal">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="rounded-full bg-red-600 px-5 py-2 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-red-700">
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
