# EdgeTier Tech Challenge

## Overview

This repository contains Playwright end-to-end tests for the EdgeTier chat UI. Tests are implemented using the Page Object Model (POM) so UI selectors remain encapsulated inside page and component classes. Tests call high-level business methods (for example `endChat()` or `acceptSuggestedResponse()`), which keeps tests readable and resilient to selector changes.

## Project structure

```
EdgeTier-Tech-Challenge/
├── components/                # Reusable UI components used by pages (e.g. ActiveChatComponent)
├── pages/                     # Page objects (POM)
├── tests/                     # Playwright test files
├── fixtures/                  # Centralized test data and fixtures
├── .github/workflows/         # CI workflows (Playwright runner)
├── playwright.config.ts       # Playwright configuration
└── package.json               # NPM scripts and dependencies
```

Notes:

- `components/` contains small, reusable UI abstractions that page objects can compose. These are helpers that keep selectors and UI interactions organized.
- `pages/` exposes higher-level actions used by the tests.
- `tests/` contains scenarios and assertions written with Playwright.

## Install Node.js

Requires Node.js 18+ (LTS) and `npm`.

You can install Node.js in two ways:

- Using NVM (recommended):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install --lts
nvm use --lts
```

- Using Homebrew:

```bash
brew install node
```

Verify versions:

```bash
node --version
npm --version
```

## Install and run tests

```bash
# install dependencies
npm ci

# install Playwright browsers
npx playwright install --with-deps

# run all tests
npx playwright test

# run only smoke tests (tests tagged with @smoke in the title)
npx playwright test --grep @smoke
```

## Environment variables

Set `BASE_URL` for the environment you want the tests to run against (the default is set in `playwright.config.ts`):

```bash
export BASE_URL=https://your-instance.edgetier.com
```

## GitHub Actions (CI)

There is a GitHub Actions workflow at `.github/workflows/playwright.yml` that runs Playwright tests on pushes and pull requests to `main` (and `master`). By default the workflow runs the smoke test suite and uploads the Playwright HTML report as an artifact.


## Tagging tests

Tag tests by adding a tag in the test title or describe block. Example:

```
test('should allow agent to reply to user [@smoke]', async ({ page }) => { ... });

run with:
npx playwright test --grep @smoke
```
