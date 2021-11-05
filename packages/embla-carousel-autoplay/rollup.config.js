import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'
import packageJson from './package.json'

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
}
const CONFIG_TYPESCRIPT = {
  tsconfig: 'tsconfig.json',
  typescript: localTypescript,
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${packageJson.name}.js`,
        format: 'cjs',
        strict: true,
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: `${packageJson.name}.esm.js`,
        format: 'esm',
        strict: true,
        sourcemap: true,
      },
      {
        file: `${packageJson.name}.umd.js`,
        format: 'umd',
        strict: true,
        sourcemap: false,
        name: 'EmblaCarouselAutoplay',
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
  },
]
