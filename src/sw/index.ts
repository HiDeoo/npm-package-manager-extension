import type { HistoryUpdateEventMessage } from '@/libs/event'

chrome.webNavigation.onHistoryStateUpdated.addListener(
  async ({ tabId, url }) => {
    const message: HistoryUpdateEventMessage = { type: 'history-update', url }

    chrome.tabs.sendMessage(tabId, message)
  },
  {
    url: [
      {
        hostEquals: 'www.npmjs.com',
        pathPrefix: '/package/',
      },
    ],
  }
)
