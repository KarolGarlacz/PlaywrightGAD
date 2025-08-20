import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { test as baseTest } from '@playwright/test';

interface Pages {
  addArticleView: AddArticleView;
  articlePage: ArticlesPage;
  commentPage: CommentsPage;
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlesPage(page);
    await articlePage.goto();
    await use(articlePage);
  },
  addArticleView: async ({ page }, use) => {
    const addArticleView = new AddArticleView(page);
    await use(addArticleView);
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
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});
