"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import SettingsForm from "@/components/admin/SettingsForm";
import type { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    setError("");
    fetch("/api/admin/settings", { cache: "no-store", credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load settings");
        return r.json();
      })
      .then((data) => setSettings(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <AdminShell title="Settings" description="Edit hotel identity, hero content, contact details, and social links that appear across the public site.">
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm">
              <div className="h-5 w-32 animate-pulse rounded-lg bg-stone-200" />
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="h-10 animate-pulse rounded-xl bg-stone-100" />
                <div className="h-10 animate-pulse rounded-xl bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-sans text-sm font-medium text-red-700">{error}</p>
          <button type="button" onClick={load} className="mt-4 rounded-xl border border-red-300 px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-red-600 transition-all hover:bg-red-100">
            Retry
          </button>
        </div>
      ) : settings ? (
        <SettingsForm settings={settings} />
      ) : null}
    </AdminShell>
  );
}
