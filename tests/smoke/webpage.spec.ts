import { ArticlePage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/coments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test('home page title @smoke', async ({ page }) => {
  const homePage = new HomePage(page);

  //Act
  await homePage.goto();
  //Assert
  const title = await homePage.title();
  expect(title).toContain('GAD');
});

test('articles page title', async ({ page }) => {
  //Act
  const articlePage = new ArticlePage(page);

  await articlePage.goto();

  //Assert
  const title = await articlePage.title();
  expect(title).toContain('Articles');
});

test('comments page title', async ({ page }) => {
  //Act
  const commentsPage = new CommentsPage(page);

  await commentsPage.goto();

  //AssertS
  const title = await commentsPage.title();
  expect(title).toContain('Comments');
});
