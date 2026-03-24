"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/lib/schemas";
import AdminShell from "@/components/admin/AdminShell";

type FormValues = { currentPassword: string; newPassword: string };

export default function ChangePasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    setError("");

    const response = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to change password.");
      return;
    }

    setMessage("Password changed successfully.");
    reset();
  });

  const inputClass =
    "mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold focus:bg-white";

  return (
    <AdminShell title="Change Password" description="Update your admin account password. Use a strong, unique password.">
      <form onSubmit={onSubmit} className="max-w-md space-y-5 rounded-[28px] border border-stone-200 bg-white p-6">
        <label className="block">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Current Password</span>
          <input {...register("currentPassword")} type="password" className={inputClass} />
          {errors.currentPassword && (
            <span className="mt-2 block font-sans text-xs text-red-600">{errors.currentPassword.message}</span>
          )}
        </label>

        <label className="block">
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">New Password</span>
          <input {...register("newPassword")} type="password" className={inputClass} />
          {errors.newPassword && (
            <span className="mt-2 block font-sans text-xs text-red-600">{errors.newPassword.message}</span>
          )}
        </label>

        {error && <p className="font-sans text-sm text-red-600">{error}</p>}
        {message && <p className="font-sans text-sm text-green-700">{message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-white transition hover:bg-gold-dark disabled:opacity-60"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </AdminShell>
  );
}
