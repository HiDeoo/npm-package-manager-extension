import assert from 'node:assert'
import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { EXT_TEST_KEY } from '../tests/constants'

const args = process.argv.slice(2)

assert(args.length < 2, getHelp())

async function copyManifest() {
  const isTest = args[0] === '--test'

  try {
    const outputDirPath = join(getDirname(), '..', 'public')

    await ensureDir(outputDirPath)

    const outputPath = join(outputDirPath, 'manifest.json')

    await copyFile(getManifestPath(), outputPath)

    if (isTest) {
      // We explicitely set the key in the manifest.json file to make sure to obtain an unique ID for the extension that
      // we can use in the tests.
      // https://developer.chrome.com/docs/extensions/mv2/manifest/key
      await setManifestTestKey(outputPath)
    }
  } catch (error) {
    console.error('Unable to copy manifest file.')
    console.error(error)
  }
}

function getManifestPath() {
  return join(getDirname(), '..', 'manifest.json')
}

function getDirname(): string {
  return dirname(fileURLToPath(import.meta.url))
}

function getHelp() {
  return 'Usage: npm-package-manager-extension [--test]'
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
