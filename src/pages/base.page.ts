import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  url = '/';

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageToLoadURL(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
