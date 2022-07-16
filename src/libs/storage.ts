import type { PackageManager } from '@/libs/packageManager'

const defaultOptions: Options = {
  enabled: true,
  packageManager: 'pnpm',
}

export function getOptions() {
  return chrome.storage.sync.get(defaultOptions) as Promise<Options>
}

export function setOptions(options: Partial<Options>) {
  return chrome.storage.sync.set(options)
}

export function addOptionsListener(listener: (newOptions: Options, optionChanges: OptionsChanges) => void) {
  return chrome.storage.onChanged.addListener(async (changes) => {
    const newOptions = await getOptions()

    listener(newOptions, changes as OptionsChanges)
  })
}

export interface Options {
  enabled: boolean
  packageManager: PackageManager
}

type OptionsChanges = {
  [TKey in keyof Options]: Change<Options[TKey]>
}

interface Change<TType> {
  newValue: TType
  oldValue: TType
}
