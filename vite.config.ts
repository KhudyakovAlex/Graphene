import { copyFile, cp, mkdir } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['env.d.ts', 'src'],
      tsconfigPath: './tsconfig.json',
    }),
    {
      name: 'copy-package-assets',
      async writeBundle() {
        const assetsDirectory = fromRoot('./dist/assets/')
        const fontsDirectory = `${assetsDirectory}/fonts`

        await mkdir(fontsDirectory, { recursive: true })
        await Promise.all([
          copyFile(
            fromRoot('./src/assets/fonts/LICENSE-OFL.txt'),
            `${fontsDirectory}/LICENSE-OFL.txt`,
          ),
          cp(fromRoot('./src/assets/icons/'), `${assetsDirectory}/icons`, {
            recursive: true,
            filter: (source) => !source.endsWith('.md'),
          }),
        ])
      },
    },
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: fromRoot('./src/index.ts'),
        styles: fromRoot('./src/styles/index.ts'),
      },
      formats: ['es'],
      cssFileName: 'graphene',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
