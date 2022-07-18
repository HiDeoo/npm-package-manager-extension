import { cloneElement, hideElement, showElement } from '@/libs/html'
import { addOptionsListener, getOptions, type Options } from '@/libs/options'
import { getPackageManagerCommand, isValidPackageManager, type PackageManager } from '@/libs/packageManager'

const npmManagerCommandClass = 'npm-package-manager-command'

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

function updateCommandTitle(commandTitle: ChildNode, packageManager?: PackageManager) {
  commandTitle.textContent = packageManager ? `Install with ${packageManager}` : 'Install'
}

function createCommandNode(command: HTMLElement, packageManager: PackageManager, dev = false) {
  const newCommand = cloneElement(command)

  showElement(newCommand)
  newCommand.classList.add(npmManagerCommandClass)

  const commandButtonNode = newCommand.querySelector('span[role=button]')
  const dependency = commandButtonNode?.textContent?.split(' ')?.at(-1)

  if (commandButtonNode && dependency) {
    commandButtonNode.textContent = getPackageManagerCommand(packageManager, dependency, dev)

    commandButtonNode.addEventListener('click', handleCommandClick)
    commandButtonNode.addEventListener('keypress', handleCommandKeyPress)
  }

  return newCommand
}

function removeCommandNodes() {
  const commandNodes = document.querySelectorAll(`.${npmManagerCommandClass}`)

  for (const commandNode of commandNodes) {
    const commandButtonNode = commandNode.querySelector('span[role=button]')

    commandButtonNode?.addEventListener('click', handleCommandClick)
    commandButtonNode?.addEventListener('keypress', handleCommandKeyPress)

    commandNode.remove()
  }
}

function handleCommandClick(event: Event) {
  if (!event.currentTarget || !(event.currentTarget instanceof HTMLElement) || !event.currentTarget.textContent) {
    return
  }

  copyToClipboard(event.currentTarget.textContent)
}

function handleCommandKeyPress(event: Event) {
  if (
    !(event instanceof KeyboardEvent) ||
    event.key !== 'Enter' ||
    !event.currentTarget ||
    !(event.currentTarget instanceof HTMLElement) ||
    !event.currentTarget.textContent
  ) {
    return
  }

  copyToClipboard(event.currentTarget.textContent)
}

function copyToClipboard(text: string) {
  // TODO(HiDeoo)
  console.error('🚨 [index.ts:105] text', text)
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
