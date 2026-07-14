import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    // Alias the library to its live source so edits reflect instantly and
    // no tsup build is needed. The /styles.css alias must precede the bare one.
    alias: [
      { find: 'arayhan-design-system/styles.css', replacement: r('../src/styles.css') },
      { find: 'arayhan-design-system', replacement: r('../src/index.ts') },
    ],
    dedupe: ['react', 'react-dom'],
  },
  server: {
    fs: { allow: [r('..')] },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'] },
      },
    },
  },
});
