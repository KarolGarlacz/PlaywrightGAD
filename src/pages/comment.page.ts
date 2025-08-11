import { MainMenuComponents } from '../components/main-menu.components';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class CommentPage extends HomePage {
  url = '/comment.html';
  mainMenu = new MainMenuComponents(this.page);
  commentBody = this.page.getByTestId('comment-body');

  constructor(page: Page) {
    super(page);
  }
}
