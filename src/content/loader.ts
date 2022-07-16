async function load() {
  const src = chrome.runtime.getURL('content.js')
  await import(src)
}

load()

export {}
