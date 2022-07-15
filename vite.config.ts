import { resolve } from 'node:path'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'options.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
  },
  plugins: [tsconfigPaths(), svelte()],
})
