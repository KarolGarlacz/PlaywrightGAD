import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test('login user with correct credentials', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);
  const userName = 'Moses.Armstrong@Feest.ca';
  const password = 'test1';
  await loginPage.goto();

  //Act
  await loginPage.login(userName, password);
  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain('Welcome');
});
