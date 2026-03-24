"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import AdminShell from "@/components/admin/AdminShell";
import EntityManager from "@/components/admin/EntityManager";

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

export default function AdminEntityPage<T extends { id: string }>({
  shellTitle,
  shellDescription,
  managerTitle,
  managerDescription,
  endpoint,
  schema,
  fields,
  columns,
  createLabel,
  canCreate,
  canEdit,
  canDelete,
}: {
  shellTitle: string;
  shellDescription: string;
  managerTitle: string;
  managerDescription: string;
  endpoint: string;
  schema: z.ZodTypeAny;
  fields: EntityField[];
  columns: EntityColumn<T>[];
  createLabel?: string;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(endpoint, { cache: "no-store", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load data.");
      setItems(Array.isArray(data) ? data : []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [endpoint]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminShell title={shellTitle} description={shellDescription}>
      {loading ? (
        <div className="space-y-4">
          {/* Table skeleton */}
          <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 w-40 animate-pulse rounded-lg bg-stone-200" />
                <div className="mt-2 h-3 w-64 animate-pulse rounded bg-stone-100" />
              </div>
              <div className="h-9 w-24 animate-pulse rounded-xl bg-stone-200" />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
            <div className="border-b border-stone-100 bg-stone-50/60 px-4 py-3">
              <div className="flex gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 w-20 animate-pulse rounded bg-stone-200" />
                ))}
              </div>
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 border-b border-stone-50 px-4 py-4">
                <div className="h-3 w-32 animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-24 animate-pulse rounded bg-stone-100" />
                <div className="h-3 w-16 animate-pulse rounded bg-stone-100" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <svg className="mx-auto h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          <p className="mt-3 font-sans text-sm font-medium text-red-700">{error}</p>
          <button type="button" onClick={load} className="mt-4 rounded-xl border border-red-300 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-red-600 transition-all hover:bg-red-100">
            Retry
          </button>
        </div>
      ) : null}
      {!loading && !error ? (
        <EntityManager
          title={managerTitle}
          description={managerDescription}
          endpoint={endpoint}
          initialItems={items}
          schema={schema}
          fields={fields}
          columns={columns}
          createLabel={createLabel}
          canCreate={canCreate}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ) : null}
    </AdminShell>
  );
}
