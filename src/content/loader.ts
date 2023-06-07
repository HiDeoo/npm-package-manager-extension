import { isHistoryUpdateEventMessage } from '@/libs/event'

chrome.runtime.onMessage.addListener(async (request) => {
  if (!isHistoryUpdateEventMessage(request)) {
    return
  }

  const src = chrome.runtime.getURL('content.js')

  try {
    const extension: typeof import('./index') = await import(src)

    await extension.run(new URL(request.url))
  } catch (error) {
    console.error(`Unable to load extension: ${error}`)
  }

  return true
})
