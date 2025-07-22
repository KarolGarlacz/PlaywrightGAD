import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class ArticlePage extends HomePage {
  url = '/articles.html';
  constructor(page: Page) {
    super(page);
  }
}
