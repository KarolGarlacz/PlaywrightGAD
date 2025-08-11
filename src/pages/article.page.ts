import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

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
}
