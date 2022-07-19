import { expect, type Page } from '@playwright/test'
import clipboard from 'clipboardy'

import { goToExtensionPage, goToNpmPage, npmTestPackage, test, validPackageManagers } from './test.js'

test.describe('content', () => {
  for (const packageManager of validPackageManagers) {
    test(`should show commands for ${packageManager}`, async ({ page }) => {
      await goToExtensionPage(page)
      await page.locator('select').selectOption(packageManager)

      await goToNpmPage(page)
      await page.waitForSelector(`h3:has-text("Install with ${packageManager}")`)

      const [commandLocator, devCommandLocator, oldCommandLocator] = await getCommandLocators(page)

      const command = await commandLocator.textContent()
      const devCommand = await devCommandLocator.textContent()

      let expectedCommand = `${packageManager} add ${npmTestPackage}`
      let expectedDevCommand = `${packageManager} add -D ${npmTestPackage}`

      switch (packageManager) {
        case 'npm': {
          expectedCommand = `npm i ${npmTestPackage}`
          expectedDevCommand = `npm i -D ${npmTestPackage}`
          break
        }
        case 'ni': {
          expectedCommand = `ni ${npmTestPackage}`
          expectedDevCommand = `ni -D ${npmTestPackage}`
          break
        }
        case 'bun': {
          expectedCommand = `bun add ${npmTestPackage}`
          expectedDevCommand = `bun add -d ${npmTestPackage}`
          break
        }
      }

      expect(command).toBe(expectedCommand)
      expect(devCommand).toBe(expectedDevCommand)

      await commandLocator.click()
      expect(await clipboard.read()).toBe(expectedCommand)

      await devCommandLocator.click()
      expect(await clipboard.read()).toBe(expectedDevCommand)

      expect(await oldCommandLocator.isVisible()).toBe(false)
    })
  }

  test(`should support not show any specific command when disabled`, async ({ page }) => {
    await goToExtensionPage(page)
    await page.locator('select').selectOption('none')

    await goToNpmPage(page)
    await page.waitForSelector(`h3:has-text("Install")`)

    const commandLocator = page.locator('span[role=button]')

    expect(await commandLocator.count()).toBe(1)
    expect(await commandLocator.isVisible()).toBe(true)
    expect(await commandLocator.textContent()).toBe(`npm i ${npmTestPackage}`)
  })
})

async function getCommandLocators(page: Page) {
  const commandsLocator = page.locator('span[role=button]')

  const command = commandsLocator.first()
  const devCommand = commandsLocator.nth(1)
  const oldCommand = commandsLocator.last()

  return [command, devCommand, oldCommand]
}
