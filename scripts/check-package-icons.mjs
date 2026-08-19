import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'
import { stdout } from 'node:process'
import { fileURLToPath, URL } from 'node:url'

import { build, createServer } from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const sourceDirectory = resolve(root, 'src/assets/icons')
const packageDirectory = resolve(root, 'dist/assets/icons')
const temporaryDirectory = await mkdtemp(resolve(root, '.graphene-icons-'))
const consumerEntry = resolve(temporaryDirectory, 'consumer.js')
const consumerHtml = resolve(temporaryDirectory, 'index.html')
const outputDirectory = resolve(temporaryDirectory, 'dist')
let devServer

const listSvgFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true, recursive: true })

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => relative(directory, resolve(entry.parentPath, entry.name)).replaceAll('\\', '/'))
    .sort()
}

try {
  const [sourceIcons, packageIcons] = await Promise.all([
    listSvgFiles(sourceDirectory),
    listSvgFiles(packageDirectory),
  ])

  if (sourceIcons.length === 0 || sourceIcons.join('\n') !== packageIcons.join('\n')) {
    throw new Error(
      `Packaged icons differ from source: source=${sourceIcons.length}, dist=${packageIcons.length}`,
    )
  }

  await writeFile(
    consumerEntry,
    `
      import searchIconUrl from '@graphene/core/icons/search.svg?url'
      import arrowDownIconUrl from '@graphene/core/icons/others/arrow-down.svg?url'
      document.body.dataset.icons = [searchIconUrl, arrowDownIconUrl].join(',')
    `,
  )
  await writeFile(consumerHtml, '<script type="module" src="/consumer.js"></script>')

  devServer = await createServer({
    configFile: false,
    logLevel: 'silent',
    root: temporaryDirectory,
    server: {
      middlewareMode: true,
    },
  })
  const transformedConsumer = await devServer.transformRequest('/consumer.js')
  if (!transformedConsumer) {
    throw new Error('Vite dev server did not transform public icon imports')
  }
  await devServer.close()
  devServer = undefined

  await build({
    configFile: false,
    logLevel: 'silent',
    root: temporaryDirectory,
    build: {
      assetsInlineLimit: 0,
      emptyOutDir: true,
      outDir: outputDirectory,
    },
  })

  const builtIcons = await listSvgFiles(outputDirectory)
  if (builtIcons.length !== 2) {
    throw new Error(`Consumer build emitted ${builtIcons.length} SVG files instead of 2`)
  }

  const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
  if (packageJson.exports?.['./icons/*'] !== './dist/assets/icons/*') {
    throw new Error('Public icon export is missing from package.json')
  }

  stdout.write(
    `Verified ${packageIcons.length} packaged icons; dev imports resolved and production emitted 2 SVG files.\n`,
  )
} finally {
  await devServer?.close()
  await rm(temporaryDirectory, { recursive: true, force: true })
}
