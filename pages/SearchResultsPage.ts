import { Page, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly productNameSelector = '.product_list .product-name';

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductVisible(productName: string) {
    const product = this.page.locator(this.productNameSelector, { hasText: productName });
    await expect(product).toBeVisible();
  }
}
