import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    plugins: [ts()],
    output: [{ file: pkg.main, format: 'es' }],
  },
];
