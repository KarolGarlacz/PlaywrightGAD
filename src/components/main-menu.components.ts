import { Locator, Page } from '@playwright/test';

export class MainMenuComponents {
  commentsButton: Locator;
  articleButton: Locator;
  homeButton: Locator;
  constructor(private page: Page) {
    this.commentsButton = this.page.getByTestId('open-comments');
    this.articleButton = this.page.getByTestId('open-articles');
    this.homeButton = this.page.getByRole('link', { name: 'GAD' });
  }
}
