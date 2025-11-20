import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput = 'input[name="search_query"]';
  readonly searchButton = 'button[name="submit_search"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
  }

  async searchFor(query: string) {
    await this.page.fill(this.searchInput, query);
    await this.page.click(this.searchButton);
  }
}
