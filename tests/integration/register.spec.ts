import { prepareRandomUser } from '@_src/factories/user.factory';
import { RegisterUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { RegisterPage } from '@_src/pages/register.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
  });
  test('register user with correct credentials', async ({ page }) => {
    //Arrange
    const expectedAlertPopUpText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    //Act
    await registerPage.goto();
    await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    const title = loginPage.getTitle();
    expect(title).toContain(expectedLoginTitle);

    //Assert
    await loginPage.login({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });

    const titleWelcome = await welcomePage.getTitle();
    expect(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('not register with incorrect data - email not provided', async ({}) => {
    //Arrange
    const expectedErrorText = 'This field is required';

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
