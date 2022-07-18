import { hideElement, showElement } from '@/libs/html'
import { addOptionsListener, getOptions, type Options } from '@/libs/options'
import { isValidPackageManager } from '@/libs/packageManager'

function setup(options: Options) {
  addOptionsListener((optionChanges) => {
    if (isValidPackageManager(optionChanges.packageManager.oldValue)) {
      stop()
    }

    if (isValidPackageManager(optionChanges.packageManager.newValue)) {
      start({ packageManager: optionChanges.packageManager.newValue })
    }
  })

  if (!isValidPackageManager(options.packageManager)) {
    return
  }

  start(options)
}

function start(options: Options) {
  const { command, commandTitle } = getNpmElements()

  if (!command || !commandTitle) {
    return
  }

  hideElement(command)

  if (isValidPackageManager(options.packageManager)) {
    commandTitle.textContent = `Install with ${options.packageManager}`
  }
}

function stop() {
  const { command } = getNpmElements()

  if (!command) {
    return
  }

  showElement(command)
}

function getNpmElements() {
  const command = document.querySelector('span[role=button]')?.parentElement?.parentElement
  const sidebar = command?.parentElement
  const commandTitle = sidebar?.firstChild

  return {
    sidebar,
    command,
    commandTitle,
  }
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
