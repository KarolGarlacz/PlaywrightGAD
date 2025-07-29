import { randomUserData } from '../src/factories/user.factory';
import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  test('register user with correct credentials', async ({ page }) => {
    //Arrange
    const expectedAlertPopUpText = 'User created';

    const registerUserData = randomUserData();

    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    //Act
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const loginPage = new LoginPage(page);
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

  test('not register with incorrect data - email not provided', async ({
    page,
  }) => {
    //Arrange
    const expectedErrorText = 'This field is required';
    const registerUserData = randomUserData();
    const registerPage = new RegisterPage(page);

    //Act
    await registerPage.goto();
    await registerPage.userNameInput.fill(registerUserData.userFirstName);
    await registerPage.userSurnameInput.fill(registerUserData.userLastName);
    await registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
