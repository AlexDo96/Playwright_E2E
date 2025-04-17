# Playwright E2E Testing Framework

![Playwright logo](https://playwright.dev/img/playwright-logo.svg)

**Take-home Task** created with Playwright, a NodeJS library made for browser automation. It's free, open source and backed up by Microsoft.

Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.

**More information:** [Playwright](https://playwright.dev/)

## Technologies I Have Been Used

- **Playwright**: A versatile library tailored for browser automation with a focus on reliability.
- **TypeScript**: A statically typed superset of JavaScript.
- **npm**: The package manager for JavaScript.

## I Choose This Demo site - E-commerce

The [demo website](https://www.demoblaze.com/)

The website has few pages - Home, Contact, About us, Cart, Login, Sign up.

## Tests

The tests in the **Take-home Task** cover:

- User login and sign up
- Working with modals
- Check items
- Add items to cart
- Making an order
- Using Page Object Model

## Project Structure

```bash
playwright-e2e/
├── pages/
│   ├── modals
│   ├     ├── AboutModal.ts
│   ├     ├── ContactModal.ts
│   ├     ├── PlaceOrderModal.ts
│   ├── BasePage.ts
│   ├── CheckoutPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   ├── RegisterPage.ts
│
├── tests/
│   ├── e2e/
│  
├── global-setup.ts
├── playwright.config.ts
└── ...
```

## Configuration

The framework can be configured through `playwright.config.ts`. Key configurations include:

- Browsers: Chromium, Firefox, WebKit
- Test timeouts
- Headless settings
- Reporter

## Checklist

| Task                          | Status     |
|-------------------------------|------------|
| Page Object Model             | Done       |
| E2E tests                     | Done       |

## Page Object Model (POM)

Page Object Model (POM) is a design pattern that creates a repository for storing all web elements. In POM, consider each web page of an application as a separate class file. Each class file will contain only corresponding web page elements. Page objects are organized under the `/pages/` directory, making the test code more readable, maintainable, and less prone to duplication.

## Benefits of POM

- **Maintainability**: Changes in the UI require updates only in the page classes.
- **Reusability**: Common operations can be reused across different tests.
- **Readability**: Tests are more readable and easier to understand.

## E2E test

The e2e tests are located in `/tests/e2e/` folder. They cover scenarios such as user authentication, navigation, and interactions with different pages.

## Locators

Locate by CSS or XPath
If you absolutely must use CSS or XPath locators, you can use page.locator() to create a locator that takes a selector describing how to find an element in the page. Playwright supports CSS and XPath selectors, and auto-detects them if you omit css= or xpath= prefix.

```bash
await page.locator('css=button').click();
await page.locator('xpath=//button').click();

await page.locator('button').click();
await page.locator('//button').click();
```

## Setup

Get started by installing Playwright using npm. Alternatively you can also get started and run tests using the VS Code Extension.

```bash
npm init playwright@latest
```

## Run tests with UI mode

Please run this command:

```bash
npx playwright test --ui
```

## Run tests without UI mode

Run a single test file

```bash
npx playwright test tests/e2e/Home.spec.ts
```

Run a whole test suite

```bash
npx playwright test tests/e2e/ 
```

Run tests in headed browsers

```bash
npx playwright test tests/e2e/ --headed
```

Run all the tests against a specific project

```bash
npx playwright test tests/e2e/ --project=chromium
```

A quick way of opening the last test run report is:

```bash
npx playwright show-report my-report
```

Ask for help

```bash
npx playwright test --help
```
