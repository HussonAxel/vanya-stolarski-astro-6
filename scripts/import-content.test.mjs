import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';
import ts from 'typescript';

for (const rateLimited of [false, true]) {
test(`the importer bounds uploads and completes (429: ${rateLimited})`, async () => {
  let active = 0;
  let peak = 0;
  let committed = false;
  let attempts = 0;
  let streams = 0;
  const waits = [];
  const transaction = { createOrReplace() { return this; }, async commit() { committed = true; } };
  const client = {
    assets: { async upload() {
      if (rateLimited && attempts++ === 0) {
        throw { statusCode: 429, response: { headers: { 'retry-after': '10' } } };
      }
      active++;
      peak = Math.max(peak, active);
      await new Promise(resolve => setTimeout(resolve, 2));
      active--;
      return { _id: 'image-test' };
    } },
    transaction: () => transaction,
  };
  const context = createContext({ console: { log() {}, warn() {} }, setTimeout: (callback, delay) => {
    waits.push(delay);
    return setTimeout(callback, 0);
  }, process: {
    env: { PUBLIC_SANITY_PROJECT_ID: 'test', SANITY_API_WRITE_TOKEN: 'test' }, cwd: () => '/test',
  } });
  const fixtures = {
    'dotenv/config': {},
    'node:fs': { existsSync: () => true, createReadStream: () => ({ id: ++streams }) },
    'node:path': { basename: value => value.split('/').at(-1), join: (...parts) => parts.join('/') },
    '@sanity/client': { createClient: () => client },
    '../src/data/books': { books: [] },
    '../src/data/services': { services: [] },
    '../src/data/reviews': { reviews: [] },
    '../src/data/citations': { citations: [] },
    '../src/data/gallery': { galleryItems: Array.from({ length: 60 }, (_, i) => ({ image: `/image-${i}.webp` })) },
  };
  const source = ts.transpileModule(readFileSync(new URL('./import-content.ts', import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  }).outputText;
  const module = new SourceTextModule(source, { context });
  await module.link(specifier => {
    const exports = fixtures[specifier];
    assert.ok(exports, `Unexpected import: ${specifier}`);
    return new SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await module.evaluate();
  assert.ok(committed);
  assert.ok(peak <= 4, `Expected at most 4 concurrent uploads, got ${peak}`);
  assert.equal(streams, rateLimited ? 61 : 60);
  assert.deepEqual(waits, rateLimited ? [10000] : []);
});
}
