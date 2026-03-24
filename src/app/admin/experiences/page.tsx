"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { experienceSchema } from "@/lib/schemas";
import type { Experience } from "@/types";

export default function AdminExperiencesPage() {
  return (
    <AdminEntityPage<Experience>
      shellTitle="Experiences"
      shellDescription="Manage curated Deoghar packages and add-ons promoted on the public site."
      managerTitle="Experience Packages"
      managerDescription="Use these entries for pilgrimage, cultural, family, or seasonal travel packages."
      endpoint="/api/admin/experiences"
      schema={experienceSchema}
      createLabel="Add Experience"
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image URL", type: "url" },
        { name: "price", label: "Price", type: "number" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Title", render: (item) => item.title },
        { key: "price", label: "Price", render: (item) => `₹${item.price.toLocaleString("en-IN")}` },
        { key: "visible", label: "Visible", render: (item) => <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${item.visible ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{item.visible ? "Active" : "Hidden"}</span> },
      ]}
    />
  );
}
