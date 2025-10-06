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

const urlPathnameVersionRegex = /\/v\/(?<version>[^/]+)$/

let isConfigured = false
let version: string | undefined

export async function run(url: URL) {
  const matches = url.pathname.match(urlPathnameVersionRegex)
  version = matches?.groups?.version && matches.groups.version.length > 0 ? matches.groups.version : undefined

  configure()

  try {
    const options = await getOptions()

    if (!isValidPackageManager(options.packageManager)) {
      return
    }

    renderExtension(options)
  } catch (error) {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  }
}

function configure() {
  if (isConfigured) {
    return
  }

  addOptionsListener((optionChanges) => {
    renderExtension({ packageManager: optionChanges.packageManager.newValue })
  })

  isConfigured = true
}

function renderExtension(options: Options) {
  hideExtension()

  if (isValidPackageManager(options.packageManager)) {
    showExtension(options)
  }
}

function showExtension({ packageManager }: Options) {
  const { command, commandTitle, dependency, sidebar } = getNpmElements()

  if (!command || !commandTitle || !sidebar || !dependency || !dependency.textContent) {
    return
  }

  hideElement(command)

  updateCommandTitle(commandTitle, packageManager)

  const newElements = [
    createCommandNode(command, packageManager, dependency.textContent, false, version),
    createCommandNode(command, packageManager, dependency.textContent, true, version),
  ]

  const typeScriptDeclarations = getTypeScriptDeclarations()

  if (typeScriptDeclarations) {
    newElements.push(
      createTitleNode(commandTitle, `Install TypeScript declarations with ${packageManager}`),
      createCommandNode(command, packageManager, typeScriptDeclarations, true)
    )
  }

  commandTitle.after(...newElements)

  stickElement(sidebar)
}

function hideExtension() {
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
  const command = document.querySelector('code + button')?.parentElement?.parentElement?.parentElement
  const dependency = document.querySelector('main > div > div > h2 > span')
  const sidebar = command?.parentElement
  const commandTitle = sidebar?.querySelector(':scope > h3')

  return {
    command,
    commandTitle,
    dependency,
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
