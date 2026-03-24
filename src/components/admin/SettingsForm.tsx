"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/lib/schemas";
import type { SiteSettings } from "@/types";

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

  const inputClass = "mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold focus:bg-white";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[28px] border border-stone-200 bg-white p-6 md:grid-cols-2">
      {[
        ["hotelName", "Hotel name"],
        ["subtitle", "Subtitle"],
        ["phone", "Phone"],
        ["email", "Email"],
        ["address", "Address"],
        ["city", "City"],
        ["pincode", "Pincode"],
        ["heroImage", "Hero image URL"],
        ["heroHeadline", "Hero headline"],
        ["heroSubheadline", "Hero subheadline"],
        ["introTitle", "Introduction title"],
        ["introSubtitle", "Introduction subtitle"],
        ["instagramHandle", "Instagram handle"],
        ["facebookUrl", "Facebook URL"],
        ["instagramUrl", "Instagram URL"],
        ["twitterUrl", "Twitter URL"],
        ["whatsappNumber", "WhatsApp number"],
        ["metaTitle", "Meta title (SEO)"],
        ["ogImage", "OG Image URL"],
      ].map(([name, label]) => (
        <label key={name} className="block">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">{label}</span>
          <input {...register(name as keyof SiteSettings)} className={inputClass} />
          {errors[name as keyof SiteSettings] ? <span className="mt-2 block font-sans text-xs text-red-600">{String(errors[name as keyof SiteSettings]?.message)}</span> : null}
        </label>
      ))}

      <label className="md:col-span-2 block">
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Introduction body</span>
        <textarea {...register("introBody")} rows={6} className={inputClass} />
        {errors.introBody ? <span className="mt-2 block font-sans text-xs text-red-600">{errors.introBody.message}</span> : null}
      </label>

      <label className="md:col-span-2 block">
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Meta description (SEO)</span>
        <textarea {...register("metaDescription")} rows={3} className={inputClass} />
        {errors.metaDescription ? <span className="mt-2 block font-sans text-xs text-red-600">{errors.metaDescription.message}</span> : null}
      </label>

      {error ? <p className="md:col-span-2 font-sans text-sm text-red-600">{error}</p> : null}
      {message ? <p className="md:col-span-2 font-sans text-sm text-green-700">{message}</p> : null}

      <div className="md:col-span-2 flex justify-end">
        <button type="submit" disabled={isSubmitting} className="rounded-full bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark disabled:opacity-60">
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
