import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends HomePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponents(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');

  constructor(page: Page) {
    super(page);
  }
  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }
}
