export function isHistoryUpdateEventMessage(message: unknown): message is HistoryUpdateEventMessage {
  return (
    typeof message === 'object' &&
    (message as HistoryUpdateEventMessage).type === 'history-update' &&
    typeof (message as HistoryUpdateEventMessage).url === 'string'
  )
}

export interface HistoryUpdateEventMessage {
  type: 'history-update'
  url: string
}
