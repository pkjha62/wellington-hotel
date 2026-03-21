"use client";

import AdminEntityPage from "@/components/admin/AdminEntityPage";
import { galleryImageSchema } from "@/lib/schemas";
import type { GalleryImage } from "@/types";

export default function AdminGalleryPage() {
  return (
    <AdminEntityPage<GalleryImage>
      shellTitle="Gallery"
      shellDescription="Control homepage visuals, gallery order, and category-specific imagery."
      managerTitle="Gallery Media"
      managerDescription="Image URLs, alt text, and display order all feed the public gallery and visual storytelling sections."
      endpoint="/api/admin/gallery"
      schema={galleryImageSchema}
      createLabel="Add Image"
      fields={[
        { name: "src", label: "Image URL", type: "url" },
        { name: "alt", label: "Alt text", type: "text" },
        { name: "category", label: "Category", type: "select", options: [
          { label: "Rooms", value: "rooms" },
          { label: "Dining", value: "dining" },
          { label: "Exterior", value: "exterior" },
          { label: "Events", value: "events" },
          { label: "Spa", value: "spa" },
          { label: "Temple", value: "temple" },
        ] },
        { name: "order", label: "Display order", type: "number" },
      ]}
      columns={[
        { key: "preview", label: "Preview", render: (item) => <a href={item.src} target="_blank" className="text-gold underline" rel="noreferrer">View</a> },
        { key: "alt", label: "Alt", render: (item) => item.alt },
        { key: "category", label: "Category", render: (item) => item.category },
        { key: "order", label: "Order", render: (item) => item.order },
      ]}
    />
  );
}
