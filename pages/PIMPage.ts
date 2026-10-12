import { expect, Page } from '@playwright/test';
import { SelfHealingHelper } from './SelfHealingHelper';

export class PIMPage {
  private readonly healer: SelfHealingHelper;

  constructor(private readonly page: Page) {
    this.healer = new SelfHealingHelper(page);
  }

  async openAddEmployee(): Promise<void> {
    await expect(this.page).toHaveURL(/\/pim\//);

    await this.healer.click('add employee entry point', [
      () => this.page.getByRole('link', { name: 'Add Employee', exact: true }),
      () => this.page.getByRole('button', { name: /^add$/i }),
      () => this.page.getByRole('button', { name: /add employee/i }),
      () => this.page.locator('button:has-text("Add")'),
    ]);

    await expect(this.page).toHaveURL(/\/pim\/addEmployee/);
  }

  async addEmployee(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.healer.fill('employee first name', firstName, [
      () => this.page.locator('input[name="firstName"]'),
      () => this.page.getByPlaceholder('First Name'),
      () => this.page.getByRole('textbox', { name: /first name/i }),
      () => this.page.locator('input[name="MohitfirstName"]'),
    ]);
    await this.healer.fill('employee middle name', middleName, [
      () => this.page.locator('input[name="middleName"]'),
      () => this.page.getByPlaceholder('Middle Name'),
      () => this.page.getByRole('textbox', { name: /middle name/i }),
    ]);
    await this.healer.fill('employee last name', lastName, [
      () => this.page.locator('input[name="lastName"]'),
      () => this.page.getByPlaceholder('Last Name'),
      () => this.page.getByRole('textbox', { name: /last name/i }),
    ]);
    await this.healer.click('save employee button', [
      () => this.page.getByRole('button', { name: /^save$/i }),
      () => this.page.locator('button[type="submit"]'),
      () => this.page.locator('button:has-text("Save")'),
    ]);
  }

  async assertEmployeeCreatedSuccessfully(): Promise<void> {
    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\//);
    const personalDetailsHeading = await this.healer.getVisible('personal details heading', [
      () => this.page.getByRole('heading', { name: /^personal details$/i }),
      () => this.page.locator('h6:has-text("Personal Details")'),
      () => this.page.locator('h5:has-text("Personal Details")'),
    ]);
    await expect(personalDetailsHeading).toBeVisible();
  }

  async openEmployeeSubSection(name: 'Contact Details' | 'Emergency Contacts' | 'Dependents'): Promise<void> {
    await this.healer.click(`employee subsection: ${name}`, [
      () => this.page.getByRole('link', { name, exact: true }),
      () => this.page.locator(`a:has-text("${name}")`),
      () => this.page.getByRole('button', { name, exact: true }),
    ]);

    if (name === 'Contact Details') {
      await expect(this.page).toHaveURL(/\/pim\/contactDetails\//);
    }

    if (name === 'Emergency Contacts') {
      await expect(this.page).toHaveURL(/\/pim\/viewEmergencyContacts\//);
    }

    if (name === 'Dependents') {
      await expect(this.page).toHaveURL(/\/pim\/viewDependents\//);
    }

    const sectionHeading = await this.healer.getVisible(`${name} heading`, [
      () => this.page.getByRole('heading', { name, exact: true }),
      () => this.page.locator(`h6:has-text("${name}")`),
      () => this.page.locator(`h5:has-text("${name}")`),
    ]);
    await expect(sectionHeading).toBeVisible();
  }
}
