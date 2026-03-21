"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-gold/30 px-4 py-2 font-sans text-[11px] tracking-[0.2em] uppercase text-charcoal transition hover:border-gold hover:text-gold"
    >
      Logout
    </button>
  );
}
