import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import test, { expect } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const expectedCommentTitle = 'Comments';

    //Act
    await articlePage.goto();
    const commentPage = await articlePage.mainMenu.clickCommentButton();
    const title = await commentPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentTitle);
  });

  test('articles button navigates to articles page', async ({ page }) => {
    //Arrange
    const commentPage = new CommentsPage(page);
    const expectedArticleTitle = 'Articles';

    //Act
    await commentPage.goto();
    const articlePage = await commentPage.mainMenu.clickArticlesButton();
    const title = await articlePage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home button navigates to main page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const expectedHomePageTitle = 'GAD';

    //Act
    await articlePage.goto();
    const homePage = await articlePage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
