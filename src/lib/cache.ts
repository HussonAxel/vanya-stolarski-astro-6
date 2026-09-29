// Tag carried by every CDN-cached page built from Sanity content.
// Purged by the Sanity webhook (src/pages/api/revalidate.ts) on publish.
export const SANITY_CACHE_TAG = "sanity-content";
