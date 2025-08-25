import { STORAGE_STATE } from '../../playwright.config';
import { test as setup } from '@_src/fixtures/merge.fixture';
import { testUser1 } from '@_src/test-data/user.data';
import { expect } from '@playwright/test';

setup('login and save session', async ({ loginPage, page }) => {
  //Arrange
  const expectedWelcomeTitle = 'Welcome';
  const welcomePage = await loginPage.login(testUser1);

  //Act
  const title = await welcomePage.getTitle();

  //Assert
  await welcomePage.waitForPageToLoadURL();
  expect(title).toContain(expectedWelcomeTitle);
  await page.context().storageState({ path: STORAGE_STATE });
});
