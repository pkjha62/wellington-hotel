"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { offeringSchema } from "@/lib/schemas";
import type { Offering } from "@/types";

export default function AdminOfferingsPage() {
  return (
    <AdminEntityPage<Offering>
      shellTitle="Offerings"
      shellDescription="Manage the long-form storytelling blocks on the homepage for rooms, cuisine, events, and wellness."
      managerTitle="Homepage Offerings"
      managerDescription="These sections shape the main selling narrative on the website homepage."
      endpoint="/api/admin/offerings"
      schema={offeringSchema}
      createLabel="Add Offering"
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image" },
        { name: "imageAlt", label: "Image alt", type: "text" },
        { name: "order", label: "Order", type: "number" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Title", render: (item) => item.title },
        { key: "subtitle", label: "Subtitle", render: (item) => item.subtitle },
        { key: "order", label: "Order", render: (item) => item.order },
        { key: "visible", label: "Visible", render: (item) => item.visible ? "Yes" : "No" },
      ]}
    />
  );
}
