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

export function addOptionsListener(listener: (optionChanges: OptionsChanges) => void) {
  return chrome.storage.onChanged.addListener(async (changes) => {
    listener(changes as OptionsChanges)
  })
}

export interface Options {
  packageManager: PackageManager
}

type OptionsChanges = {
  [TKey in keyof Options]: Change<Options[TKey]>
}

interface Change<TType> {
  newValue: TType
  oldValue: TType
}
