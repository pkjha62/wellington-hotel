"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Client-side validation
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB");
      return;
    }

    // Local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        setPreview(value);
        return;
      }

      onChange(data.url);
      setPreview(data.url);
    } catch {
      setError("Network error during upload");
      setPreview(value);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = () => {
    onChange("");
    setPreview("");
    setError("");
  };

  return (
    <div className="mt-2 space-y-2">
      {preview && (
        <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full object-cover"
          />
          <button
            type="button"
            onClick={remove}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
        {uploading ? "Uploading..." : preview ? "Change Image" : "Choose File"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={handleFile}
        className="hidden"
      />

      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}
