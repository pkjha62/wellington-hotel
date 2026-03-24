"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/rooms", label: "Rooms" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/offerings", label: "Offerings" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/offers", label: "Special Offers" },
  { href: "/admin/stat-facts", label: "Stat Facts" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/change-password", label: "Change Password" },
];

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-charcoal">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[280px] transform border-r border-stone-200 bg-white px-6 py-8 transition-transform duration-300 lg:static lg:z-auto lg:w-auto lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="font-serif text-xl uppercase tracking-[0.16em] text-charcoal">The Deoghar Grand</p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.24em] text-gold">Admin Console</p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="mt-1 rounded-full p-1.5 text-text-secondary transition hover:bg-stone-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="rounded-2xl px-4 py-3 font-sans text-sm text-text-secondary transition hover:bg-beige hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-full border border-stone-200 p-2 text-text-secondary transition hover:border-gold hover:text-gold lg:hidden"
                aria-label="Open sidebar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              </button>
              <div>
                <h1 className="font-serif text-3xl uppercase tracking-[0.12em] text-charcoal">{title}</h1>
                <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-text-secondary">{description}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
