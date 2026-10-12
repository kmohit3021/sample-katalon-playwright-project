import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

const enableKatalonReporter = process.env.KATALON_REPORTER === 'true';

const appUrl =
  process.env.APP_URL ??
  'https://orange.katalon.com/web/index.php/auth/login';

const baseOrigin = new URL(appUrl).origin;
let globalSetupPath: string | undefined;

const reporters: any[] = [
  ['list'],
  ['html', { open: 'on-failure' }],
];

if (enableKatalonReporter) {
  // Load Katalon globals only when explicitly enabled.
  const { getGlobalSetupPath } = require('@katalon/playwright-reporter');
  globalSetupPath = getGlobalSetupPath();

  reporters.push([
    '@katalon/playwright-reporter',
    {
      outputDir: './reports',
      ...(process.env.KATALON_API_KEY && {
        platform: {
          apiKey: process.env.KATALON_API_KEY,
          projectId: process.env.KATALON_PROJECT_ID,
          baseUrl: process.env.KATALON_BASE_URL,
          authUrl: process.env.KATALON_AUTH_URL,
        },
      }),
    },
  ]);
}

export default defineConfig({
  testDir: './tests',

  globalSetup: globalSetupPath,

  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  reporter: reporters,

  use: {
    baseURL: baseOrigin,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});