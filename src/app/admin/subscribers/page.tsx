"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { subscriberSchema } from "@/lib/schemas";
import type { Subscriber } from "@/types";

export default function AdminSubscribersPage() {
  return (
    <AdminEntityPage<Subscriber>
      shellTitle="Subscribers"
      shellDescription="Review newsletter sign-ups and clean invalid entries when required."
      managerTitle="Subscriber List"
      managerDescription="New subscribers are collected from the public newsletter form. This view is intentionally read-mostly."
      endpoint="/api/admin/subscribers"
      schema={subscriberSchema}
      canCreate={false}
      canEdit={false}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
      ]}
      columns={[
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "email", label: "Email", render: (item) => item.email },
        { key: "subscribedAt", label: "Subscribed", render: (item) => item.subscribedAt },
      ]}
    />
  );
}
