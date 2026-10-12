# sample-katalon-playwright-project

This project automates the OrangeHRM flow using Playwright + TypeScript with a Page Object Model (POM) structure.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install chromium
```

3. Configure environment values in `.env`:

```env
APP_URL=https://orange.katalon.com/web/index.php/auth/login
APP_USERNAME=your-username
APP_PASSWORD=your-password
```

## Run Tests

```bash
npm test
```

For headed mode:

```bash
npm run test:headed
```

## View Report Correctly

Use Playwright's report server to view the full report (including test source and trace links):

```bash
npm run report
```

Do not open `playwright-report/index.html` directly from Finder or with a `file://` URL, because the script/trace UI can render incorrectly and show placeholder actions such as "OPEN SCRIPT".

## Project Structure

- `pages/` - Page Object classes
- `tests/` - Playwright spec files
- `playwright.config.ts` - Playwright runner configuration
