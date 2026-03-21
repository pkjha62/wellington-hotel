import { addGalleryImage, getGallery } from "@/lib/store";
import { error, json, parseJson, requireAdmin } from "@/lib/api";
import { galleryImageSchema } from "@/lib/schemas";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  return json(getGallery());
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return error("Unauthorized", 401);
  }

  const body = await parseJson(request);
  const parsed = galleryImageSchema.safeParse(body);
  if (!parsed.success) {
    return error(parsed.error.issues[0]?.message || "Invalid gallery item");
  }

  return json(addGalleryImage(parsed.data), { status: 201 });
}
