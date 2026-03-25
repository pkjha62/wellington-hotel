const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80";

function stripWrappingQuotes(value: string) {
  return value.replace(/^['\"]+|['\"]+$/g, "");
}

export function normalizeImageUrl(input?: string | null, fallback = DEFAULT_FALLBACK_IMAGE): string {
  const value = stripWrappingQuotes((input || "").trim());
  if (!value) return fallback;

  const invalidLiteral = ["image", "null", "undefined", "about:blank", "nan"];
  if (invalidLiteral.includes(value.toLowerCase())) return fallback;

  if (value.startsWith("/") || /^https?:\/\//i.test(value)) return value;
  return fallback;
}

export function normalizeImageList(inputs: string[] | undefined | null, fallback = DEFAULT_FALLBACK_IMAGE): string[] {
  if (!inputs || inputs.length === 0) return [fallback];
  return inputs.map((item) => normalizeImageUrl(item, fallback)).filter(Boolean);
}

export { DEFAULT_FALLBACK_IMAGE };