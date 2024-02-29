import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'lib',
      fileName: 'lib',
      formats: ['cjs', 'es', 'umd'],
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
