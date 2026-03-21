"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { testimonialSchema } from "@/lib/schemas";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  return (
    <AdminEntityPage<Testimonial>
      shellTitle="Testimonials"
      shellDescription="Approve or refine guest reviews before they surface publicly."
      managerTitle="Testimonials"
      managerDescription="Guest reviews can be edited, approved, or removed. Public display should only use approved content."
      endpoint="/api/admin/testimonials"
      schema={testimonialSchema}
      createLabel="Add Testimonial"
      fields={[
        { name: "guestName", label: "Guest name", type: "text" },
        { name: "location", label: "Location", type: "text" },
        { name: "rating", label: "Rating", type: "number" },
        { name: "comment", label: "Comment", type: "textarea" },
        { name: "approved", label: "Approved", type: "checkbox" },
      ]}
      columns={[
        { key: "guest", label: "Guest", render: (item) => item.guestName },
        { key: "location", label: "Location", render: (item) => item.location },
        { key: "rating", label: "Rating", render: (item) => `${item.rating}/5` },
        { key: "approved", label: "Approved", render: (item) => item.approved ? "Yes" : "No" },
      ]}
    />
  );
}
