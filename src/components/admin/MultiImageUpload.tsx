"use client";

import { useState, useRef } from "react";

interface MultiImageUploadProps {
  value: string; // comma-separated URLs
  onChange: (value: string) => void;
}

export default function MultiImageUpload({ value, onChange }: MultiImageUploadProps) {
  const urls = value ? value.split(",").map((u) => u.trim()).filter(Boolean) : [];
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name}: File must be under 5 MB`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          newUrls.push(data.url);
        } else {
          setError(data.error || `Failed to upload ${file.name}`);
        }
      } catch {
        setError(`Network error uploading ${file.name}`);
      }
    }

    if (newUrls.length > 0) {
      const updated = [...urls, ...newUrls].join(", ");
      onChange(updated);
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    const updated = urls.filter((_, i) => i !== index).join(", ");
    onChange(updated);
  };

  return (
    <div className="mt-2 space-y-3">
      {urls.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {urls.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Image ${i + 1}`} className="h-24 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/80"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50/80 px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.14em] text-stone-500 transition-all hover:border-gold hover:text-gold disabled:opacity-50"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        {uploading ? "Uploading..." : "Add Images"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}
