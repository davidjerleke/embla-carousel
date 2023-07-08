import emblaPackageJson from 'embla-carousel/package.json'
import utilsPackageJson from 'embla-carousel-reactive-utils/package.json'
import localTypescript from 'typescript'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const kebabToPascalCase = (string = '') =>
  string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase()
  )

const CONFIG_GLOBALS = {
  [emblaPackageJson.name]: kebabToPascalCase(emblaPackageJson.name),
  [utilsPackageJson.name]: kebabToPascalCase(utilsPackageJson.name)
}

const CONFIG_EXTERNAL_MODULES = {
  moduleDirectories: ['node_modules', utilsPackageJson.name]
}

const CONFIG_EXTERNAL_MODULE_SUPPRESS = (warning, next) => {
  if (warning.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') return
  next(warning)
}

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled'
}

const CONFIG_TYPESCRIPT = {
  tsconfig: 'tsconfig.json',
  typescript: localTypescript
}

export {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  CONFIG_GLOBALS,
  CONFIG_EXTERNAL_MODULES,
  CONFIG_EXTERNAL_MODULE_SUPPRESS,
  babel,
  typescript,
  resolve,
  terser,
  kebabToPascalCase
}
