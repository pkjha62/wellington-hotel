"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { bookingSchema } from "@/lib/schemas";
import type { Booking } from "@/types";

export default function AdminBookingsPage() {
  return (
    <AdminEntityPage<Booking>
      shellTitle="Bookings"
      shellDescription="Review booking lifecycle, update statuses, and remove erroneous reservations with confirmation."
      managerTitle="Guest Bookings"
      managerDescription="Bookings are created from the public website and can be updated here for operational control."
      endpoint="/api/admin/bookings"
      schema={bookingSchema}
      canCreate={false}
      fields={[
        { name: "guestName", label: "Guest name", type: "text" },
        { name: "guestEmail", label: "Email", type: "email" },
        { name: "guestPhone", label: "Phone", type: "text" },
        { name: "roomId", label: "Room ID", type: "text" },
        { name: "roomName", label: "Room name", type: "text" },
        { name: "checkIn", label: "Check-in", type: "date" },
        { name: "checkOut", label: "Check-out", type: "date" },
        { name: "guests", label: "Guests", type: "number" },
        { name: "status", label: "Status", type: "select", options: [
          { label: "Confirmed", value: "confirmed" },
          { label: "Checked In", value: "checked-in" },
          { label: "Checked Out", value: "checked-out" },
          { label: "Cancelled", value: "cancelled" },
        ] },
        { name: "totalAmount", label: "Total amount", type: "number" },
      ]}
      columns={[
        { key: "guest", label: "Guest", render: (item) => item.guestName },
        { key: "room", label: "Room", render: (item) => item.roomName },
        { key: "dates", label: "Stay", render: (item) => `${item.checkIn} to ${item.checkOut}` },
        { key: "status", label: "Status", render: (item) => item.status },
        { key: "amount", label: "Amount", render: (item) => `₹${item.totalAmount.toLocaleString("en-IN")}` },
      ]}
    />
  );
}
