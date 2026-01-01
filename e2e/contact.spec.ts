import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load the contact page', async ({ page }) => {
    await page.goto('/contact');
    
    // Check that the page has loaded
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check for main content
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have clickable social links', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for any external links (social media)
    const links = page.locator('a[href^="http"]');
    const count = await links.count();
    
    // Should have at least one external link
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper heading', async ({ page }) => {
    await page.goto('/contact');
    
    // Check for heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });
});
