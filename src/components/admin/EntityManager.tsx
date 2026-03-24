"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "array" | "date" | "email" | "url" | "image" | "images";

type EntityField = {
  name: string;
  label: string;
  type: FieldType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
};

type EntityColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

type EntityManagerProps<T extends { id: string }> = {
  title: string;
  description: string;
  endpoint: string;
  initialItems: T[];
  schema: z.ZodTypeAny;
  fields: EntityField[];
  columns: EntityColumn<T>[];
  createLabel?: string;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
};

type FormShape = Record<string, string | number | boolean>;

function normalizeForForm<T extends { id: string }>(item: T | null, fields: EntityField[]): FormShape {
  return fields.reduce<FormShape>((acc, field) => {
    const value = item ? (item as Record<string, unknown>)[field.name] : undefined;
    if (field.type === "array" || field.type === "images") {
      acc[field.name] = Array.isArray(value) ? value.join(", ") : "";
      return acc;
    }
    if (field.type === "checkbox") {
      acc[field.name] = Boolean(value);
      return acc;
    }
    acc[field.name] = typeof value === "undefined" || value === null ? "" : String(value);
    return acc;
  }, {});
}

function normalizeForSubmit(values: FormShape, fields: EntityField[]) {
  return fields.reduce<Record<string, unknown>>((acc, field) => {
    const value = values[field.name];
    if (field.type === "array" || field.type === "images") {
      acc[field.name] = String(value).split(/,|\n/).map((entry) => entry.trim()).filter(Boolean);
      return acc;
    }
    if (field.type === "number") { acc[field.name] = Number(value); return acc; }
    if (field.type === "checkbox") { acc[field.name] = Boolean(value); return acc; }
    acc[field.name] = value;
    return acc;
  }, {});
}

export default function EntityManager<T extends { id: string }>({
  title,
  description,
  endpoint,
  initialItems,
  schema,
  fields,
  columns,
  createLabel = "Add New",
  canCreate = true,
  canEdit = true,
  canDelete = true,
}: EntityManagerProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const defaultValues = useMemo(() => normalizeForForm(editingItem, fields), [editingItem, fields]);

  const { register, handleSubmit, reset, formState: { errors }, setError: setFieldError, clearErrors, setValue, watch } = useForm<FormShape>({
    values: defaultValues,
  });

  const openCreate = () => { setEditingItem(null); setError(""); setFormOpen(true); reset(normalizeForForm(null, fields)); };
  const openEdit = (item: T) => { setEditingItem(item); setError(""); setFormOpen(true); reset(normalizeForForm(item, fields)); };

  const closeForm = useCallback(() => { setFormOpen(false); setEditingItem(null); setError(""); }, []);

  useEffect(() => {
    if (!formOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeForm(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [formOpen, closeForm]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setError("");
    clearErrors();

    const payload = normalizeForSubmit(values, fields);
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        setFieldError(path, { type: "validation", message: issue.message });
      }
      setSubmitting(false);
      return;
    }

    const url = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;
    const method = editingItem ? "PATCH" : "POST";

    try {
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), credentials: "include" });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "Unable to save changes."); return; }

      if (editingItem) {
        setItems((current) => current.map((item) => (item.id === editingItem.id ? data : item)));
        setToast("Record updated successfully");
      } else {
        setItems((current) => [...current, data]);
        setToast("Record created successfully");
      }
      closeForm();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const response = await fetch(`${endpoint}/${deleteTarget.id}`, { method: "DELETE", credentials: "include" });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== deleteTarget.id));
      setToast("Record deleted");
    }
    setDeleteTarget(null);
  };

  const inputClass = "mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 font-sans text-sm text-charcoal outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-[0.1em] text-charcoal">{title}</h2>
          <p className="mt-1.5 font-sans text-sm leading-relaxed text-stone-500">{description}</p>
        </div>
        {canCreate && (
          <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:bg-gold-dark hover:shadow-md active:scale-[0.97]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            {createLabel}
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/80">
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-3.5 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                    {column.label}
                  </th>
                ))}
                {(canEdit || canDelete) && <th className="px-4 py-3.5 text-right font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (canEdit || canDelete ? 1 : 0)} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="h-12 w-12 text-stone-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                      <p className="font-sans text-sm font-medium text-stone-400">No records yet</p>
                      <p className="font-sans text-xs text-stone-400">Items you create will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item, idx) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`border-b border-stone-100 transition-colors hover:bg-gold/[0.03] ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/40"}`}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3.5 align-top font-sans text-sm text-charcoal">
                        {column.render(item)}
                      </td>
                    ))}
                    {(canEdit || canDelete) && (
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex justify-end gap-2">
                          {canEdit && (
                            <button type="button" onClick={() => openEdit(item)} className="rounded-lg border border-stone-200 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-wider text-stone-600 transition-all hover:border-gold hover:text-gold">
                              Edit
                            </button>
                          )}
                          {canDelete && (
                            <button type="button" onClick={() => setDeleteTarget(item)} className="rounded-lg border border-red-200 px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-wider text-red-500 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-600">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm px-0 py-0 sm:px-4 sm:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) closeForm(); }}
          >
            <motion.div
              ref={modalRef}
              className="min-h-full w-full sm:min-h-0 sm:max-w-3xl rounded-none sm:rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl uppercase tracking-[0.1em] text-charcoal">{editingItem ? `Edit ${title}` : createLabel}</h3>
                  <p className="mt-1.5 font-sans text-sm text-stone-500">Fill in the fields below carefully.</p>
                </div>
                <button type="button" onClick={closeForm} className="rounded-lg border border-stone-200 p-2 text-stone-400 transition-all hover:border-stone-300 hover:text-charcoal">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
                {fields.map((field) => {
                  const fieldError = errors[field.name]?.message;
                  return (
                    <label key={field.name} className={field.type === "textarea" || field.type === "array" || field.type === "image" || field.type === "images" ? "md:col-span-2" : "block"}>
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{field.label}</span>
                      {field.type === "textarea" || field.type === "array" ? (
                        <textarea {...register(field.name)} rows={field.type === "array" ? 3 : 5} placeholder={field.placeholder} className={inputClass} />
                      ) : field.type === "checkbox" ? (
                        <input {...register(field.name)} type="checkbox" className="mt-3 h-5 w-5 rounded border-stone-300 text-gold accent-gold focus:ring-gold" />
                      ) : field.type === "select" ? (
                        <select {...register(field.name)} className={inputClass}>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : field.type === "image" ? (
                        <ImageUpload value={String(watch(field.name) || "")} onChange={(url) => setValue(field.name, url)} />
                      ) : field.type === "images" ? (
                        <MultiImageUpload value={String(watch(field.name) || "")} onChange={(val) => setValue(field.name, val)} />
                      ) : (
                        <input {...register(field.name)} type={field.type} step={field.type === "number" ? "0.01" : undefined} placeholder={field.placeholder} className={inputClass} />
                      )}
                      {fieldError && <span className="mt-1.5 block font-sans text-xs text-red-600">{String(fieldError)}</span>}
                    </label>
                  );
                })}
                {error && <p className="md:col-span-2 rounded-lg bg-red-50 px-4 py-2.5 font-sans text-sm text-red-600">{error}</p>}
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="rounded-xl border border-stone-200 px-5 py-2.5 font-sans text-xs uppercase tracking-wider text-stone-500 transition-all hover:border-stone-300 hover:text-charcoal">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="rounded-xl bg-gold px-5 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-white transition-all hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]">
                    {submitting ? "Saving..." : editingItem ? "Save Changes" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 rounded-xl bg-charcoal px-5 py-3 font-sans text-sm text-white shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete record"
        description="This action cannot be undone. Confirm only if you intend to permanently remove this item."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
