import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { NavigationMenu } from '../pages/NavigationMenu';
import { PIMPage } from '../pages/PIMPage';
import { UserMenu } from '../pages/UserMenu';

function buildEmployeeData() {
  const uniqueToken = Date.now().toString().slice(-6);
  return {
    firstName: `Mohit${uniqueToken}`,
    middleName: 'Kumar',
    lastName: `Sharma${uniqueToken}`,
  };
}

test.describe('OrangeHRM employee flow', () => {
  test('orangehrm end-to-end employee flow', async ({ page }) => {
  const appUsername = process.env.APP_USERNAME;
  const appPassword = process.env.APP_PASSWORD;

  expect(appUsername, 'APP_USERNAME must be provided in .env').toBeTruthy();
  expect(appPassword, 'APP_PASSWORD must be provided in .env').toBeTruthy();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const navigationMenu = new NavigationMenu(page);
  const pimPage = new PIMPage(page);
  const userMenu = new UserMenu(page);

  const employee = buildEmployeeData();

  await loginPage.goto();
  await loginPage.login(appUsername!, appPassword!);
  await dashboardPage.assertLoginSuccessful();

  await navigationMenu.openSection('PIM');
  await pimPage.openAddEmployee();

  await pimPage.addEmployee(employee.firstName, employee.middleName, employee.lastName);
  await pimPage.assertEmployeeCreatedSuccessfully();

  await pimPage.openEmployeeSubSection('Contact Details');
  await pimPage.openEmployeeSubSection('Emergency Contacts');
  await pimPage.openEmployeeSubSection('Dependents');

  await userMenu.openMyProfile();
  await userMenu.logout();

  await loginPage.assertLoggedOut();
  });
});
