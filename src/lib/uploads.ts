/**
 * File storage — uses Vercel Blob in production, disk in development.
 */
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

function ensureDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function saveUploadedFile(
  name: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  // Check at runtime so env vars loaded after module init are picked up
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, buffer, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  // Local development: disk storage
  ensureDir();
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buffer);
  fs.writeFileSync(path.join(UPLOAD_DIR, `${name}.type`), contentType);
  return `/api/uploads/${name}`;
}

export function getUploadedFile(name: string) {
  // Prevent path traversal
  if (name.includes("..") || name.includes("/") || name.includes("\\")) return null;

  const filePath = path.join(UPLOAD_DIR, name);
  const metaPath = path.join(UPLOAD_DIR, `${name}.type`);

  if (!fs.existsSync(filePath)) return null;

  const buffer = fs.readFileSync(filePath);
  const contentType = fs.existsSync(metaPath)
    ? fs.readFileSync(metaPath, "utf-8")
    : "application/octet-stream";

  return { buffer, contentType };
}
