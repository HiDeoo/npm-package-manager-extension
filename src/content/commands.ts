import { cloneElement, showElement } from '@/libs/html'
import { getPackageManagerCommand, type PackageManager } from '@/libs/packageManager'

const npmManagerCommandClass = 'npm-package-manager-command'

export function updateCommandTitle(commandTitle: ChildNode, packageManager?: PackageManager) {
  commandTitle.textContent = packageManager ? `Install with ${packageManager}` : 'Install'
}

export function createCommandNode(command: HTMLElement, packageManager: PackageManager, dev = false) {
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

export function removeCommandNodes() {
  const commandNodes = document.querySelectorAll(`.${npmManagerCommandClass}`)

  for (const commandNode of commandNodes) {
    const commandButtonNode = commandNode.querySelector('span[role=button]')

    commandButtonNode?.removeEventListener('click', handleCommandClick)
    commandButtonNode?.removeEventListener('keypress', handleCommandKeyPress)

    commandNode.remove()
  }
}

export function handleCommandClick(event: Event) {
  if (!event.currentTarget || !(event.currentTarget instanceof HTMLElement) || !event.currentTarget.textContent) {
    return
  }

  copyCommandToClipboard(event.currentTarget.textContent)
}

export function handleCommandKeyPress(event: Event) {
  if (
    !(event instanceof KeyboardEvent) ||
    event.key !== 'Enter' ||
    !event.currentTarget ||
    !(event.currentTarget instanceof HTMLElement) ||
    !event.currentTarget.textContent
  ) {
    return
  }

  copyCommandToClipboard(event.currentTarget.textContent)
}

function copyCommandToClipboard(text: string) {
  // TODO(HiDeoo)
  console.error('🚨 [index.ts:105] text', text)
}
