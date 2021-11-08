import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import nodeResolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

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
  alias({
    entries: [
      { find: '$generated', replacement: path.resolve(__dirname, './src/generated') },
    ],
  }),
  json(),
  filesize(),
];

const input = {
  'index': path.resolve(__dirname, './src/index.ts'),
  'paths': path.resolve(__dirname, './src/paths.ts'),
}

const external = ['i18next'];

export default [
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'build/esm'),
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'build/cjs'),
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
    external,
  },
];
