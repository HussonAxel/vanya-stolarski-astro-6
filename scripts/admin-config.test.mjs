// Run against `pnpm dev`: node --experimental-vm-modules --test scripts/admin-config.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { SourceTextModule, SyntheticModule, createContext } from 'node:vm';

test('the served Studio config resolves JavaScript and evaluates without Node globals', async () => {
  const base = process.env.TEST_BASE_URL || 'http://localhost:4321';
  const page = await fetch(`${base}/admin`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Sanity Studio/);
  const response = await fetch(`${base}/sanity.config.ts`);
  assert.equal(response.status, 200);
  const source = await response.text();
  const context = createContext({});
  const module = new SourceTextModule(source, { context });
  await module.link(async specifier => {
    assert.doesNotMatch(specifier, /package\.json/, 'Studio must import JavaScript, not package metadata');
    const dependency = await fetch(new URL(specifier, base));
    assert.equal(dependency.status, 200, specifier);
    const exports = specifier.includes('schemaTypes') ? { schemaTypes: [] }
      : specifier.includes('sanity_structure') ? { structureTool: () => ({}) }
      : { defineConfig: value => value };
    return new SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await module.evaluate();
  assert.ok(module.namespace.default.projectId);
  assert.notEqual(module.namespace.default.projectId, 'placeholder');
  assert.ok(module.namespace.default.dataset);
});
