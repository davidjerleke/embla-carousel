import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'

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
        file: './lib/embla-carousel.js',
        format: 'cjs',
      },
      {
        file: './lib/es/embla-carousel.js',
        format: 'esm',
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
    ],
  },
  {
    external: ['react'],
    input: 'src/react/index.ts',
    output: [
      {
        file: './lib/embla-carousel-react.js',
        format: 'cjs',
        globals: { react: 'React' },
      },
      {
        file: './lib/es/embla-carousel-react.js',
        format: 'esm',
        globals: { react: 'React' },
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
    ],
  },
  {
    input: 'src/vanilla/index.ts',
    output: [
      {
        format: 'umd',
        name: 'EmblaCarousel',
        strict: true,
        file: 'lib/browser/embla-carousel.js',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
      terser(),
    ],
  },
]
