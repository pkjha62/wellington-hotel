import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import { getStats } from "@/lib/store";

export default function AdminDashboardPage() {
  const stats = getStats();

  return (
    <AdminShell
      title="Dashboard"
      description="Overview of current inventory, demand, subscriber growth, and operational workload for the Deoghar property."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Available Rooms" value={stats.availableRooms} tone="accent" />
        <StatCard label="Active Bookings" value={stats.activeBookings} />
        <StatCard label="Revenue" value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`} tone="accent" />
        <StatCard label="Pending Reviews" value={stats.pendingTestimonials} tone="warn" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <h2 className="font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">Operational Snapshot</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Total Rooms</p>
              <p className="mt-2 font-serif text-3xl text-charcoal">{stats.totalRooms}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Total Bookings</p>
              <p className="mt-2 font-serif text-3xl text-charcoal">{stats.totalBookings}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Subscribers</p>
              <p className="mt-2 font-serif text-3xl text-charcoal">{stats.totalSubscribers}</p>
            </div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Active Announcements</p>
              <p className="mt-2 font-serif text-3xl text-charcoal">{stats.activeAnnouncements}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <h2 className="font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">Quick Access</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Manage Rooms", "/admin/rooms"],
              ["View Bookings", "/admin/bookings"],
              ["Approve Testimonials", "/admin/testimonials"],
              ["Update Settings", "/admin/settings"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-2xl border border-stone-200 px-4 py-4 font-sans text-sm text-charcoal transition hover:border-gold hover:bg-beige">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
