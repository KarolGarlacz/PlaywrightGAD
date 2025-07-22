import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class CommentsPage extends HomePage {
  url = '/comments.html';
  mainMenu = new MainMenuComponents(this.page);
  constructor(page: Page) {
    super(page);
  }
}
