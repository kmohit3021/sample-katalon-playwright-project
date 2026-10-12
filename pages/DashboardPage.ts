import { expect, Page } from '@playwright/test';
import { SelfHealingHelper } from './SelfHealingHelper';

export class DashboardPage {
  private readonly healer: SelfHealingHelper;

  constructor(private readonly page: Page) {
    this.healer = new SelfHealingHelper(page);
  }

  async assertLoginSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard/);
    const dashboardHeading = await this.healer.getVisible('dashboard heading', [
      () => this.page.getByRole('heading', { name: /^dashboard$/i }),
      () => this.page.locator('h6:has-text("Dashboard")'),
      () => this.page.locator('h5:has-text("Dashboard")'),
    ]);
    await expect(dashboardHeading).toBeVisible();
  }
}
