import { Page } from '@playwright/test';
import { SelfHealingHelper } from './SelfHealingHelper';

export class NavigationMenu {
  private readonly healer: SelfHealingHelper;

  constructor(private readonly page: Page) {
    this.healer = new SelfHealingHelper(page);
  }

  async openSection(sectionName: string): Promise<void> {
    await this.healer.click(`navigation section: ${sectionName}`, [
      () => this.page.locator('nav').getByRole('link', { name: sectionName, exact: true }),
      () => this.page.getByRole('link', { name: sectionName, exact: true }),
      () => this.page.locator(`a:has-text("${sectionName}")`),
    ]);
  }
}
