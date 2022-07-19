import assert from 'node:assert'
import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { EXT_TEST_KEY } from '../tests/constants'

const args = process.argv.slice(2)

assert(args.length > 0 && args.length <= 2, getHelp())

async function copyManifest() {
  const target = args[0]
  const isTest = args[1] === '--test'

  try {
    const outputDirPath = join(getDirname(), '..', 'public')

    await ensureDir(outputDirPath)

    const outputPath = join(outputDirPath, 'manifest.json')

    await copyFile(getManifestPath(target), outputPath)

    if (isTest) {
      // We explicitely set the key in the manifest.json file to make sure to obtain an unique ID for the extension that
      // we can use in the tests.
      // https://developer.chrome.com/docs/extensions/mv2/manifest/key
      await setManifestTestKey(outputPath)
    }
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

function getHelp() {
  return 'Usage: npm-package-manager-extension <target> [--test]'
}

async function ensureDir(path: string) {
  try {
    await access(path)
  } catch {
    await mkdir(path)
  }
}

async function setManifestTestKey(path: string) {
  const manifestStr = await readFile(path, 'utf8')
  const manifest = JSON.parse(manifestStr)

  manifest.key = EXT_TEST_KEY

  await writeFile(path, JSON.stringify(manifest, null, 2))
}

copyManifest()
