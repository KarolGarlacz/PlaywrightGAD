import { test } from '@_src/fixtures/merge.fixture';
import { expect } from '@playwright/test';

test.describe('Verify menu main button', () => {
  test('comments button navigates to comments page', async ({
    articlePage,
  }) => {
    //Arrange
    const expectedCommentTitle = 'Comments';

    //Act
    const commentPage = await articlePage.mainMenu.clickCommentButton();
    const title = await commentPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentTitle);
  });

  test('articles button navigates to articles page', async ({
    commentPage,
  }) => {
    //Arrange
    const expectedArticleTitle = 'Articles';

    //Act
    const articlePage = await commentPage.mainMenu.clickArticlesButton();
    const title = await articlePage.getTitle();

    //Assert
    expect(title).toContain(expectedArticleTitle);
  });

  test('home button navigates to main page', async ({ articlePage }) => {
    //Arrange
    const expectedHomePageTitle = 'GAD';

    //Act
    const homePage = await articlePage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
