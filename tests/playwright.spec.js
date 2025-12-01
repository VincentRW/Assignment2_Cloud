const { test, expect } = require('@playwright/test');

test('escape room gameplay', async ({ page }) => {
  await page.goto('http://localhost:3000/escape_room');
  await expect(page.locator('text=ESCAPE ROOM CHALLENGE')).toBeVisible();
  await expect(page.locator('text=Time:')).toBeVisible();
});

test('html generation', async ({ page }) => {
  await page.goto('http://localhost:3000');
});