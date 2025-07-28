import { LoginUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test('login user with correct credentials', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);

  const loginUserData: LoginUser = {
    userEmail: testUser1.userEmail,
    userPassword: testUser1.userPassword,
  };

  await loginPage.goto();

  //Act
  await loginPage.loginNew(loginUserData);
  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain('Welcome');
});

test('reject login user with incorrect password', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);
  const userName = testUser1.userEmail;
  const password = 'incorrect password';
  await loginPage.goto();

  //Act
  await loginPage.login(userName, password);
  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  //Assert
  await expect(loginPage.loginError).toHaveText('Invalid username or password');
  expect(title).toContain('Login');
});
