"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { statFactSchema } from "@/lib/schemas";
import type { StatFact } from "@/types";

export default function AdminStatFactsPage() {
  return (
    <AdminEntityPage<StatFact>
      shellTitle="Stat Facts"
      shellDescription="Manage the statistics and facts displayed on the homepage strip section."
      managerTitle="Homepage Stats"
      managerDescription="These numbers appear in the animated stats strip. Only visible entries are displayed."
      endpoint="/api/admin/stat-facts"
      schema={statFactSchema}
      createLabel="Add Stat"
      fields={[
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Value", type: "number" },
        { name: "suffix", label: "Suffix (e.g. +, ★)", type: "text" },
        { name: "order", label: "Display order", type: "number" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "label", label: "Label", render: (item) => item.label },
        { key: "value", label: "Value", render: (item) => `${item.value}${item.suffix}` },
        { key: "order", label: "Order", render: (item) => item.order },
        { key: "visible", label: "Visible", render: (item) => item.visible ? "Yes" : "No" },
      ]}
      searchableKeys={["label", "suffix"]}
    />
  );
}
