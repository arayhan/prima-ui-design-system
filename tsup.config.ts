import { defineConfig } from 'tsup';
import { cpSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  onSuccess: async () => {
    cpSync('src/styles.css', 'dist/styles.css');
    cpSync('src/tokens', 'dist/tokens', { recursive: true });
  },
});
