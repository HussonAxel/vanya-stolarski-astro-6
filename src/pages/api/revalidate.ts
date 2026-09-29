import { createHash, timingSafeEqual } from "node:crypto";
import type { APIRoute } from "astro";
import { SANITY_CACHE_TAG } from "../../lib/cache";

export const prerender = false;

// Called by a Sanity webhook on publish, with the header
// `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`.
const digest = (value: string) => createHash("sha256").update(value).digest();

const isAuthorized = (request: Request) => {
  const secret = import.meta.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  return timingSafeEqual(digest(header), digest(`Bearer ${secret}`));
};

export const POST: APIRoute = async ({ request, cache }) => {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  await cache.invalidate({ tags: [SANITY_CACHE_TAG] });
  return Response.json({ revalidated: [SANITY_CACHE_TAG] });
};
