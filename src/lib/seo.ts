import type { Book } from '../data/books';

export const SITE_URL = 'https://www.vanyastolarski.fr';
export const SITE_NAME = 'Vanya Stolarski';
export const publicPaths = ['/', '/livres', '/tarifs', '/galerie', '/reviews', '/citations', '/coll-libris', '/atelier-cartes'];

export const canonicalUrl = (path: string) => {
  const pathname = new URL(path, SITE_URL).pathname.replace(/\/+$/, '') || '/';
  return `${SITE_URL}${pathname}`;
};

// Reuse editorial content verbatim; shorten only at a word boundary.
export const excerpt = (text: string, limit = 160) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const end = clean.lastIndexOf(' ', limit - 1);
  return `${clean.slice(0, end > 0 ? end : limit - 1).trimEnd()}…`;
};

export const bookSeoTitle = (book: Book) =>
  `${book.identity.title}${/^tome\s/i.test(book.identity.tome) ? ` — ${book.identity.tome}` : ''} | ${SITE_NAME}`;

export const bookDescription = (book: Book) =>
  excerpt(`${book.identity.title}${/^tome\s/i.test(book.identity.tome) ? `, ${book.identity.tome}` : ''} : ${book.narrative.shortDescription || book.narrative.hook}`);

export const bookStructuredData = (book: Book) => ({
  '@type': 'Book',
  '@id': `${canonicalUrl(`/livres/${book.slug}`)}#book`,
  name: book.identity.title,
  alternateName: `${book.identity.title} — ${book.identity.tome}`,
  url: canonicalUrl(`/livres/${book.slug}`),
  author: { '@id': `${SITE_URL}/#author` },
  inLanguage: 'fr',
  genre: book.identity.genres,
  description: book.narrative.shortDescription || book.narrative.hook,
  ...(book.media.cover.src ? { image: new URL(book.media.cover.src, SITE_URL).href } : {}),
});

// Escape HTML-sensitive characters even in CMS-provided strings.
export const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

export const escapeXml = (value: string) => value.replace(/[<>&"']/g, char =>
  ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
