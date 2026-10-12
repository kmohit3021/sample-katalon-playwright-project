import { expect, Page } from '@playwright/test';
import { SelfHealingHelper } from './SelfHealingHelper';

export class LoginPage {
  private readonly healer: SelfHealingHelper;

  constructor(private readonly page: Page) {
    this.healer = new SelfHealingHelper(page);
  }

  async goto(): Promise<void> {
    const appUrl = process.env.APP_URL ?? 'https://orange.katalon.com/web/index.php/auth/login';
    await this.page.goto(appUrl);
    await expect(this.page).toHaveURL(/\/auth\/login/);
    const loginButton = await this.healer.getVisible('login button', [
      () => this.page.getByRole('button', { name: /^login$/i }),
      () => this.page.locator('button[type="submit"]'),
      () => this.page.locator('button:has-text("Login")'),
    ]);
    await expect(loginButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.healer.fill('username field', username, [
      () => this.page.getByPlaceholder('Username'),
      () => this.page.getByRole('textbox', { name: /username/i }),
      () => this.page.getByPlaceholder('MohitUsername'),
      () => this.page.getByRole('textbox', { name: /Mohitusername/i }),
      () => this.page.locator('input[name="username"]'),
      () => this.page.locator('input[autocomplete="username"]'),
    ]);

    await this.healer.fill('password field', password, [
      () => this.page.getByPlaceholder('Password'),
      () => this.page.getByRole('textbox', { name: /password/i }),
      () => this.page.locator('input[name="password"]'),
      () => this.page.locator('input[type="password"]'),
    ]);

    await this.healer.click('login button', [
      () => this.page.getByRole('button', { name: /^login$/i }),
      () => this.page.locator('button[type="submit"]'),
      () => this.page.locator('button:has-text("Login")'),
    ]);
  }

  async assertLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/\/auth\/login/);
    const loginButton = await this.healer.getVisible('login button', [
      () => this.page.getByRole('button', { name: /^login$/i }),
      () => this.page.locator('button[type="submit"]'),
      () => this.page.locator('button:has-text("Login")'),
    ]);
    await expect(loginButton).toBeVisible();
  }
}
