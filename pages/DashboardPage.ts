import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async assertLoginSuccessful(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(
      this.page.getByRole('heading', { name: /^dashboard$/i }),
    ).toBeVisible();
  }
}
