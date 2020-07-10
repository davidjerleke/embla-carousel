import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'
import packageJson from './package.json'

const babelConfig = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
}
const typescriptConfig = {
  typescript: localTypescript,
  declaration: true,
  useTsconfigDeclarationDir: true,
}

export default [
  {
    input: 'src/vanilla/index.ts',
    output: [
      {
        file: `${packageJson.name}.js`,
        format: 'cjs',
        strict: true,
        sourcemap: true,
      },
      {
        file: `${packageJson.name}.esm.js`,
        format: 'esm',
        strict: true,
        sourcemap: true,
      },
      {
        format: 'umd',
        name: 'EmblaCarousel',
        file: `${packageJson.name}.umd.js`,
        strict: true,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
    ],
  },
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: 'react.js',
        format: 'cjs',
        globals: { react: 'React' },
        strict: true,
        sourcemap: true,
      },
      {
        file: 'react.esm.js',
        format: 'esm',
        globals: { react: 'React' },
        strict: true,
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
    ],
    external: ['react'],
  },
]
