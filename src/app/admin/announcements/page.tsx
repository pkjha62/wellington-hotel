"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { announcementSchema } from "@/lib/schemas";
import type { Announcement } from "@/types";

export default function AdminAnnouncementsPage() {
  return (
    <AdminEntityPage<Announcement>
      shellTitle="Announcements"
      shellDescription="Control season-specific notices, offers, and event callouts displayed on the homepage ticker."
      managerTitle="Announcement Ticker"
      managerDescription="Use short, high-signal copy for booking windows, religious festivals, and in-house event messaging."
      endpoint="/api/admin/announcements"
      schema={announcementSchema}
      createLabel="Add Announcement"
      fields={[
        { name: "text", label: "Text", type: "textarea" },
        { name: "type", label: "Type", type: "select", options: [
          { label: "Info", value: "info" },
          { label: "Offer", value: "offer" },
          { label: "Event", value: "event" },
        ] },
        { name: "startDate", label: "Start date", type: "date" },
        { name: "endDate", label: "End date", type: "date" },
        { name: "active", label: "Active", type: "checkbox" },
      ]}
      columns={[
        { key: "text", label: "Message", render: (item) => item.text },
        { key: "type", label: "Type", render: (item) => item.type },
        { key: "window", label: "Window", render: (item) => `${item.startDate} to ${item.endDate}` },
        { key: "active", label: "Active", render: (item) => item.active ? "Yes" : "No" },
      ]}
    />
  );
}
