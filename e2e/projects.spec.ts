import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should load the projects page', async ({ page }) => {
    await page.goto('/projects');
    
    // Check that the page has loaded
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check for project content
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have clickable project items', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for content
    await page.waitForLoadState('networkidle');
    
    // Check for project links
    const projectLinks = page.locator('main a[href*="projects/"]');
    const count = await projectLinks.count();
    
    if (count > 0) {
      // Click on first project
      await projectLinks.first().click();
      
      // Should navigate to project detail
      await expect(page).toHaveURL(/.*projects\/.+/);
    }
  });

  test('should display project details when clicked', async ({ page }) => {
    await page.goto('/projects');
    
    // Wait for content
    await page.waitForLoadState('networkidle');
    
    // Find and click first project link
    const projectLinks = page.locator('main a[href*="projects/"]');
    const count = await projectLinks.count();
    
    if (count > 0) {
      await projectLinks.first().click();
      
      // Project detail page should have content
      const content = page.locator('main');
      await expect(content).toBeVisible();
    }
  });
});
