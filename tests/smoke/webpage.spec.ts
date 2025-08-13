import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/coments.page';
import { HomePage } from '@_src/pages/home.page';
import { expect, test } from '@playwright/test';

test('home page title @smoke', async ({ page }) => {
  const homePage = new HomePage(page);
  const expectedHomePageTitle = 'GAD';

  //Act
  await homePage.goto();
  //Assert
  const title = await homePage.getTitle();
  expect(title).toContain(expectedHomePageTitle);
});

test('articles page title', async ({ page }) => {
  //Act
  const articlePage = new ArticlesPage(page);
  const expectedArticleTitle = 'Articles';

  await articlePage.goto();

  //Assert
  const title = await articlePage.getTitle();
  expect(title).toContain(expectedArticleTitle);
});

test('comments page title', async ({ page }) => {
  //Act
  const expectedCommentTitle = '🦎 GAD | Comments';
  const commentsPage = new CommentsPage(page);

  await commentsPage.goto();

  //AssertS
  const title = await commentsPage.getTitle();
  expect(title).toContain(expectedCommentTitle);
});
