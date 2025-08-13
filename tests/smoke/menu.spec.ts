import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/coments.page';
import { HomePage } from '@_src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const commentPage = new CommentsPage(page);
    const expectedCommentTitle = 'Comments';

    //Act
    await articlePage.goto();
    await commentPage.mainMenu.commentsButton.click();
    await commentPage.waitForPageToLoadURL();
    const title = await commentPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentTitle);
  });

  test('articles button navigates to articles page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const commentPage = new CommentsPage(page);
    const expectedArticleTitle = 'Articles';

    //Act
    await commentPage.goto();
    await articlePage.mainMenu.articleButton.click();
    await articlePage.waitForPageToLoadURL();
    const title = await articlePage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home button navigates to main page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const homePage = new HomePage(page);
    const expectedHomePageTitle = 'GAD';

    //Act
    await articlePage.goto();
    await articlePage.mainMenu.homeButton.click();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
