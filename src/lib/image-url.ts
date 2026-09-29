export const isSanityImageUrl = (src: string) => src.startsWith("https://cdn.sanity.io/images/");

// Sanity serves the uploaded original (sometimes a 10 MB PNG) unless the URL
// asks for a resized, re-encoded version. Other sources are returned untouched.
export const sizedImageUrl = (src: string, width: number) => {
  if (!isSanityImageUrl(src)) {
    return src;
  }

  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  url.searchParams.set("q", "80");
  return url.toString();
};
