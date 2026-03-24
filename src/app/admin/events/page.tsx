"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { eventVenueSchema } from "@/lib/schemas";
import type { EventVenue } from "@/types";

export default function AdminEventsPage() {
  return (
    <AdminEntityPage<EventVenue>
      shellTitle="Event Venues"
      shellDescription="Add, edit, or remove event venue listings shown on the public Events page."
      managerTitle="Event Venues"
      managerDescription="Manage venue capacities, descriptions, and feature lists."
      endpoint="/api/admin/events"
      schema={eventVenueSchema}
      createLabel="Add Venue"
      fields={[
        { name: "name", label: "Venue name", type: "text" },
        { name: "capacity", label: "Capacity", type: "text", placeholder: "Up to 500 guests" },
        { name: "image", label: "Image URL", type: "url" },
        { name: "order", label: "Display order", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "features", label: "Features", type: "array", placeholder: "Chandeliers, Stage, AV Equipment" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Venue", render: (item) => item.name },
        { key: "capacity", label: "Capacity", render: (item) => item.capacity },
        { key: "features", label: "Features", render: (item) => item.features.slice(0, 3).join(", ") },
        { key: "visible", label: "Status", render: (item) => item.visible ? "Visible" : "Hidden" },
      ]}
    />
  );
}
