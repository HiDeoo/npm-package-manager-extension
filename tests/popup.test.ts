import { expect, type Page } from '@playwright/test'

import { isValidPackageManager, packageManagers } from '../src/libs/packageManager.js'

import { goToExtensionPage, test } from './test.js'

const validPackageManagers = packageManagers.filter((packageManager) => isValidPackageManager(packageManager))

test.describe('popup', () => {
  test('should have loaded the extension', async ({ page }) => {
    await goToExtensionPage(page)
  })

  test('should default to pnpm', async ({ page }) => {
    await goToExtensionPage(page)

    const [command, devCommand] = await getCommands(page)

    expect(command).toBe('$ pnpm add <dependency>')
    expect(devCommand).toBe('$ pnpm add -D <dependency>')
  })

  for (const packageManager of validPackageManagers) {
    test(`should support using ${packageManager}`, async ({ page }) => {
      await goToExtensionPage(page)

      await page.locator('select').selectOption(packageManager)

      const [command, devCommand] = await getCommands(page)

      if (packageManager === 'npm') {
        expect(command).toBe('$ npm i <dependency>')
        expect(devCommand).toBe('$ npm i -D <dependency>')
      } else {
        expect(command).toBe(`$ ${packageManager} add <dependency>`)
        expect(devCommand).toBe(`$ ${packageManager} add -D <dependency>`)
      }
    })
  }

  test(`should support disabling the extesion`, async ({ page }) => {
    await goToExtensionPage(page)

    await page.locator('select').selectOption('none')

    const text = await page.locator('p').textContent()

    expect(text).toBe('Npm Package Manager iscurrently disabled.')
  })

  test('should contains a link to report issues', async ({ context, page }) => {
    await goToExtensionPage(page)

    const linkLocator = page.locator('a')

    expect(await linkLocator.textContent()).toBe('Report issue')

    const [newPage] = await Promise.all([context.waitForEvent('page'), linkLocator.click()])

    expect(newPage.url()).toBe('https://github.com/HiDeoo/npm-package-manager-extension/issues')
  })
})

async function getCommands(page: Page) {
  const commandsLocator = page.locator('code div')

  const command = await commandsLocator.first().textContent()
  const devCommand = await commandsLocator.last().textContent()

  return [command, devCommand]
}
