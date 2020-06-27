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
    external: ['react'],
    input: {
      index: 'src/index.ts',
      'embla-carousel': 'src/vanilla/index.ts',
      'embla-carousel-react': 'src/react/index.ts',
    },
    output: [
      {
        format: 'cjs',
        name: 'EmblaCarousel',
        strict: true,
        sourcemap: true,
        dir: 'lib',
        globals: { react: 'React' },
        exports: 'named',
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
    input: {
      index: 'src/index.ts',
      'embla-carousel': 'src/vanilla/index.ts',
      'embla-carousel-react': 'src/react/index.ts',
    },
    output: [
      {
        format: 'esm',
        name: 'EmblaCarousel',
        strict: true,
        sourcemap: true,
        dir: 'lib/es',
        globals: { react: 'React' },
        exports: 'named',
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
