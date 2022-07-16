import type { PackageManager } from '@/libs/packageManager'

const defaultOptions: Options = {
  packageManager: 'pnpm',
}

export function getOptions() {
  return chrome.storage.sync.get(defaultOptions) as Promise<Options>
}

export function setOptions(options: Partial<Options>) {
  return chrome.storage.sync.set(options)
}

export interface Options {
  packageManager: PackageManager
}
