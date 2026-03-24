"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { z } from "zod";
import { motion } from "framer-motion";

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

  const inputClass = "mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 font-sans text-sm text-charcoal outline-none transition-all duration-200 focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20";

  return (
    <motion.form
      onSubmit={onSubmit}
      className="mt-8 rounded-2xl border border-white/15 bg-white/95 p-8 shadow-2xl backdrop-blur sm:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
    >
      <div className="grid gap-5">
        <label>
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Username</span>
          <input {...register("username")} autoComplete="username" className={inputClass} />
          {errors.username && <span className="mt-1.5 block font-sans text-xs text-red-500">{errors.username.message}</span>}
        </label>
        <label>
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Password</span>
          <input {...register("password")} type="password" autoComplete="current-password" className={inputClass} />
          {errors.password && <span className="mt-1.5 block font-sans text-xs text-red-500">{errors.password.message}</span>}
        </label>
        {error && <p className="rounded-lg bg-red-50 px-4 py-2.5 font-sans text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-charcoal px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.18em] text-white transition-all hover:bg-charcoal-light disabled:opacity-60 active:scale-[0.97]"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </div>
    </motion.form>
  );
}
