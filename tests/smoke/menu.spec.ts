import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/coments.page';
import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const commentPage = new CommentsPage(page);

    //Act
    await articlePage.goto();
    await commentPage.mainMenu.commentsButton.click();
    await commentPage.waitForPageToLoadURL();
    const title = await commentPage.title();

    //Assert
    expect(title).toContain('Comments');
  });

  test('articles button navigates to articles page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const commentPage = new CommentsPage(page);

    //Act
    await commentPage.goto();
    await articlePage.mainMenu.articleButton.click();
    await articlePage.waitForPageToLoadURL();
    const title = await articlePage.title();

    //Assert
    expect(title).toContain('Articles');
  });

  test('home button navigates to main page', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    //Act
    await articlePage.goto();
    await articlePage.mainMenu.homeButton.click();
    const title = await homePage.title();

    //Assert
    expect(title).toContain('GAD');
  });
});
