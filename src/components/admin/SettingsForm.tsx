"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/lib/schemas";
import { motion } from "framer-motion";
import ImageUpload from "@/components/admin/ImageUpload";
import type { SiteSettings } from "@/types";

const tabs = [
  {
    id: "branding",
    label: "Branding",
    sections: [
      {
        title: "Branding",
        fields: [
          ["hotelName", "Hotel name"],
          ["subtitle", "Subtitle"],
          ["heroImage", "Hero Image"],
          ["heroVideo", "Hero Video"],
          ["heroHeadline", "Hero headline"],
          ["heroSubheadline", "Hero subheadline"],
        ],
      },
      {
        title: "Introduction",
        fields: [
          ["introTitle", "Introduction title"],
          ["introSubtitle", "Introduction subtitle"],
        ],
      },
      {
        title: "Section Titles",
        fields: [
          ["galleryTitle", "Gallery Title"],
          ["testimonialsTitle", "Testimonials Title"],
          ["experiencesTitle", "Experiences Title"],
          ["offersTitle", "Offers Title"],
          ["newsletterTitle", "Newsletter Title"],
        ],
      },
    ],
    textareas: [
      { name: "introBody", label: "Introduction body", rows: 6 },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    sections: [
      {
        title: "Contact Information",
        fields: [
          ["phone", "Phone"],
          ["email", "Email"],
          ["address", "Address"],
          ["city", "City"],
          ["pincode", "Pincode"],
          ["whatsappNumber", "WhatsApp number"],
        ],
      },
      {
        title: "Location",
        fields: [
          ["mapLatitude", "Map Latitude"],
          ["mapLongitude", "Map Longitude"],
        ],
      },
    ],
    textareas: [
      { name: "locationDescription", label: "Location description", rows: 3 },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    sections: [
      {
        title: "Page Hero Images",
        fields: [
          ["roomsHeroImage", "Rooms Page Hero"],
          ["diningHeroImage", "Dining Page Hero"],
          ["spaHeroImage", "Spa Page Hero"],
          ["eventsHeroImage", "Events Page Hero"],
          ["contactHeroImage", "Contact Page Hero"],
        ],
      },
    ],
    textareas: [
      { name: "newsletterDescription", label: "Newsletter description", rows: 3 },
    ],
  },
  {
    id: "social",
    label: "Social",
    sections: [
      {
        title: "Social Media",
        fields: [
          ["instagramHandle", "Instagram handle"],
          ["facebookUrl", "Facebook URL"],
          ["instagramUrl", "Instagram URL"],
          ["twitterUrl", "Twitter URL"],
        ],
      },
    ],
    textareas: [],
  },
  {
    id: "seo",
    label: "SEO",
    sections: [
      {
        title: "SEO & Meta",
        fields: [
          ["metaTitle", "Meta title"],
          ["ogImage", "OG Image"],
        ],
      },
    ],
    textareas: [
      { name: "metaDescription", label: "Meta description (SEO)", rows: 3 },
    ],
  },
];

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("branding");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SiteSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    setError("");

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to update settings.");
      return;
    }

    setMessage("Settings updated successfully.");
  });

  const inputClass = "mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 font-sans text-sm text-charcoal outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-stone-200/80 bg-white p-1.5 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.14em] transition-all ${
              activeTab === tab.id
                ? "bg-gold text-white shadow-sm"
                : "text-stone-500 hover:bg-stone-100 hover:text-charcoal"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {currentTab.sections.map((section, sIdx) => (
        <motion.fieldset
          key={section.title}
          className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.06 }}
        >
          <legend className="font-serif text-lg uppercase tracking-[0.1em] text-charcoal">{section.title}</legend>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {section.fields.map(([name, label]) => {
              const isImageField = ["heroImage", "heroVideo", "ogImage", "roomsHeroImage", "diningHeroImage", "spaHeroImage", "eventsHeroImage", "contactHeroImage"].includes(name);
              return (
              <label key={name} className={isImageField ? "md:col-span-2 block" : "block"}>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</span>
                {isImageField ? (
                  <ImageUpload value={String(watch(name as keyof SiteSettings) || "")} onChange={(url) => setValue(name as keyof SiteSettings, url)} />
                ) : (
                  <input {...register(name as keyof SiteSettings)} className={inputClass} />
                )}
                {errors[name as keyof SiteSettings] && <span className="mt-1.5 block font-sans text-xs text-red-600">{String(errors[name as keyof SiteSettings]?.message)}</span>}
              </label>
              );
            })}
          </div>
        </motion.fieldset>
      ))}

      {/* Textarea fields for current tab */}
      {currentTab.textareas && currentTab.textareas.length > 0 && (
        <motion.fieldset
          className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: currentTab.sections.length * 0.06 }}
        >
          <legend className="font-serif text-lg uppercase tracking-[0.1em] text-charcoal">Long-form Content</legend>
          <div className="mt-4 grid gap-5">
            {currentTab.textareas.map((ta) => (
              <label key={ta.name} className="block">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{ta.label}</span>
                <textarea {...register(ta.name as keyof SiteSettings)} rows={ta.rows} className={inputClass} />
                {errors[ta.name as keyof SiteSettings] && <span className="mt-1.5 block font-sans text-xs text-red-600">{String(errors[ta.name as keyof SiteSettings]?.message)}</span>}
              </label>
            ))}
          </div>
        </motion.fieldset>
      )}

      {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 font-sans text-sm text-red-600">{error}</p>}
      {message && <p className="rounded-lg bg-green-50 px-4 py-2.5 font-sans text-sm text-green-700">{message}</p>}

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="rounded-xl bg-gold px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-white transition-all hover:bg-gold-dark disabled:opacity-60 active:scale-[0.97]">
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
