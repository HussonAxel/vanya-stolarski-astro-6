export type Conversion = { name: 'shop_click' | 'chapter_click' | 'quote_open' | 'contact_click'; data: { page: string; destination: string } };

// Only category and page pathname leave the browser. No email, subject or query.
export function conversionForLink(href: string, pageUrl: string): Conversion | undefined {
  const page = new URL(pageUrl).pathname;
  const url = new URL(href, pageUrl);
  if (url.hostname === 'vanyastolarski.sumupstore.com' || /(^|\.)amazon\.fr$/.test(url.hostname) && /\/(dp|product)\//.test(url.pathname)) {
    return { name: 'shop_click', data: { page, destination: url.hostname.endsWith('amazon.fr') ? 'amazon' : 'sumup' } };
  }
  if (url.origin === new URL(pageUrl).origin && /\/ChapterOneBooks\/.*\.pdf$/i.test(url.pathname)) return { name: 'chapter_click', data: { page, destination: 'chapter_pdf' } };
  if (url.protocol === 'mailto:') return { name: 'contact_click', data: { page, destination: 'email' } };
  if (url.hostname === 'mail.google.com') return { name: 'contact_click', data: { page, destination: 'gmail' } };
  return undefined;
}
