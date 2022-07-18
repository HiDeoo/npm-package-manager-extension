import { type PlaywrightTestConfig } from '@playwright/test'

const playwrightConfig: PlaywrightTestConfig = {
  forbidOnly: typeof process.env.CI !== 'undefined',
  use: {
    browserName: 'chromium',
  },
}

export default playwrightConfig
