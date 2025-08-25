import { test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { WelcomePage } from '@_src/pages/welcome.page';
import { testUser1 } from '@_src/test-data/user.data';
import { expect } from '@playwright/test';

test('login user with correct credentials', async ({ loginPage }) => {
  //Arrange
  const expectedWelcomeTitle = 'Welcome';

  //Act
  const welcomePage = await loginPage.login(testUser1);
  const title = await welcomePage.getTitle();

  //Assert
  await welcomePage.waitForPageToLoadURL();
  expect(title).toContain(expectedWelcomeTitle);
});

test('reject login user with incorrect password', async ({
  loginPage,
  page,
}) => {
  //Arrange
  const expectedErrorMsg = 'Invalid username or password';
  const expectedLoginTitle = 'Login';
  const loginUserData: LoginUserModel = {
    userEmail: testUser1.userEmail,
    userPassword: 'incorrect password',
  };

  //Act
  await loginPage.login(loginUserData);
  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.getTitle();

  //Assert
  await expect(loginPage.loginError).toHaveText(expectedErrorMsg);
  expect(title).toContain(expectedLoginTitle);
});
