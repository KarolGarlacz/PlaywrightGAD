import { test } from '@_src/fixtures/merge.fixture';
import { expect } from '@playwright/test';

test('home page title @smoke', async ({ homePage }) => {
  //Arrange
  const expectedHomePageTitle = 'GAD';

  //Assert
  const title = await homePage.getTitle();
  expect(title).toContain(expectedHomePageTitle);
});

test('articles page title', async ({ articlePage }) => {
  //Arrange
  const expectedArticleTitle = 'Articles';

  //Assert
  const title = await articlePage.getTitle();
  expect(title).toContain(expectedArticleTitle);
});

test('comments page title', async ({ commentPage }) => {
  //Arrange
  const expectedCommentTitle = '🦎 GAD | Comments';

  //AssertS
  const title = await commentPage.getTitle();
  expect(title).toContain(expectedCommentTitle);
});
