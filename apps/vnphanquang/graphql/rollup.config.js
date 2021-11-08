import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import nodeResolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

const plugins = [
  typescript({
    typescript: require('typescript'),
    useTsconfigDeclarationDir: true,
  }),
  nodeResolver(),
  commonjs(),
  filesize(),
];

const input = {
  service: path.resolve(__dirname, './src/service/index.ts'),
  index: path.resolve(__dirname, './src/types.generated.ts'),
};

const external = [];

export default [
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'build/esm'),
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },
  {
    input,
    output: {
      dir: path.resolve(__dirname, 'build/cjs'),
      format: 'cjs',
      sourcemap: true,
    },
    external,
    plugins,
  },
];
