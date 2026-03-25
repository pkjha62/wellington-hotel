"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { spaServiceSchema } from "@/lib/schemas";
import type { SpaService } from "@/types";

export default function AdminSpaPage() {
  return (
    <AdminEntityPage<SpaService>
      shellTitle="Spa Services"
      shellDescription="Add, edit, or remove spa and wellness services shown on the public Spa page."
      managerTitle="Spa & Wellness Services"
      managerDescription="Manage treatments, pricing, durations, and categories for the wellness centre."
      endpoint="/api/admin/spa"
      schema={spaServiceSchema}
      createLabel="Add Service"
      fields={[
        { name: "name", label: "Service name", type: "text" },
        { name: "category", label: "Category", type: "text", placeholder: "Traditional, Massage, Wellness..." },
        { name: "duration", label: "Duration", type: "text", placeholder: "60 – 120 min" },
        { name: "price", label: "Price (₹)", type: "number" },
        { name: "image", label: "Image", type: "image" },
        { name: "order", label: "Display order", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Service", render: (item) => item.name },
        { key: "category", label: "Category", render: (item) => item.category },
        { key: "price", label: "Price", render: (item) => item.price > 0 ? `₹${item.price.toLocaleString("en-IN")}` : "Complimentary" },
        { key: "visible", label: "Status", render: (item) => item.visible ? "Visible" : "Hidden" },
      ]}
      searchableKeys={["name", "category", "description"]}
    />
  );
}
