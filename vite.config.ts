import { resolve } from 'node:path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src', 'content', 'index.ts'),
        loader: resolve(__dirname, 'src', 'content', 'loader.ts'),
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        entryFileNames: ({ name }) =>
          name === 'content' ? 'content.js' : name === 'loader' ? 'loader.js' : 'assets/[name].[hash].js',
      },
    },
  },
  plugins: [tsconfigPaths(), svelte()],
})
