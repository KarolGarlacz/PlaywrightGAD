import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class ArticlePage extends HomePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponents(this.page);
  constructor(page: Page) {
    super(page);
  }
}
