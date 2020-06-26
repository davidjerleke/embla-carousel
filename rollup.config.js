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
  customResolveOptions: {
    moduleDirectory: 'react',
  },
}

export default [
  {
    external: ['react'],
    input: {
      [`index.${DEFAULT_FORMAT}`]: 'src/index.ts',
      [`embla-carousel.${DEFAULT_FORMAT}`]: 'src/vanilla/index.ts',
      [`react.${DEFAULT_FORMAT}`]: 'src/react/index.ts',
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
    input: 'src/vanilla/index.ts',
    output: [
      {
        format: 'umd',
        name: 'EmblaCarousel',
        strict: true,
        file: 'lib/embla-carousel.js',
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
