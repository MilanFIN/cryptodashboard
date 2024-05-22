# Cryptocurrency dashboard

A next.js based cryptocurrency market browser.

## Setup

* Install dependencies with: `npm install`
* Optionally set api key to .env as described in `.env-example`
* Development mode: `npm run dev`
* Production: `npm run build && npm start`

## Tests

### E2E tests with playwright

`tests/e2e` contains end to end tests with playwright using chromium & firefox.

* First you must run the project in a separate terminal
* Then run tests with `npx playwright test`

### Unit tests

`tests/unit` contains unit tests for some components using jest.

Run with `npm run test`

## Localization

Uses `next-intl`. See `src/app/translations` for translations.

## Attributions

The cryptocurrency icons weren't created by me, instead they are provided by a package called cryptocurrency-icons. See on [npmjs](https://www.npmjs.com/package/cryptocurrency-icons) and their repo at [github](https://github.com/spothq/cryptocurrency-icons)

Some extra icons are from [Radix ui icons](https://github.com/radix-ui/icons)