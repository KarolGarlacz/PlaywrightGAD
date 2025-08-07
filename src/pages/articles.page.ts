import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends HomePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponents(this.page);
  addArticleButtonLogged = this.page.locator('#add-new');
  searchInput = this.page.getByTestId('search-input');
  goSearchButton = this.page.getByTestId('search-button');
  noResults = this.page.getByTestId('no-results');

  constructor(page: Page) {
    super(page);
  }
  async gotoArticle(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }
  async searchArticle(phrase: string): Promise<void> {
    await this.searchInput.fill(phrase);
    await this.goSearchButton.click();
  }
}
