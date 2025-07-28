import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  userEmailInput = this.page.getByRole('textbox', { name: 'Enter User Email' });
  userPasswordInput = this.page.getByRole('textbox', {
    name: 'Enter Password',
  });
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  loginError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }
  async login(email: string, password: string): Promise<void> {
    await this.userEmailInput.fill(email);
    await this.userEmailInput.fill(password);
    await this.loginButton.click();
  }

  async loginNew(loginUserData: LoginUser): Promise<void> {
    await this.userEmailInput.fill(loginUserData.userEmail);
    await this.userEmailInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }
}
