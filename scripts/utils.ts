import { access, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export function getDirname(): string {
  return dirname(fileURLToPath(import.meta.url))
}

export async function ensureDir(path: string) {
  try {
    await access(path)
  } catch {
    await mkdir(path)
  }
}
