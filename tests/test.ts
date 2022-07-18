import { test as baseTest, chromium } from '@playwright/test'

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
