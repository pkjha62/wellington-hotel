"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { contactEnquiryAdminSchema } from "@/lib/schemas";
import type { ContactEnquiry } from "@/types";

export default function AdminEnquiriesPage() {
  return (
    <AdminEntityPage<ContactEnquiry>
      shellTitle="Contact Enquiries"
      shellDescription="View and manage enquiries submitted through the public Contact Us page."
      managerTitle="Enquiries"
      managerDescription="Review incoming messages and update their status."
      endpoint="/api/admin/enquiries"
      schema={contactEnquiryAdminSchema}
      createLabel="Add Enquiry"
      canCreate={false}
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "subject", label: "Subject", type: "text" },
        { name: "message", label: "Message", type: "textarea" },
        { name: "status", label: "Status", type: "select", options: [
          { label: "New", value: "new" },
          { label: "Read", value: "read" },
          { label: "Replied", value: "replied" },
        ]},
      ]}
      columns={[
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "subject", label: "Subject", render: (item) => item.subject },
        { key: "email", label: "Email", render: (item) => item.email },
        { key: "status", label: "Status", render: (item) => item.status === "new" ? "New" : item.status === "read" ? "Read" : "Replied" },
        { key: "date", label: "Date", render: (item) => item.createdAt },
      ]}
      searchableKeys={["name", "email", "subject", "message"]}
    />
  );
}
