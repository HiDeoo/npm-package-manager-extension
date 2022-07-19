import { expect, type Page } from '@playwright/test'

import { goToExtensionPage, test, validPackageManagers } from './test.js'

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

      let expectedCommand = `$ ${packageManager} add <dependency>`
      let expectedDevCommand = `$ ${packageManager} add -D <dependency>`

      switch (packageManager) {
        case 'npm': {
          expectedCommand = '$ npm i <dependency>'
          expectedDevCommand = '$ npm i -D <dependency>'
          break
        }
        case 'ni': {
          expectedCommand = '$ ni <dependency>'
          expectedDevCommand = '$ ni -D <dependency>'
          break
        }
        case 'bun': {
          expectedCommand = '$ bun add <dependency>'
          expectedDevCommand = '$ bun add -d <dependency>'
          break
        }
      }

      expect(command).toBe(expectedCommand)
      expect(devCommand).toBe(expectedDevCommand)
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
