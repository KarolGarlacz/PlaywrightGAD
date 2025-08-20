import { RESPONSE_TIMEOUT } from '@_pw-config';
import { prepareRandomArticle } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButtonLogged.click();
    articleData = prepareRandomArticle();
  });

  test('reject creating article without title @logged', async ({ page }) => {
    //Arrange
    const expectedErrorText = 'Article was not created';
    const expectedResponseCode = 422;
    articleData.title = '';
    const responsePromise = page.waitForResponse('/api/article', {
      timeout: RESPONSE_TIMEOUT,
    });

    //Act
    await addArticleView.crateArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('reject creating article without title exceeding 128 sings @logged', async ({}) => {
    //Arrange
    const expectedErrorText = 'Article was not created';
    articleData.title = '';
    articleData = prepareRandomArticle(129);

    //Act
    await addArticleView.crateArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
  });
});
