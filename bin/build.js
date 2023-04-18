import * as esbuild from 'esbuild';

await esbuild
  .build({
    entryPoints: ['src/global.js', 'src/blog.js'],
    bundle: true,
    minify: true,
    watch: true,
    sourcemap: false,
    outdir: 'dist/',
  })
  .catch(() => ProcessingInstruction.exit(1));
