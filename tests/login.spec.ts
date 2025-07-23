import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test('login user with correct credentials', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);
  const userName = testUser1.userEmail;
  const password = testUser1.userPassword;
  await loginPage.goto();

  //Act
  await loginPage.login(userName, password);
  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain('Welcome');
});
