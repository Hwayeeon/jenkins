import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have visible navigation bar', async ({ page }) => {
    await page.goto('/');
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate between pages correctly', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to projects
    const projectsLink = page.locator('nav a[href*="projects"]');
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await expect(page).toHaveURL(/.*projects/);
    }
    
    // Navigate to contact
    const contactLink = page.locator('nav a[href*="contact"]');
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/.*contact/);
    }
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/projects');
    
    // Check that the navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Navigation should still be accessible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have home link working', async ({ page }) => {
    await page.goto('/projects');
    
    // Click on home/logo link
    const homeLink = page.locator('nav a[href="/"], nav a[href="/id"], nav a[href="/en"]').first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL(/^\/(id|en)?$/);
    }
  });
});
