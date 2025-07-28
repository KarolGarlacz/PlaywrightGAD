import { RegisterUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test('register user with correct credentials', async ({ page }) => {
  //Arrange
  const expectedAlertPopUpText = 'User created';

  const registerUserData: RegisterUser = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: 'test123',
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
    lastName: registerUserData.userLastName,
  });

  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  //Act
  await registerPage.register(registerUserData);

  //Assert
  await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
  const loginPage = new LoginPage(page);
  await loginPage.waitForPageToLoadURL();
  const title = loginPage.title();
  expect(title).toContain('Login');

  //Assert
  await loginPage.login({
    userEmail: registerUserData.userEmail,
    userPassword: registerUserData.userPassword,
  });

  const welcomePage = new WelcomePage(page);
  const titleWelcome = await welcomePage.title();
  expect(titleWelcome).toContain('Welcome');
});
