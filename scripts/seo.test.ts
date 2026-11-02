import assert from 'node:assert/strict';
import { test } from 'node:test';
import { books } from '../src/data/books';
import { bookDescription, bookSeoTitle, canonicalUrl, excerpt, serializeJsonLd } from '../src/lib/seo';

test('canonical URLs use the official origin and discard tracking and trailing slashes', () => {
  assert.equal(canonicalUrl('/livres/?utm_source=test#cover'), 'https://www.vanyastolarski.fr/livres');
  assert.equal(canonicalUrl('/'), 'https://www.vanyastolarski.fr/');
});

test('book metadata distinguishes volumes and derives excerpts from existing copy', () => {
  const titles = books.map(bookSeoTitle);
  assert.equal(new Set(titles).size, books.length);
  for (const book of books) {
    assert.ok(bookDescription(book).length <= 160);
    assert.ok(bookDescription(book).startsWith(book.identity.title));
  }
  assert.equal(excerpt('Une phrase publiée.'), 'Une phrase publiée.');
  assert.equal(excerpt('Un récit déjà publié et conservé', 20), 'Un récit déjà…');
});

test('CMS strings cannot close a JSON-LD script element', () => {
  const value = { name: '</script><script>alert("x")</script> & livre' };
  const serialized = serializeJsonLd(value);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), value);
});

const origin = process.env.SEO_TEST_ORIGIN;
test('rendered sitemap, metadata, unknown books and internal page links', { skip: !origin }, async () => {
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(sitemap.headers.get('content-type')!, /application\/xml/);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.ok(urls.length >= 8);
  assert.equal(new Set(urls).size, urls.length);
  const titles: string[] = [];
  const descriptions: string[] = [];
  const links = new Set<string>();
  for (const url of urls) {
    assert.ok(url.startsWith('https://www.vanyastolarski.fr/'));
    assert.doesNotMatch(url, /\/(admin|api)\b/);
    const path = new URL(url).pathname;
    const response = await fetch(`${origin}${path}?utm_source=seo-test`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one H1`);
    assert.ok(html.includes(`rel="canonical" href="${url}"`), `${path}: canonical`);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description = html.match(/name="description" content="([^"]+)"/)?.[1];
    assert.ok(title, `${path}: title`);
    assert.ok(description, `${path}: description`);
    titles.push(title!);
    descriptions.push(description!);
    assert.match(html, /property="og:locale" content="fr_FR"/);
    const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert.equal(schema.length, 1, `${path}: JSON-LD`);
    const graph = JSON.parse(schema[0][1])['@graph'];
    if (path.startsWith('/livres/')) assert.ok(graph.some((entry: any) => entry['@type'] === 'Book'));
    for (const link of html.matchAll(/href="(\/[^"#?]*)[^" ]*"/g)) {
      const target = link[1];
      if (!target.startsWith('//') && !target.includes('.') && !target.startsWith('/_')) links.add(target);
    }
  }
  assert.equal(new Set(titles).size, urls.length, 'unique titles');
  assert.equal(new Set(descriptions).size, urls.length, 'unique descriptions');
  for (const path of links) assert.equal((await fetch(`${origin}${path}`)).status, 200, `link ${path}`);
  const missing = await fetch(`${origin}/livres/__seo-inconnu__`, { redirect: 'manual' });
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /noindex, follow/);
  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.match(robots, /Sitemap: https:\/\/www.vanyastolarski.fr\/sitemap.xml/);
  console.log(`Verified ${urls.length} indexable pages and ${links.size} internal page links.`);
});
