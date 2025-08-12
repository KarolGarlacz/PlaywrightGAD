import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test as setup } from '@playwright/test';

setup('login user with correct credentials', async ({ page }) => {
  //Arrange
  const expectedWelcomeTitle = 'Welcome';
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  await loginPage.goto();
  await loginPage.login(testUser1);

  //Act
  const title = await welcomePage.getTitle();

  //Assert
  await welcomePage.waitForPageToLoadURL();
  expect(title).toContain(expectedWelcomeTitle);
});
