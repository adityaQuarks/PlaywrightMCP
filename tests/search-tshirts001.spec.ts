import { test, expect } from '@playwright/test';

test('Search for T-shirts and verify product', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('http://www.automationpractice.pl/index.php');

  // Step 2: Search for 'T-shirts'
  await page.getByRole('textbox', { name: 'Search' }).fill('T-shirts');
  await page.locator('button[name="submit_search"]').click();

  // Step 3: Verify "Faded Short Sleeve T-shirts" in the list
  // Use a more specific locator to avoid strict mode violation
  const productLink = page.locator('#center_column a.product-name', { hasText: 'Faded Short Sleeve T-shirts' });
  await expect(productLink).toBeVisible();
});
