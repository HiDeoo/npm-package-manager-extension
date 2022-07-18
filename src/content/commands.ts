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

  copyCommandToClipboard(event.currentTarget)
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

  copyCommandToClipboard(event.currentTarget)
}

function copyCommandToClipboard(target: HTMLElement) {
  // TODO(HiDeoo)
  console.error('🚨 [index.ts:105] text', target.textContent)

  const svg = target.parentElement?.parentElement?.querySelector('svg[data-icon="copy"]')

  if (!svg) {
    return
  }

  const previousIconPath = svg.querySelector('path')

  if (!previousIconPath) {
    return
  }

  const checkIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  checkIconPath.setAttribute(
    'd',
    'M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z'
  )

  previousIconPath.replaceWith(checkIconPath)

  setTimeout(() => {
    checkIconPath.replaceWith(previousIconPath)
  }, 500)
}
