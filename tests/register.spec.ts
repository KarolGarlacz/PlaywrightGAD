import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { expect, test } from '@playwright/test';

test('register user with correct credentials', async ({ page }) => {
  //Arrang
  const userFirstName = 'Janina';
  const userLastName = 'Nowak';
  const userEmail = `janina${new Date().getTime()}.nowak@test.com`;
  const userPassword = 'test123';
  const expectedAlertPopUpText = 'User created';

  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  //Act
  await registerPage.register(
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
  );
  //Assert
  await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
  const loginPage = new LoginPage(page);
  await loginPage.waitForPageToLoadURL();
  const title = loginPage.title();
  expect(title).toContain('Login');
});
