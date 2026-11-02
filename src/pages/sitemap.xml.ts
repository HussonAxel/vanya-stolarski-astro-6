import type { APIRoute } from 'astro';
import { getBooksContent } from '../lib/content';
import { canonicalUrl, escapeXml, publicPaths } from '../lib/seo';

// SSR keeps the sitemap aligned with published Sanity books, without a rebuild.
export const GET: APIRoute = async () => {
  const books = await getBooksContent();
  const paths = [...new Set([...publicPaths, ...books.map(book => `/livres/${book.slug}`)])];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escapeXml(canonicalUrl(path))}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
