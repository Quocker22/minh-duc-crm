import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig, splitVendorChunkPlugin } from 'vite';
import checker from 'vite-plugin-checker';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    root: './src',
    setupFiles: ['./src/setupTests.ts'],
  },
});

const defaultConfig = defineConfig({
  build: { chunkSizeWarningLimit: 1600, manifest: true, sourcemap: true },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'border-color-base': '#DFE3E9',
          'border-radius-base': '0.475rem',
          'disabled-color': '#7e8299',
          'error-color': '#f1416c',
          'font-size-base': '14px',
          'heading-color': '#181c32',
          'link-color': '#006AFD',
          'primary-color': '#006AFD',
          'success-color': '#50cd89',
          'text-color': '#181c32',
          'text-color-secondary': '#e4e6ef',
          'warning-color': '#ffc700',
        },
      },
    },
  },
  plugins: [react(), splitVendorChunkPlugin(), checker({ typescript: true })],
  preview: { host: true, port: 8100, strictPort: true },
  resolve: { alias: { '@': '/src' } },
  server: {
    hmr: { host: 'localhost' },
    host: true,
    port: 8100,
    strictPort: true,
  },
});

export default mergeConfig(defaultConfig, vitestConfig);
