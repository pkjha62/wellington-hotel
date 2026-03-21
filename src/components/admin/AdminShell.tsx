import Link from "next/link";
import { ReactNode } from "react";
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
  { href: "/admin/settings", label: "Settings" },
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
  return (
    <div className="min-h-screen bg-stone-50 text-charcoal">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-stone-200 bg-white px-6 py-8 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="font-serif text-xl uppercase tracking-[0.16em] text-charcoal">The Deoghar Grand</p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.24em] text-gold">Admin Console</p>
          </div>
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 font-sans text-sm text-text-secondary transition hover:bg-beige hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl uppercase tracking-[0.12em] text-charcoal">{title}</h1>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-text-secondary">{description}</p>
            </div>
            <LogoutButton />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
