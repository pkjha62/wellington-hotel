import { randomUUID } from "crypto";
import { requireAdmin, error, json } from "@/lib/api";
import { saveUploadedFile } from "@/lib/uploads";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) return error("Unauthorized", 401);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return error("No file provided");
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return error("Only JPEG, PNG, WebP, GIF, and SVG images are allowed");
    }

    if (file.size > MAX_SIZE) {
      return error("File size must be under 5 MB");
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await saveUploadedFile(safeName, buffer, file.type);

    return json({ url, name: file.name });
  } catch (err) {
    console.error("Upload error:", err);
    return error("Upload failed — check server logs", 500);
  }
}
