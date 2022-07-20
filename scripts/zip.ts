import { join } from 'node:path'

import { zip } from 'zip-a-folder'

import { name, version } from '../manifest.json'

import { ensureDir, getDirname } from './utils'

const outputDirPath = join(getDirname(), '..', 'releases')

async function zipExtension() {
  await ensureDir(outputDirPath)

  await zip(
    join(getDirname(), '..', 'dist'),
    join(outputDirPath, `${name.toLowerCase().replace(/\s/g, '-')}-${version}.zip`)
  )
}

zipExtension()
