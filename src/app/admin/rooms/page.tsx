"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { roomSchema } from "@/lib/schemas";
import type { Room } from "@/types";

export default function AdminRoomsPage() {
  return (
    <AdminEntityPage<Room>
      shellTitle="Rooms"
      shellDescription="Add, update, and retire room inventory shown to website visitors and booking flows."
      managerTitle="Room Inventory"
      managerDescription="Keep room pricing, amenities, and availability accurate. Prices are validated as positive numbers."
      endpoint="/api/admin/rooms"
      schema={roomSchema}
      createLabel="Add Room"
      fields={[
        { name: "name", label: "Room name", type: "text" },
        { name: "type", label: "Type", type: "select", options: [
          { label: "Standard", value: "standard" },
          { label: "Deluxe", value: "deluxe" },
          { label: "Suite", value: "suite" },
          { label: "Premium", value: "premium" },
        ] },
        { name: "price", label: "Price", type: "number" },
        { name: "maxGuests", label: "Max guests", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "amenities", label: "Amenities", type: "array", placeholder: "Wi-Fi, AC, Temple View" },
        { name: "images", label: "Image URLs", type: "array", placeholder: "https://..." },
        { name: "isAvailable", label: "Available", type: "checkbox" },
      ]}
      columns={[
        { key: "name", label: "Room", render: (item) => item.name },
        { key: "type", label: "Type", render: (item) => item.type },
        { key: "price", label: "Price", render: (item) => `₹${item.price.toLocaleString("en-IN")}` },
        { key: "guests", label: "Guests", render: (item) => item.maxGuests },
        { key: "available", label: "Availability", render: (item) => item.isAvailable ? "Available" : "Hidden" },
      ]}
    />
  );
}
