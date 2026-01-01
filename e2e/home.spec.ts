import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page has loaded by looking for navigation
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display particles animation', async ({ page }) => {
    await page.goto('/');
    
    // Check for particles canvas
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links exist
    await expect(page.locator('nav a[href*="projects"]')).toBeVisible();
    await expect(page.locator('nav a[href*="contact"]')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.goto('/');
    
    // Click on projects link
    await page.click('nav a[href*="projects"]');
    
    // Wait for navigation
    await expect(page).toHaveURL(/.*projects/);
  });

  test('should have proper meta title', async ({ page }) => {
    await page.goto('/');
    
    // Check page has a title
    await expect(page).toHaveTitle(/.+/);
  });
});
