"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { faqSchema } from "@/lib/schemas";
import type { FAQ } from "@/types";

export default function AdminFAQsPage() {
  return (
    <AdminEntityPage<FAQ>
      shellTitle="FAQs"
      shellDescription="Manage frequently asked questions displayed on the public website."
      managerTitle="FAQ Entries"
      managerDescription="Keep guest queries up to date. Only visible FAQs appear on the public site."
      endpoint="/api/admin/faqs"
      schema={faqSchema}
      createLabel="Add FAQ"
      fields={[
        { name: "question", label: "Question", type: "textarea" },
        { name: "answer", label: "Answer", type: "textarea" },
        { name: "category", label: "Category", type: "select", options: [
          { label: "General", value: "general" },
          { label: "Booking", value: "booking" },
          { label: "Location", value: "location" },
          { label: "Transport", value: "transport" },
          { label: "Dining", value: "dining" },
          { label: "Spa", value: "spa" },
        ] },
        { name: "order", label: "Display order", type: "number" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "question", label: "Question", render: (item) => item.question.length > 60 ? item.question.slice(0, 60) + "..." : item.question },
        { key: "category", label: "Category", render: (item) => item.category },
        { key: "order", label: "Order", render: (item) => item.order },
        { key: "visible", label: "Visible", render: (item) => <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${item.visible ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{item.visible ? "Active" : "Hidden"}</span> },
      ]}
      searchableKeys={["question", "answer", "category"]}
    />
  );
}
