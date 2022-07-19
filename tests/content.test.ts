import { goToExtensionPage, test } from './test.js'

test.describe('content', () => {
  test('should have loaded the extension', async ({ page }) => {
    await goToExtensionPage(page)
  })
})
