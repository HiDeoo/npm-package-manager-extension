import { createCommandNode, removeCommandNodes, updateCommandTitle } from '@/content/commands'
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

function start({ packageManager }: Options) {
  const { command, commandTitle } = getNpmElements()

  if (!command || !commandTitle) {
    return
  }

  hideElement(command)

  updateCommandTitle(commandTitle, packageManager)

  commandTitle.after(createCommandNode(command, packageManager), createCommandNode(command, packageManager, true))
}

function stop() {
  removeCommandNodes()

  const { command, commandTitle } = getNpmElements()

  if (!command || !commandTitle) {
    return
  }

  showElement(command)

  updateCommandTitle(commandTitle)
}

function getNpmElements() {
  const command = document.querySelector('span[role=button]')?.parentElement?.parentElement
  const sidebar = command?.parentElement
  const commandTitle = sidebar?.firstChild

  return {
    command,
    commandTitle,
  }
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
