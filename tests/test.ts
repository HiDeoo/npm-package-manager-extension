import { test as baseTest, chromium, type Page } from '@playwright/test'

import { EXT_TEST_ID } from './constants.js'

export const test = baseTest.extend({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const launchOptions = {
      headless: false,
      args: ['--disable-extensions-except=./dist', '--load-extension=./dist'],
    }

    const context = await chromium.launchPersistentContext('', launchOptions)

    await use(context)

    await context.close()
  },
})

export function goToExtensionPage(page: Page) {
  return page.goto(`chrome-extension://${EXT_TEST_ID}/popup.html`)
}
