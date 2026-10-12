import { expect, Page } from '@playwright/test';
import { SelfHealingHelper } from './SelfHealingHelper';

export class UserMenu {
  private readonly healer: SelfHealingHelper;

  constructor(private readonly page: Page) {
    this.healer = new SelfHealingHelper(page);
  }

  async openMenu(): Promise<void> {
    await this.healer.click('user dropdown menu', [
      () => this.page.locator('.oxd-userdropdown-tab'),
      () => this.page.getByRole('img', { name: /profile/i }),
      () => this.page.locator('.oxd-userdropdown-name'),
    ]);
  }

  async openMyProfile(): Promise<void> {
    await this.openMenu();

    await this.healer.click('my profile entry', [
      () => this.page.getByRole('menuitem', { name: 'My Profile' }),
      () => this.page.getByRole('menuitem', { name: 'My Info' }),
      () => this.page.locator('nav').getByRole('link', { name: 'My Info', exact: true }),
      () => this.page.locator('a:has-text("My Info")'),
    ]);

    await expect(this.page).toHaveURL(/\/pim\/viewMyDetails|\/pim\/viewPersonalDetails\//);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.healer.click('logout menu item', [
      () => this.page.getByRole('menuitem', { name: /^logout$/i }),
      () => this.page.getByRole('link', { name: /^logout$/i }),
      () => this.page.locator('a:has-text("Logout")'),
    ]);
  }
}
