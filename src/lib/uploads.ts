// In-memory file storage (consistent with the in-memory data store)
// Files are lost on server restart, same as all other data

const files = new Map<string, { buffer: Buffer; contentType: string }>();

export function saveUploadedFile(name: string, buffer: Buffer, contentType: string): string {
  files.set(name, { buffer, contentType });
  return `/api/uploads/${name}`;
}

export function getUploadedFile(name: string) {
  return files.get(name) ?? null;
}
