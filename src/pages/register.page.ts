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
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.userNameInput.fill(firstName);
    await this.userSurnameInput.fill(lastName);
    await this.userEmailInput.fill(email);
    await this.userEmailInput.fill(password);
    await this.registerButton.click();
  }
}
