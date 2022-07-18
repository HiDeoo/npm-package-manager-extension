export const packageManagers = ['npm', 'yarn', 'pnpm', 'none'] as const

export function isValidPackageManager(packageManager: PackageManager) {
  return packageManager !== 'none'
}

export type PackageManager = typeof packageManagers[number]
