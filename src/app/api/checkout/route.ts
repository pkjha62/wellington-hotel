import { NextResponse } from "next/server";
import { createOrder, RAZORPAY_KEY_ID } from "@/lib/razorpay";
import { csrfCheck } from "@/lib/csrf";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  bookingId: z.string().min(1),
  amount: z.number().positive(),
});

export async function POST(request: Request) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const ip = getClientIp(request);
  if (!rateLimit(`checkout:${ip}`, 10)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  if (!RAZORPAY_KEY_ID) {
    return NextResponse.json(
      { error: "Payment gateway not configured." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
  }

  const { bookingId, amount } = parsed.data;

  try {
    const order = await createOrder({
      amount: Math.round(amount * 100), // Convert rupees to paise
      receipt: bookingId,
      notes: { bookingId },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { error: "Unable to create payment order." },
      { status: 500 }
    );
  }
}
