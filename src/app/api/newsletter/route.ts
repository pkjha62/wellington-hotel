import { error, json, parseJson } from "@/lib/api";
import { addSubscriber } from "@/lib/store";
import { subscriberSchema } from "@/lib/schemas";

export async function POST(request: Request) {
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
