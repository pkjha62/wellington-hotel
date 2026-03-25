import { error, json, parseJson } from "@/lib/api";
import { addSubscriber } from "@/lib/store";
import { subscriberSchema } from "@/lib/schemas";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { csrfCheck } from "@/lib/csrf";

export async function POST(request: Request) {
  const csrfError = csrfCheck(request);
  if (csrfError) return csrfError;

  const ip = getClientIp(request);
  if (!rateLimit(`newsletter:${ip}`, 5)) {
    return error("Too many requests. Please try again later.", 429);
  }

  const body = await parseJson(request);
  const parsed = subscriberSchema.safeParse(body);

  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid subscription data");
  }

  const subscriber = addSubscriber(parsed.data);
  if (!subscriber) {
    return error("This email is already subscribed.", 409);
  }

  return json({ subscriber }, { status: 201 });
}
