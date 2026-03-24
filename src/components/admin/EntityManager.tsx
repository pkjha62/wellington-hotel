"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "array" | "date" | "email" | "url";

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
    if (field.type === "array") {
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
    if (field.type === "array") {
      acc[field.name] = String(value)
        .split(/,|\n/)
        .map((entry) => entry.trim())
        .filter(Boolean);
      return acc;
    }

    if (field.type === "number") {
      acc[field.name] = Number(value);
      return acc;
    }

    if (field.type === "checkbox") {
      acc[field.name] = Boolean(value);
      return acc;
    }

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

  const defaultValues = useMemo(() => normalizeForForm(editingItem, fields), [editingItem, fields]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormShape>({
    resolver: zodResolver(schema),
    values: defaultValues,
  });

  const openCreate = () => {
    setEditingItem(null);
    setError("");
    setFormOpen(true);
    reset(normalizeForForm(null, fields));
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setError("");
    setFormOpen(true);
    reset(normalizeForForm(item, fields));
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingItem(null);
    setError("");
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setError("");

    const payload = normalizeForSubmit(values, fields);
    const url = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;
    const method = editingItem ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to save changes.");
        return;
      }

      if (editingItem) {
        setItems((current) => current.map((item) => (item.id === editingItem.id ? data : item)));
      } else {
        setItems((current) => [...current, data]);
      }

      closeForm();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const response = await fetch(`${endpoint}/${deleteTarget.id}`, { method: "DELETE" });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] border border-stone-200 bg-white p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">{title}</h2>
          <p className="mt-2 font-sans text-sm leading-6 text-text-secondary">{description}</p>
        </div>
        {canCreate ? (
          <button type="button" onClick={openCreate} className="rounded-full bg-gold px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark">
            {createLabel}
          </button>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-4 text-left font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">
                    {column.label}
                  </th>
                ))}
                {(canEdit || canDelete) ? <th className="px-4 py-4 text-right font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Actions</th> : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {items.map((item) => (
                <tr key={item.id}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 align-top font-sans text-sm text-charcoal">
                      {column.render(item)}
                    </td>
                  ))}
                  {(canEdit || canDelete) ? (
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {canEdit ? <button type="button" onClick={() => openEdit(item)} className="rounded-full border border-stone-300 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-text-secondary transition hover:border-gold hover:text-gold">Edit</button> : null}
                        {canDelete ? <button type="button" onClick={() => setDeleteTarget(item)} className="rounded-full border border-red-200 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-red-600 transition hover:border-red-400 hover:text-red-700">Delete</button> : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {formOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-0 py-0 sm:px-4 sm:py-10">
          <div className="min-h-full sm:min-h-0 mx-auto sm:max-w-3xl rounded-none sm:rounded-[30px] bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl uppercase tracking-[0.12em] text-charcoal">{editingItem ? `Edit ${title}` : createLabel}</h3>
                <p className="mt-2 font-sans text-sm text-text-secondary">Use validated fields to keep the public site and admin data aligned.</p>
              </div>
              <button type="button" onClick={closeForm} className="rounded-full border border-stone-300 px-3 py-2 font-sans text-xs uppercase tracking-[0.18em] text-text-secondary transition hover:border-stone-400 hover:text-charcoal">Close</button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
              {fields.map((field) => {
                const fieldError = errors[field.name]?.message;
                const commonClassName = "mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold focus:bg-white";

                return (
                  <label key={field.name} className={field.type === "textarea" || field.type === "array" ? "md:col-span-2" : "block"}>
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">{field.label}</span>
                    {field.type === "textarea" || field.type === "array" ? (
                      <textarea {...register(field.name)} rows={field.type === "array" ? 3 : 5} placeholder={field.placeholder} className={commonClassName} />
                    ) : field.type === "checkbox" ? (
                      <input {...register(field.name)} type="checkbox" className="mt-3 h-5 w-5 rounded border-stone-300 text-gold focus:ring-gold" />
                    ) : field.type === "select" ? (
                      <select {...register(field.name)} className={commonClassName}>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...register(field.name)}
                        type={field.type}
                        step={field.type === "number" ? "0.01" : undefined}
                        placeholder={field.placeholder}
                        className={commonClassName}
                      />
                    )}
                    {fieldError ? <span className="mt-2 block font-sans text-xs text-red-600">{String(fieldError)}</span> : null}
                  </label>
                );
              })}
              {error ? <p className="md:col-span-2 font-sans text-sm text-red-600">{error}</p> : null}
              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={closeForm} className="rounded-full border border-stone-300 px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-text-secondary transition hover:border-stone-400 hover:text-charcoal">Cancel</button>
                <button type="submit" disabled={submitting} className="rounded-full bg-gold px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? "Saving..." : editingItem ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

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
