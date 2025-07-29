import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class ArticlePage extends HomePage {
  url = '/article.html';
  mainMenu = new MainMenuComponents(this.page);
  articleTitle = this.page.getByTestId('article-title');
  articleBody = this.page.getByTestId('article-body');

  constructor(page: Page) {
    super(page);
  }
}
