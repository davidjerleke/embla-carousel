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

const PACKAGE_VANILLA = (process.env.BUILD !== 'development' ||
  process.env.PACKAGE === 'vanilla') && {
  input: 'src/vanilla/index.ts',
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
      format: 'umd',
      name: 'EmblaCarousel',
      file: `${packageJson.name}.umd.js`,
      strict: true,
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
}

const PACKAGE_REACT = (process.env.BUILD !== 'development' ||
  process.env.PACKAGE === 'react') && {
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
  plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
  external: ['react'],
}

const PACKAGES = [PACKAGE_VANILLA, PACKAGE_REACT].filter(Boolean)
export default PACKAGES
