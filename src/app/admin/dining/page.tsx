"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { diningVenueSchema } from "@/lib/schemas";
import type { DiningVenue } from "@/types";

export default function AdminDiningPage() {
  return (
    <AdminEntityPage<DiningVenue>
      shellTitle="Dining Venues"
      shellDescription="Add, edit, or remove dining venues shown on the public Dining page."
      managerTitle="Dining Venues"
      managerDescription="Manage restaurant listings, operating hours, and cuisine types."
      endpoint="/api/admin/dining"
      schema={diningVenueSchema}
      createLabel="Add Venue"
      fields={[
        { name: "name", label: "Venue name", type: "text" },
        { name: "cuisine", label: "Cuisine type", type: "text", placeholder: "Multi-Cuisine, Vegetarian, Café..." },
        { name: "hours", label: "Operating hours", type: "text", placeholder: "7:00 AM – 10:30 PM" },
        { name: "image", label: "Image", type: "image" },
        { name: "order", label: "Display order", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Venue", render: (item) => item.name },
        { key: "cuisine", label: "Cuisine", render: (item) => item.cuisine },
        { key: "hours", label: "Hours", render: (item) => item.hours },
        { key: "visible", label: "Status", render: (item) => item.visible ? "Visible" : "Hidden" },
      ]}
      searchableKeys={["name", "cuisine", "description"]}
    />
  );
}
