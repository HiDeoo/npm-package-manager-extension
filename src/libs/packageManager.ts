export const packageManagers = ['npm', 'yarn', 'pnpm', 'custom'] as const

export type PackageManager = typeof packageManagers[number]
