"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { z } from "zod";

const formSchema = loginSchema;
type LoginValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed.");
      return;
    }

    router.push("/admin");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="mt-10 rounded-[32px] border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="grid gap-5">
        <label>
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Username</span>
          <input {...register("username")} className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold focus:bg-white" />
          {errors.username ? <span className="mt-2 block font-sans text-xs text-red-600">{errors.username.message}</span> : null}
        </label>
        <label>
          <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Password</span>
          <input {...register("password")} type="password" className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold focus:bg-white" />
          {errors.password ? <span className="mt-2 block font-sans text-xs text-red-600">{errors.password.message}</span> : null}
        </label>
        {error ? <p className="font-sans text-sm text-red-600">{error}</p> : null}
        <button type="submit" disabled={isSubmitting} className="mt-2 rounded-full bg-charcoal px-6 py-3 font-sans text-xs uppercase tracking-[0.22em] text-white transition hover:bg-charcoal-light disabled:opacity-60">
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
