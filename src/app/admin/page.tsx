"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import { useEffect, useState } from "react";

type Stats = {
  availableRooms: number;
  activeBookings: number;
  totalRevenue: number;
  pendingTestimonials: number;
  totalRooms: number;
  totalBookings: number;
  totalSubscribers: number;
  activeAnnouncements: number;
};

const quickLinks = [
  { label: "Manage Rooms", href: "/admin/rooms", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" },
  { label: "View Bookings", href: "/admin/bookings", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Manage Dining", href: "/admin/dining", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Spa Services", href: "/admin/spa", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { label: "Event Venues", href: "/admin/events", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
  { label: "View Enquiries", href: "/admin/enquiries", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { label: "Approve Testimonials", href: "/admin/testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { label: "Manage FAQs", href: "/admin/faqs", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Special Offers", href: "/admin/offers", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
  { label: "Update Settings", href: "/admin/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <AdminShell
      title="Dashboard"
      description="Overview of current inventory, demand, subscriber growth, and operational workload for the Deoghar property."
    >
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Available Rooms" value={stats?.availableRooms ?? "—"} tone="accent" index={0} />
        <StatCard label="Active Bookings" value={stats?.activeBookings ?? "—"} index={1} />
        <StatCard label="Revenue" value={stats ? `₹${stats.totalRevenue.toLocaleString("en-IN")}` : "—"} tone="accent" index={2} />
        <StatCard label="Pending Reviews" value={stats?.pendingTestimonials ?? "—"} tone="warn" index={3} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Operational Snapshot */}
        <motion.section
          className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">Operational Snapshot</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Total Rooms", value: stats?.totalRooms },
              { label: "Total Bookings", value: stats?.totalBookings },
              { label: "Subscribers", value: stats?.totalSubscribers },
              { label: "Active Announcements", value: stats?.activeAnnouncements },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-stone-50/80 p-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{item.label}</p>
                <p className="mt-2 font-serif text-2xl font-bold text-charcoal">{item.value ?? "—"}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Quick Access */}
        <motion.section
          className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <h2 className="font-serif text-xl uppercase tracking-[0.1em] text-charcoal">Quick Access</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200/80 px-4 py-3.5 font-sans text-sm text-charcoal transition-all hover:border-gold/50 hover:bg-gold/[0.04] hover:shadow-sm"
                >
                  <svg className="h-4 w-4 shrink-0 text-stone-400 transition-colors group-hover:text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </AdminShell>
  );
}
