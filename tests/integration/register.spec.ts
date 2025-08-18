import { prepareRandomUser } from '@_src/factories/user.factory';
import { RegisterUserModel } from '@_src/models/user.model';
import { RegisterPage } from '@_src/pages/register.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = prepareRandomUser();
    await registerPage.goto();
  });
  test('register user with correct credentials', async ({}) => {
    //Arrange
    const expectedAlertPopUpText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    //Act
    const loginPage = await registerPage.register(registerUserData);

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertPopUpText);
    await loginPage.waitForPageToLoadURL();
    const title = loginPage.getTitle();
    expect(title).toContain(expectedLoginTitle);

    //Assert
    const welcomePage = await loginPage.login({
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
    await registerPage.userNameInput.fill(registerUserData.userFirstName);
    await registerPage.userSurnameInput.fill(registerUserData.userLastName);
    await registerPage.userPasswordInput.fill(registerUserData.userPassword);
    await registerPage.registerButton.click();

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
