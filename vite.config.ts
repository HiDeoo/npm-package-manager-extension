import { resolve } from 'node:path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src', 'content', 'index.ts'),
        content_styles: resolve(__dirname, 'src', 'content', 'styles.css'),
        loader: resolve(__dirname, 'src', 'content', 'loader.ts'),
        popup: resolve(__dirname, 'popup.html'),
        sw: resolve(__dirname, 'src', 'sw', 'index.ts'),
      },
      output: {
        assetFileNames: ({ name }) => {
          return name?.endsWith('content/styles.css') ? 'content.css' : 'assets/[name].[hash][extname]'
        },
        entryFileNames: ({ name }) => {
          switch (name) {
            case 'content': {
              return 'content.js'
            }
            case 'loader': {
              return 'loader.js'
            }
            case 'sw': {
              return 'sw.js'
            }
            default: {
              return 'assets/[name].[hash].js'
            }
          }
        },
      },
      preserveEntrySignatures: 'strict',
    },
  },
  plugins: [tsconfigPaths(), svelte()],
})
