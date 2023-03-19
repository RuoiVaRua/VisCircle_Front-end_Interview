import esbuild from 'esbuild';
import copyStaticFiles from 'esbuild-copy-static-files';
import { DevServer } from '@lrnzdms/local-server';
import cssModulesPlugin from 'esbuild-css-modules-plugin';

const entry = './src/index.tsx';
const out = './dist';
const port = 3000;

const watch = process.argv.includes('-w');
const server = watch && new DevServer({port, root: out});

esbuild.build({
  entryPoints: [entry],
  outfile: `${out}/bundle.js`,
  platform: 'browser',
  format: 'esm',
  bundle: true,
  minify: !watch,
  sourcemap: watch,
  assetNames: '[dir]/[name]',
  loader: {
    '.png': 'file'
  },
  logLevel: 'info',
  define: {
    __version: `'${process.env.npm_package_version}'`
  },
  plugins: [
    copyStaticFiles({
      src: './static',
      dest: out
    }),
    cssModulesPlugin()
  ],
  watch: server && {
    onRebuild(err) {
      server.update();
    }
  }
}).catch(() => process.exit(1))
