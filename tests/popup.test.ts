import { EXT_TEST_ID } from './constants.js'
import { test } from './test.js'

test.describe('popup', () => {
  test('should have loaded the extension', async ({ page }) => {
    await page.goto(`chrome-extension://${EXT_TEST_ID}/popup.html`)
  })
})
