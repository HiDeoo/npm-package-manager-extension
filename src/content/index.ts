import {
  createCommandNode,
  createTitleNode,
  removeCommandNodes,
  removeTitleNodes,
  updateCommandTitle,
} from '@/content/commands'
import { hideElement, showElement, stickElement, unstickElement } from '@/libs/html'
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
  const { command, commandTitle, sidebar } = getNpmElements()

  if (!command || !commandTitle || !sidebar) {
    return
  }

  hideElement(command)

  updateCommandTitle(commandTitle, packageManager)

  const newElements = [createCommandNode(command, packageManager), createCommandNode(command, packageManager, true)]

  const typeScriptDeclarations = getTypeScriptDeclarations()

  if (typeScriptDeclarations) {
    newElements.push(
      createTitleNode(commandTitle, `Install TypeScript declarations with ${packageManager}`),
      createCommandNode(command, packageManager, true, typeScriptDeclarations)
    )
  }

  commandTitle.after(...newElements)

  stickElement(sidebar)
}

function stop() {
  removeTitleNodes()
  removeCommandNodes()

  const { command, commandTitle, sidebar } = getNpmElements()

  if (!command || !commandTitle || !sidebar) {
    return
  }

  showElement(command)

  updateCommandTitle(commandTitle)

  unstickElement(sidebar)
}

function getNpmElements() {
  const command = document.querySelector('span[role=button]')?.parentElement?.parentElement
  const sidebar = command?.parentElement
  const commandTitle = sidebar?.firstChild

  return {
    command,
    commandTitle,
    sidebar,
  }
}

function getTypeScriptDeclarations() {
  const declarationElement = document.querySelector('main h2 > div[data-nosnippet=true]')?.firstChild

  if (!(declarationElement instanceof HTMLAnchorElement)) {
    return
  }

  return declarationElement.href.replace('https://www.npmjs.com/package/', '')
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
