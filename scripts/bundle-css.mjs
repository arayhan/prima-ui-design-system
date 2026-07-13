// Flatten src/styles.css's @import graph into one self-contained dist/styles.css.
// Rendered designs (and design-sync) receive only styles.css's transitive @import
// closure — separate token files aren't carried — so inline them into one file.
// The remote Google Fonts @import stays external and is hoisted to the top.
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/styles.css'],
  bundle: true,
  outfile: 'dist/styles.css',
  logLevel: 'info',
});

console.log('bundled dist/styles.css (flattened token @imports)');
