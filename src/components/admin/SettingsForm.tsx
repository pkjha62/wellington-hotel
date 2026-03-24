"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/lib/schemas";
import { motion } from "framer-motion";
import type { SiteSettings } from "@/types";

const sections = [
  {
    title: "Branding",
    fields: [
      ["hotelName", "Hotel name"],
      ["subtitle", "Subtitle"],
      ["heroImage", "Hero image URL"],
      ["heroVideo", "Hero video URL"],
      ["heroHeadline", "Hero headline"],
      ["heroSubheadline", "Hero subheadline"],
    ],
  },
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
    title: "Introduction",
    fields: [
      ["introTitle", "Introduction title"],
      ["introSubtitle", "Introduction subtitle"],
    ],
  },
  {
    title: "Social Media",
    fields: [
      ["instagramHandle", "Instagram handle"],
      ["facebookUrl", "Facebook URL"],
      ["instagramUrl", "Instagram URL"],
      ["twitterUrl", "Twitter URL"],
    ],
  },
  {
    title: "SEO & Meta",
    fields: [
      ["metaTitle", "Meta title"],
      ["ogImage", "OG Image URL"],
    ],
  },
];

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to update settings.");
      return;
    }

    setMessage("Settings updated successfully.");
  });

  const inputClass = "mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 font-sans text-sm text-charcoal outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {sections.map((section, sIdx) => (
        <motion.fieldset
          key={section.title}
          className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.06 }}
        >
          <legend className="font-serif text-lg uppercase tracking-[0.1em] text-charcoal">{section.title}</legend>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {section.fields.map(([name, label]) => (
              <label key={name} className="block">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</span>
                <input {...register(name as keyof SiteSettings)} className={inputClass} />
                {errors[name as keyof SiteSettings] && <span className="mt-1.5 block font-sans text-xs text-red-600">{String(errors[name as keyof SiteSettings]?.message)}</span>}
              </label>
            ))}
          </div>
        </motion.fieldset>
      ))}

      {/* Textarea fields */}
      <motion.fieldset
        className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sections.length * 0.06 }}
      >
        <legend className="font-serif text-lg uppercase tracking-[0.1em] text-charcoal">Long-form Content</legend>
        <div className="mt-4 grid gap-5">
          <label className="block">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Introduction body</span>
            <textarea {...register("introBody")} rows={6} className={inputClass} />
            {errors.introBody && <span className="mt-1.5 block font-sans text-xs text-red-600">{errors.introBody.message}</span>}
          </label>
          <label className="block">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Meta description (SEO)</span>
            <textarea {...register("metaDescription")} rows={3} className={inputClass} />
            {errors.metaDescription && <span className="mt-1.5 block font-sans text-xs text-red-600">{errors.metaDescription.message}</span>}
          </label>
        </div>
      </motion.fieldset>

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
