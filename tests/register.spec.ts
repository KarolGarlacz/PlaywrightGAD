import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test('register user with correct credentials', async ({ page }) => {
  //Arrang
  const userFirstName = faker.person.firstName();
  const userLastName = faker.person.lastName();
  const userEmail = faker.internet.email({
    firstName: userFirstName,
    lastName: userLastName,
  });
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
