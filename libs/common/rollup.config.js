import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import nodeResolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

const plugins = [
  typescript({
    typescript: require('ttypescript'),
    useTsconfigDeclarationDir: true,
    tsconfigDefaults: {
      compilerOptions: {
        plugins: [
          { "transform": "typescript-transform-paths" },
          { "transform": "typescript-transform-paths", "afterDeclarations": true },
        ],
      },
    },
  }),
  nodeResolver(),
  commonjs(),
  filesize(),
];

const input = {
  'index': path.resolve(__dirname, './src/index.ts'),
  'env': path.resolve(__dirname, './src/constants/env.ts'),
  'utils': path.resolve(__dirname, './src/utils/index.ts'),
}

const external = [];

export default [
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'dist/esm'),
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'dist/cjs'),
      format: 'cjs',
      sourcemap: true,
    },
    external,
    plugins,
  }
];
