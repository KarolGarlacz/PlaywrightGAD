import { HomePage } from './home.page';
import { MainMenuComponents } from '@_src/components/main-menu.components';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlePage extends HomePage {
  url = '/article.html';
  mainMenu = new MainMenuComponents(this.page);
  articleTitle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');
  deleteButton = this.page.getByTestId('delete');
  addCommentButton = this.page.locator('#add-new-comment');
  alertPopUp = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }
  async deleteArticle(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    this.deleteButton.click();
  }

  async getArticleComment(body: string): Promise<ArticleComment> {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: body });

    return {
      body: commentContainer.locator(':text("Comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
