import { expect, test } from '@playwright/test';

test('menu is inactive when closed, traps keyboard focus, and restores it', async ({ page }) => {
  await page.goto('/');
  const panel = page.locator('#site-menu-panel');
  const content = page.locator('#site-content');
  await expect(panel).toHaveAttribute('inert', '');
  await page.keyboard.press('Tab');
  await expect(page.getByText('Aller au contenu', { exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await expect(page.locator('#site-menu-close')).toBeFocused();
  await expect(content).toHaveAttribute('inert', '');
  await page.keyboard.press('Shift+Tab');
  expect(await panel.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Tab');
  await expect(page.locator('#site-menu-close')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).toBeFocused();
  await expect(panel).toHaveAttribute('inert', '');
  await expect(content).not.toHaveAttribute('inert', '');
});

test('reviews show dated Amazon scores, actual reviewers and source links', async ({ page }) => {
  await page.goto('/reviews');
  await expect(page.getByText('4,8 / 5 · 20 évaluations Amazon')).toBeVisible();
  await expect(page.getByText('4,6 / 5 · 6 évaluations Amazon')).toBeVisible();
  await expect(page.getByText('Aucun avis client affiché lors du relevé.')).toBeVisible();
  await expect(page.locator('a[href*="/gp/customer-reviews/"]')).toHaveCount(6);
  await expect(page.getByRole('img', { name: '4 étoiles sur 5' })).toHaveCount(2);
});

test('3D engine loads only on demand and stops scheduling frames off screen', async ({ page }) => {
  const engineRequests: string[] = [];
  page.on('request', request => { if (/card-workshop|three(?:\.js|\/)/.test(request.url())) engineRequests.push(request.url()); });
  await page.addInitScript(() => {
    const frame = window.requestAnimationFrame.bind(window);
    (window as any).__frameCount = 0;
    window.requestAnimationFrame = callback => { (window as any).__frameCount++; return frame(callback); };
  });
  await page.goto('/atelier-cartes');
  await expect(page.locator('.lab-workspace')).toHaveAttribute('inert', '');
  expect(engineRequests).toHaveLength(0);
  await page.getByRole('button', { name: 'Activer l’aperçu 3D' }).click();
  await expect(page.locator('.lab-workspace')).not.toHaveAttribute('inert', '', { timeout: 30000 });
  expect(engineRequests.length).toBeGreaterThan(0);
  await page.locator('#card-stage').scrollIntoViewIfNeeded();
  const active = await page.evaluate(() => (window as any).__frameCount);
  await expect.poll(() => page.evaluate(() => (window as any).__frameCount)).toBeGreaterThan(active + 3);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  const stopped = await page.evaluate(() => (window as any).__frameCount);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => (window as any).__frameCount)).toBeLessThanOrEqual(stopped + 1);
});

test('public pages fit mobile without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/reviews', '/tarifs', '/livres/coeur-de-renard']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
