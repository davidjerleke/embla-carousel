import path from 'path'
import emblaPackageJson from 'embla-carousel/package.json'
import utilsPackageJson from 'embla-carousel-reactive-utils/package.json'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

function kebabToPascalCase(string = '') {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase()
  )
}

function createBuildPath(packageJson, format) {
  if (format === 'umd') return `${packageJson.name}.${format}.js`
  return `${format}/${packageJson.name}.${format}.js`
}

function CONFIG_EXTERNAL_MODULE_SUPPRESS(warning, next) {
  if (warning.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') return
  next(warning)
}

const PACKAGE_FORMATS = {
  ESM: 'esm',
  CJS: 'cjs',
  UMD: 'umd'
}

const CONFIG_GLOBALS = {
  [emblaPackageJson.name]: kebabToPascalCase(emblaPackageJson.name),
  [utilsPackageJson.name]: kebabToPascalCase(utilsPackageJson.name)
}

const CONFIG_EXTERNAL_MODULES = {
  moduleDirectories: ['node_modules', utilsPackageJson.name]
}

const CONFIG_BABEL = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: 'node_modules/**',
  babelHelpers: 'bundled'
}

const CONFIG_TYPESCRIPT = {
  tsconfig: path.join(__dirname, 'tsconfig.json')
}

export {
  PACKAGE_FORMATS,
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  CONFIG_GLOBALS,
  CONFIG_EXTERNAL_MODULES,
  CONFIG_EXTERNAL_MODULE_SUPPRESS,
  babel,
  typescript,
  resolve,
  terser,
  createBuildPath,
  kebabToPascalCase
}
