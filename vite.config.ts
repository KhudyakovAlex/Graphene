import { copyFile, mkdir } from 'node:fs/promises'
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
      name: 'copy-font-license',
      async writeBundle() {
        const targetDirectory = fromRoot('./dist/assets/fonts/')

        await mkdir(targetDirectory, { recursive: true })
        await copyFile(
          fromRoot('./src/assets/fonts/LICENSE-OFL.txt'),
          `${targetDirectory}/LICENSE-OFL.txt`,
        )
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
