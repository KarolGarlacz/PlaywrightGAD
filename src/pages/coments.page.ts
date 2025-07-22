import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class CommentsPage extends HomePage {
  url = '/comments.html';
  constructor(page: Page) {
    super(page);
  }
}
