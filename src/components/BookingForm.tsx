"use client";
/* eslint-disable react-hooks/incompatible-library */

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { publicBookingBase } from "@/lib/schemas";
import type { Room } from "@/types";

const formSchema = publicBookingBase.extend({
  checkOut: z.string().min(1),
});

type BookingValues = z.infer<typeof formSchema>;

function nightsBetween(checkIn: string, checkOut: string) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
}

function guestsFromParam(param: string | null): number {
  if (!param) return 2;
  const match = param.match(/(\d)/);
  return match ? parseInt(match[1]) : 2;
}

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35 } }),
};

export default function BookingForm({ rooms }: { rooms: Room[] }) {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      roomId: rooms[0]?.id || "",
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      guests: guestsFromParam(searchParams.get("guests")),
    },
  });

  const roomId = watch("roomId");
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const selectedRoom = useMemo(() => rooms.find((room) => room.id === roomId), [roomId, rooms]);
  const estimatedAmount = selectedRoom && checkIn && checkOut ? selectedRoom.price * nightsBetween(checkIn, checkOut) : 0;

  const onSubmit = handleSubmit(async (values) => {
    setMessage("");
    setError("");

    if (values.checkIn && values.checkOut && new Date(values.checkOut) <= new Date(values.checkIn)) {
      setError("Check-out must be after check-in.");
      return;
    }

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to create booking.");
      return;
    }

    setMessage(`Booking confirmed for ${data.booking.roomName}. Estimated total: ₹${data.booking.totalAmount.toLocaleString("en-IN")}.`);
    setBookingRef(data.booking.id);
  });

  const inputClass = "mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-sans text-sm text-charcoal outline-none transition focus:border-gold";
  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence mode="wait">
      {message ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="rounded-[32px] border border-green-200 bg-green-50 p-8 text-center md:p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          <h3 className="mt-6 font-serif text-2xl uppercase tracking-[0.1em] text-charcoal">Booking Confirmed!</h3>
          <p className="mt-4 font-sans text-sm leading-7 text-green-700">{message}</p>
          {bookingRef && (
            <p className="mt-2 font-sans text-xs text-green-600">
              Reference: <span className="font-semibold tracking-wider uppercase">{bookingRef}</span>
            </p>
          )}
          <button
            onClick={() => { setMessage(""); setBookingRef(""); }}
            className="mt-8 rounded-full border border-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-white"
          >
            Book Another Room
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          className="grid gap-5 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
        >
          <motion.label custom={0} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Guest Name</span>
            <input {...register("guestName")} className={inputClass} />
            {errors.guestName ? <span className="mt-2 block text-xs text-red-600">{errors.guestName.message}</span> : null}
          </motion.label>
          <motion.label custom={1} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Email</span>
            <input {...register("guestEmail")} type="email" className={inputClass} />
            {errors.guestEmail ? <span className="mt-2 block text-xs text-red-600">{errors.guestEmail.message}</span> : null}
          </motion.label>
          <motion.label custom={2} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Phone</span>
            <input {...register("guestPhone")} className={inputClass} />
            {errors.guestPhone ? <span className="mt-2 block text-xs text-red-600">{errors.guestPhone.message}</span> : null}
          </motion.label>
          <motion.label custom={3} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Room</span>
            <select {...register("roomId")} className={inputClass}>
              {rooms.filter((room) => room.isAvailable).map((room) => (
                <option key={room.id} value={room.id}>{room.name} · ₹{room.price.toLocaleString("en-IN")}</option>
              ))}
            </select>
          </motion.label>
          <motion.label custom={4} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Check-in</span>
            <input {...register("checkIn")} type="date" min={today} className={inputClass} />
            {errors.checkIn ? <span className="mt-2 block text-xs text-red-600">{errors.checkIn.message}</span> : null}
          </motion.label>
          <motion.label custom={5} variants={fieldVariants} initial="hidden" animate="visible">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Check-out</span>
            <input {...register("checkOut")} type="date" min={checkIn || today} className={inputClass} />
            {errors.checkOut ? <span className="mt-2 block text-xs text-red-600">{errors.checkOut.message}</span> : null}
          </motion.label>
          <motion.label custom={6} variants={fieldVariants} initial="hidden" animate="visible" className="md:col-span-2">
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Guests</span>
            <input {...register("guests", { valueAsNumber: true })} type="number" min={1} max={selectedRoom?.maxGuests || 6} className={inputClass} />
            {errors.guests ? <span className="mt-2 block text-xs text-red-600">{errors.guests.message}</span> : null}
          </motion.label>

          <motion.div custom={7} variants={fieldVariants} initial="hidden" animate="visible" className="md:col-span-2 rounded-[28px] bg-beige p-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-light">Estimated stay total</p>
            <p className="mt-3 font-serif text-3xl text-charcoal">{estimatedAmount > 0 ? `₹${estimatedAmount.toLocaleString("en-IN")}` : "Select dates to estimate"}</p>
            <p className="mt-3 font-sans text-sm text-text-secondary">Room pricing is calculated from the selected room and travel dates. Final confirmation appears after submission.</p>
          </motion.div>

          {error ? <p className="md:col-span-2 font-sans text-sm text-red-600">{error}</p> : null}

          <motion.div custom={8} variants={fieldVariants} initial="hidden" animate="visible" className="md:col-span-2 flex justify-end">
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-gold px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white transition hover:bg-gold-dark disabled:opacity-60">
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
