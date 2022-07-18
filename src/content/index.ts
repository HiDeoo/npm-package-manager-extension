import { cloneElement, hideElement, showElement } from '@/libs/html'
import { addOptionsListener, getOptions, type Options } from '@/libs/options'
import { isValidPackageManager, type PackageManager } from '@/libs/packageManager'

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

  const commandTextNode = newCommand.querySelector('span')

  if (commandTextNode) {
    commandTextNode.textContent = `${packageManager} add ${dev ? '-D' : ''} ${commandTextNode.textContent
      ?.split(' ')
      ?.at(-1)}`
  }

  return newCommand
}

function removeCommandNodes() {
  const commandNodes = document.querySelectorAll(`.${npmManagerCommandClass}`)

  for (const commandNode of commandNodes) {
    commandNode.remove()
  }
}

getOptions()
  .then(setup)
  .catch((error) => {
    console.error(`Unable to retrieve Npm Package Manager extension options: ${error}`)
  })
