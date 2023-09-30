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

      const [commandLocator, devCommandLocator, oldCommandLocator] = getCommandLocators(page)

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

  test('should use the exact version in the commands when loading a specific version page', async ({ page }) => {
    const version = '18.2.0'
    const packageManager = 'pnpm'

    await goToExtensionPage(page)
    await page.locator('select').selectOption(packageManager)

    await goToNpmPage(page, 'react', version)
    await page.waitForLoadState('networkidle')

    const [commandLocator, devCommandLocator, , tsDeclarationsLocator] = getCommandLocators(page)

    const command = await commandLocator.textContent()
    const devCommand = await devCommandLocator.textContent()
    const tsDeclarationsCommand = await tsDeclarationsLocator.textContent()

    const expectedCommand = `pnpm add react@${version}`
    expect(command).toBe(expectedCommand)
    await commandLocator.click()
    expect(await clipboard.read()).toBe(expectedCommand)

    const expectedDevCommand = `pnpm add -D react@${version}`
    expect(devCommand).toBe(expectedDevCommand)
    await devCommandLocator.click()
    expect(await clipboard.read()).toBe(expectedDevCommand)

    const expectedTsDeclarationsCommand = 'pnpm add -D @types/react'
    expect(tsDeclarationsCommand).toBe(expectedTsDeclarationsCommand)
    await tsDeclarationsLocator.click()
    expect(await clipboard.read()).toBe(expectedTsDeclarationsCommand)
  })

  test('should use the exact version in the commands when navigating to a specific version page', async ({ page }) => {
    const version = '18.2.0'
    const packageManager = 'pnpm'

    await goToExtensionPage(page)
    await page.locator('select').selectOption(packageManager)

    await goToNpmPage(page, 'react')
    await page.waitForLoadState('networkidle')

    await page.click('a[aria-controls="tabpanel-versions"]')
    await expect(page.getByRole('heading', { name: 'Current Tags' })).toBeVisible()

    await page.click(`a[aria-label="${version}"]`)
    await page.waitForSelector('a[aria-controls="tabpanel-readme"][aria-selected="true"]')

    const [commandLocator, devCommandLocator, , tsDeclarationsLocator] = getCommandLocators(page)

    const command = await commandLocator.textContent()
    const devCommand = await devCommandLocator.textContent()
    const tsDeclarationsCommand = await tsDeclarationsLocator.textContent()

    const expectedCommand = `pnpm add react@${version}`
    expect(command).toBe(expectedCommand)
    await commandLocator.click()
    expect(await clipboard.read()).toBe(expectedCommand)

    const expectedDevCommand = `pnpm add -D react@${version}`
    expect(devCommand).toBe(expectedDevCommand)
    await devCommandLocator.click()
    expect(await clipboard.read()).toBe(expectedDevCommand)

    const expectedTsDeclarationsCommand = 'pnpm add -D @types/react'
    expect(tsDeclarationsCommand).toBe(expectedTsDeclarationsCommand)
    await tsDeclarationsLocator.click()
    expect(await clipboard.read()).toBe(expectedTsDeclarationsCommand)
  })

  test('should show the TypeScript declarations command for external declarations', async ({ page }) => {
    const packageManager = 'pnpm'

    await goToExtensionPage(page)
    await page.locator('select').selectOption(packageManager)

    await goToNpmPage(page, 'lodash')
    await page.waitForSelector(`h3:has-text("Install TypeScript declarations with ${packageManager}")`)

    const locators = getCommandLocators(page)
    const tsDeclarationsLocator = locators[3]
    const tsDeclarationsCommand = await tsDeclarationsLocator.textContent()

    expect(tsDeclarationsCommand).toBe('pnpm add -D @types/lodash')

    await tsDeclarationsLocator.click()
    expect(await clipboard.read()).toBe(tsDeclarationsCommand)
  })

  test('should not show the TypeScript declarations command for built-in declarations', async ({ page }) => {
    const packageManager = 'pnpm'

    await goToExtensionPage(page)
    await page.locator('select').selectOption(packageManager)

    await goToNpmPage(page, 'cac')
    await page.waitForSelector(`h3:has-text("Install with ${packageManager}")`)

    await expect(page.locator(`h3:has-text("Install TypeScript declarations with ${packageManager}")`)).toHaveCount(0)

    // New command, new dev command & old command
    await expect(page.locator('code > button')).toHaveCount(3)
  })

  test(`should not show any specific command when disabled`, async ({ page }) => {
    await goToExtensionPage(page)
    await page.locator('select').selectOption('none')

    await goToNpmPage(page)
    await page.waitForSelector(`h3:has-text("Install")`)

    const commandLocator = page.locator('code > button')

    expect(await commandLocator.count()).toBe(1)
    expect(await commandLocator.isVisible()).toBe(true)
    expect(await commandLocator.textContent()).toBe(`npm i ${npmTestPackage}`)
  })
})

function getCommandLocators(page: Page) {
  const commandsLocator = page.locator('code > button')

  const command = commandsLocator.first()
  const devCommand = commandsLocator.nth(1)
  const tsDeclarationsCommand = commandsLocator.nth(2)
  const oldCommand = commandsLocator.last()

  return [command, devCommand, oldCommand, tsDeclarationsCommand]
}
