import { Page } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}
  url = '/';

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
  async title(): Promise<string> {
    return await this.page.title();
  }
}
