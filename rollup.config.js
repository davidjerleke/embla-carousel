import packageJson from './packages/embla-carousel/package.json'
import localTypescript from 'typescript'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const kebabToPascalCase = (string = '') =>
  string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase(),
  )

const CONFIG_GLOBALS = {
  [packageJson.name]: kebabToPascalCase(packageJson.name),
}

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
}

const CONFIG_TYPESCRIPT = {
  tsconfig: 'tsconfig.json',
  typescript: localTypescript,
}

export {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  CONFIG_GLOBALS,
  babel,
  typescript,
  resolve,
  terser,
  kebabToPascalCase,
}
