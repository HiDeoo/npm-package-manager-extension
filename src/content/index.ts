import { hideElement, showElement } from '@/libs/html'
import { addOptionsListener, getOptions, type Options } from '@/libs/storage'

function setup(options: Options) {
  addOptionsListener((newOptions, optionChanges) => {
    if (optionChanges.enabled.oldValue) {
      stop()
    }

    if (optionChanges.enabled.newValue) {
      start(newOptions)
    }
  })

  if (!options.enabled) {
    return
  }

  start(options)
}

function start(options: Options) {
  // FIXME(HiDeoo)
  console.error('🚨 [index.ts:23] options', options)

  const commandWrapper = getNpmCommandWrapper()

  if (!commandWrapper) {
    return
  }

  hideElement(commandWrapper)
}

function stop() {
  const commandWrapper = getNpmCommandWrapper()

  if (!commandWrapper) {
    return
  }

  showElement(commandWrapper)
}

function getNpmCommandWrapper() {
  return document.querySelector('span[role=button]')?.parentElement?.parentElement
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
