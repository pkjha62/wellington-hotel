import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(197,162,88,0.25),_transparent_35%),linear-gradient(135deg,_#171717,_#2d2d2d)] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center gap-12 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden lg:block">
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold">External Admin Page</p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl uppercase leading-tight tracking-[0.12em]">
            Manage bookings, rooms, guest content, and hotel messaging.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-8 text-white/70">
            This console controls the public-facing Deoghar hotel website, including rooms, gallery, offerings, testimonials, announcements, and booking operations.
          </p>
        </section>
        <section className="mx-auto w-full max-w-xl">
          <p className="font-serif text-3xl uppercase tracking-[0.14em] text-white">The Deoghar Grand</p>
          <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.24em] text-gold">Hotel and Spa Admin</p>
          <LoginForm />
          <p className="mt-4 font-sans text-xs text-white/55">Default credentials unless overridden by env: admin / deoghar123</p>
        </section>
      </div>
    </main>
  );
}
