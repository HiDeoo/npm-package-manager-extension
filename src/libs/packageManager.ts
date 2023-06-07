export const packageManagers = ['npm', 'yarn', 'pnpm', 'ni', 'bun', 'none'] as const

const packageManagerCommands: Record<Exclude<PackageManager, 'none'>, PackageManagerCommand> = {
  npm: { text: 'npm i', devOption: '-D' },
  yarn: { text: 'yarn add', devOption: '-D' },
  pnpm: { text: 'pnpm add', devOption: '-D' },
  ni: { text: 'ni', devOption: '-D' },
  bun: { text: 'bun add', devOption: '-d' },
}

export function isValidPackageManager(packageManager: PackageManager) {
  return packageManager !== 'none'
}

export function getPackageManagerCommand(
  packageManager: PackageManager,
  dependency: string,
  dev: boolean,
  version?: string | undefined
) {
  if (packageManager === 'none') {
    return ''
  }

  const command = packageManagerCommands[packageManager]

  return `${command.text} ${dev ? `${command.devOption} ` : ''}${dependency}${version ? `@${version}` : ''}`
}

export type PackageManager = typeof packageManagers[number]

interface PackageManagerCommand {
  text: string
  devOption: string
}
