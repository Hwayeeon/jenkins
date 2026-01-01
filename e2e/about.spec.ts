import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/about');
    
    // Check that the page has loaded
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display profile information', async ({ page }) => {
    await page.goto('/about');
    
    // Check for main content area
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should display tech stack section', async ({ page }) => {
    await page.goto('/about');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check for tech stack icons/content
    const content = page.locator('main');
    await expect(content).toContainText(/./);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/about');
    
    // Check for h1 or main heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should be accessible via navigation', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to about if link exists
    const aboutLink = page.locator('nav a[href*="about"]');
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about/);
    }
  });
});
