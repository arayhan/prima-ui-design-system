import { defineConfig } from 'tsup';
import { cpSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  onSuccess: async () => {
    // Keep granular token files available for consumers via the ./tokens/* export.
    // styles.css is emitted separately by scripts/bundle-css.mjs (flattened).
    cpSync('src/tokens', 'dist/tokens', { recursive: true });
  },
});
