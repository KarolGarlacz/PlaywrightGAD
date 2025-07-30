import { randomNewArticle } from '../src/factories/article.factory';
import { AddArticleModel } from '../src/models/article.model';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    await loginPage.goto();
    await loginPage.login(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    articleData = randomNewArticle();
  });
  test('create new articles', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlePage(page);

    //Act
    await expect.soft(addArticleView.header).toBeVisible();
    await addArticleView.crateArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
  });

  test('reject creating article without title', async ({}) => {
    //Arrange
    const expectedErrorText = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.crateArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });
  test('reject creating article without title exceeding 128 sings', async ({}) => {
    //Arrange
    const expectedErrorText = 'Article was not created';
    articleData.title = '';
    articleData = randomNewArticle(129);

    //Act
    await addArticleView.crateArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });
});
