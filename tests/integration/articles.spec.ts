import { prepareRandomArticle } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticleView } from '../../src/views/add-article.view';
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

  test('reject creating article without title @logged', async ({}) => {
    //Arrange
    const expectedErrorText = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.crateArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopUp).toHaveText(expectedErrorText);
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
