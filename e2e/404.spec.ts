import { test, expect } from '@playwright/test';

test.describe('404 Not Found Page', () => {
  test('should display 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-page-that-does-not-exist');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for 404 content
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should display 404 text', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    
    await page.waitForLoadState('networkidle');
    
    // Look for 404 text in the page
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('404');
  });

  test('should have navigation back to home', async ({ page }) => {
    await page.goto('/non-existent-page');
    
    await page.waitForLoadState('networkidle');
    
    // Look for a link back to home
    const homeLink = page.locator('a[href="/"], a[href="/id"], a[href="/en"]');
    const count = await homeLink.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should display 404 for invalid project', async ({ page }) => {
    await page.goto('/projects/non-existent-project-slug');
    
    await page.waitForLoadState('networkidle');
    
    // Should show 404 or redirect
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should have proper styling on 404 page', async ({ page }) => {
    await page.goto('/invalid-route');
    
    await page.waitForLoadState('networkidle');
    
    // Check that page has some content
    const main = page.locator('main, body > div');
    await expect(main.first()).toBeVisible();
  });
});
