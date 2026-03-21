"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import AdminShell from "@/components/admin/AdminShell";
import EntityManager from "@/components/admin/EntityManager";

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

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Unable to load data.");
        }
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return (
    <AdminShell title={shellTitle} description={shellDescription}>
      {loading ? <div className="rounded-[28px] border border-stone-200 bg-white p-6 font-sans text-sm text-text-secondary">Loading data...</div> : null}
      {error ? <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 font-sans text-sm text-red-700">{error}</div> : null}
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
