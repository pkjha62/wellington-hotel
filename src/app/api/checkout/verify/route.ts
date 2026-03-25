import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { csrfCheck } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  bookingId: z.string().min(1),
});

export async function POST(request: Request) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const ip = getClientIp(request);
  if (!rateLimit(`verify:${ip}`, 10)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = parsed.data;

  const isValid = verifyPaymentSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  // TODO: Update booking status to "confirmed" and record paymentId in DB
  // e.g., await prisma.booking.update({ where: { id: bookingId }, data: { status: "confirmed", paymentId: razorpay_payment_id } });

  return NextResponse.json({
    success: true,
    bookingId,
    paymentId: razorpay_payment_id,
  });
}
