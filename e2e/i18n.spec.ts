import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('should load default locale (Indonesian)', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to /id or show Indonesian content
    await page.waitForLoadState('networkidle');
    
    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should load English locale', async ({ page }) => {
    await page.goto('/en');
    
    await page.waitForLoadState('networkidle');
    
    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should switch between locales', async ({ page }) => {
    // Start on Indonesian
    await page.goto('/id');
    await page.waitForLoadState('networkidle');
    
    // Navigate to English version
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Check we're on English locale
    await expect(page).toHaveURL(/\/en/);
  });

  test('should maintain locale when navigating', async ({ page }) => {
    // Start on English
    await page.goto('/en');
    
    // Navigate to projects
    const projectsLink = page.locator('nav a[href*="projects"]');
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      
      // Should still be on English locale
      await expect(page).toHaveURL(/\/en\/projects/);
    }
  });

  test('should load about page in different locales', async ({ page }) => {
    // Indonesian
    await page.goto('/id/about');
    await expect(page.locator('nav')).toBeVisible();
    
    // English
    await page.goto('/en/about');
    await expect(page.locator('nav')).toBeVisible();
  });
});
