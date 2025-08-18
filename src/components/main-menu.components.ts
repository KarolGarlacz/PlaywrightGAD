import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { Locator, Page } from '@playwright/test';

export class MainMenuComponents {
  commentsButton: Locator;
  articleButton: Locator;
  homeButtonLink: Locator;
  constructor(private page: Page) {
    this.commentsButton = this.page.getByTestId('open-comments');
    this.articleButton = this.page.getByTestId('open-articles');
    this.homeButtonLink = this.page.getByRole('link', { name: 'GAD' });
  }
  async clickCommentButton(): Promise<CommentsPage> {
    await this.commentsButton.click();
    return new CommentsPage(this.page);
  }
  async clickArticlesButton(): Promise<ArticlesPage> {
    await this.articleButton.click();
    return new ArticlesPage(this.page);
  }
  async clickHomePageLink(): Promise<HomePage> {
    await this.homeButtonLink.click();
    return new HomePage(this.page);
  }
}
