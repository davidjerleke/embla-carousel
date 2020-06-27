import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'

const DEFAULT_FORMAT = 'cjs'

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
const resolveConfig = {
  // jsnext: true,
  // main: true,
  // browser: true,
  // customResolveOptions: {
  //   moduleDirectory: 'react',
  // },
}

export default [
  // {
  //   external: ['react'],
  //   input: 'src/index.ts',
  //   output: [
  //     {
  //       format: 'iife',
  //       name: 'EmblaCarousel',
  //       strict: true,
  //       file: 'lib/index.js',
  //       sourcemap: true,
  //     },
  //   ],
  //   plugins: [
  //     resolve(resolveConfig),
  //     commonjs(),
  //     typescript(typescriptConfig),
  //     babel(babelConfig),
  //     // terser(),
  //   ],
  // },
  {
    external: ['react'],
    input: {
      [`index`]: 'src/index.ts',
      [`embla-carousel`]: 'src/vanilla/index.ts',
      [`react`]: 'src/react/index.ts',
    },
    output: [
      {
        format: DEFAULT_FORMAT,
        name: 'EmblaCarousel',
        strict: true,
        sourcemap: true,
        dir: 'lib',
        globals: { react: 'React' },
      },
    ],
    plugins: [
      resolve(resolveConfig),
      typescript(typescriptConfig),
      babel(babelConfig),
    ],
  },
  {
    external: ['react'],
    input: {
      [`index`]: 'src/index.ts',
      [`embla-carousel`]: 'src/vanilla/index.ts',
      [`react`]: 'src/react/index.ts',
    },
    output: [
      {
        format: 'esm',
        name: 'EmblaCarousel',
        strict: true,
        sourcemap: true,
        dir: 'lib/es',
        globals: { react: 'React' },
      },
    ],
    plugins: [
      resolve(resolveConfig),
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
        file: 'lib/embla-carousel.browser.js',
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
