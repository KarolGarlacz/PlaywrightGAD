import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { test as baseTest } from '@playwright/test';

interface Pages {
  articlePage: ArticlesPage;
  commentPage: CommentsPage;
  homePage: HomePage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlesPage(page);
    await articlePage.goto();
    await use(articlePage);
  },
  commentPage: async ({ page }, use) => {
    const commentPage = new CommentsPage(page);
    await commentPage.goto();
    await use(commentPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});
