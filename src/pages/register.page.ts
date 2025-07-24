import { RegisterUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register';
  userNameInput = this.page.getByTestId('firstname-input');
  userSurnameInput = this.page.getByTestId('lastname-input');
  userPasswordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');
  userEmailInput = this.page.getByTestId('email-input');
  alertPopUp = this.page.getByTestId('alert-popup');
  registerError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }
  async register(registerUserData: RegisterUser): Promise<void> {
    await this.userNameInput.fill(registerUserData.userFirstName);
    await this.userSurnameInput.fill(registerUserData.userLastName);
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userEmailInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
