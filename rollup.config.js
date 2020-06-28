import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'
import copy from 'rollup-plugin-copy'

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
const copyConfig = {
  targets: [
    {
      src: 'src/index.js',
      dest: 'lib',
    },
    {
      src: 'src/index.esm.js',
      dest: 'lib/esm',
      rename: (_, extension) => `index.${extension}`,
    },
  ],
}

export default [
  {
    input: 'src/vanilla/index.ts',
    output: [
      {
        file: './lib/embla-carousel.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './lib/esm/embla-carousel.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript(typescriptConfig),
      babel(babelConfig),
      copy(copyConfig),
    ],
  },
  {
    external: ['react'],
    input: 'src/react/index.ts',
    output: [
      {
        file: './lib/embla-carousel-react.js',
        format: 'cjs',
        strict: true,
        globals: { react: 'React' },
        sourcemap: true,
      },
      {
        file: './lib/esm/embla-carousel-react.js',
        format: 'esm',
        strict: true,
        globals: { react: 'React' },
        sourcemap: true,
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
