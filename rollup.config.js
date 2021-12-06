import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import localTypescript from 'typescript'

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled',
}

const CONFIG_TYPESCRIPT = {
  tsconfig: 'tsconfig.json',
  typescript: localTypescript,
}

const kebabCaseToPascalCase = (string = '') => {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase(),
  )
}

export {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  babel,
  typescript,
  resolve,
  terser,
  kebabCaseToPascalCase,
}
