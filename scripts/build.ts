import assert from 'node:assert'
import { copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)

assert(args.length === 1, 'A single target argument is required.')

async function build() {
  const target = args[0]

  try {
    await copyFile(getManifestPath(target), join(getDirname(), '..', 'public', 'manifest.json'))
  } catch (error) {
    console.error(`Unable to copy manifest file for the '${target}' target.`)
    console.error(error)
  }
}

function getManifestPath(target: string) {
  return join(getDirname(), '..', 'manifests', `${target}.json`)
}

function getDirname(): string {
  return dirname(fileURLToPath(import.meta.url))
}

build()
