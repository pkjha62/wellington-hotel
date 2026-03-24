"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { specialOfferSchema } from "@/lib/schemas";
import type { SpecialOffer } from "@/types";

export default function AdminOffersPage() {
  return (
    <AdminEntityPage<SpecialOffer>
      shellTitle="Special Offers"
      shellDescription="Create and manage promotional packages and seasonal offers for guests."
      managerTitle="Special Offers"
      managerDescription="Visible offers appear on the public website and promotional materials."
      endpoint="/api/admin/offers"
      schema={specialOfferSchema}
      createLabel="Add Offer"
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "price", label: "Starting price (₹)", type: "number" },
        { name: "image", label: "Image URL", type: "url" },
        { name: "validFrom", label: "Valid from", type: "date" },
        { name: "validTo", label: "Valid to", type: "date" },
        { name: "visible", label: "Visible", type: "checkbox" },
      ]}
      columns={[
        { key: "title", label: "Title", render: (item) => item.title },
        { key: "price", label: "Price", render: (item) => `₹${item.price.toLocaleString("en-IN")}` },
        { key: "validity", label: "Validity", render: (item) => `${item.validFrom} → ${item.validTo}` },
        { key: "visible", label: "Visible", render: (item) => item.visible ? "Yes" : "No" },
      ]}
    />
  );
}
