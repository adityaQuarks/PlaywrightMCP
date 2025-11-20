import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Search for T-shirts and verify product', async ({ page }) => {
  const homePage = new HomePage(page);
  const resultsPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.searchFor('T-shirts');
  await resultsPage.verifyProductVisible('Faded Short Sleeve T-shirts');
});
