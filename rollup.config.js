import fs from 'fs'
import path from 'path'
import emblaPackageJson from 'embla-carousel/package.json'
import utilsPackageJson from 'embla-carousel-reactive-utils/package.json'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const FOLDERS = {
  ESM: 'esm',
  CJS: 'cjs',
  UMD: 'umd',
  OUT: './'
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

function CONFIG_EXTERNAL_MODULE_SUPPRESS(warning, next) {
  if (warning.code === 'INPUT_HOOK_IN_OUTPUT_PLUGIN') return
  next(warning)
}

function kebabToPascalCase(string = '') {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, '').toUpperCase()
  )
}

function createBuildPath(packageJson, format) {
  const fileName = `${packageJson.name}.${format}.js`
  if (format === 'umd') return path.join(FOLDERS.OUT, fileName)
  return path.join(FOLDERS.OUT, format, fileName)
}

function createNodeNextSupportForPackage() {
  const workspacePath = process.cwd()
  const packageJsonPath = path.join(workspacePath, 'package.json')
  const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

  if (!workspacePackageJson) return

  const outFolder = path.join(workspacePath, FOLDERS.OUT)
  const esmFolder = path.join(workspacePath, FOLDERS.OUT, FOLDERS.ESM)
  const cjsFolder = path.join(workspacePath, FOLDERS.OUT, FOLDERS.CJS)

  const packageJson = JSON.parse(workspacePackageJson)
  const packageJsonMain = {
    ...packageJson,
    files: [
      'embla-carousel*',
      'components/**/*',
      'index.d.ts',
      'esm/**/*',
      'cjs/**/*'
    ],
    exports: {
      './package.json': './package.json',
      '.': {
        import: {
          types: `./${FOLDERS.ESM}/index.d.ts`,
          default: `./${FOLDERS.ESM}/${packageJson.name}.${FOLDERS.ESM}.js`
        },
        require: {
          types: `./${FOLDERS.CJS}/index.d.ts`,
          default: `./${FOLDERS.CJS}/${packageJson.name}.${FOLDERS.CJS}.js`
        }
      }
    }
  }

  delete packageJson.scripts
  delete packageJson.exports

  const files = ['embla-carousel*', 'components/**/*', 'index.d.ts']
  const packageJsonEsm = {
    ...packageJson,
    files,
    type: 'module'
  }
  const packageJsonCjs = {
    ...packageJson,
    files,
    type: 'commonjs'
  }

  if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder)
  if (!fs.existsSync(esmFolder)) fs.mkdirSync(esmFolder)
  if (!fs.existsSync(cjsFolder)) fs.mkdirSync(cjsFolder)

  fs.writeFileSync(
    path.join(outFolder, 'package.json'),
    JSON.stringify(packageJsonMain, null, '\t')
  )

  fs.writeFileSync(
    path.join(esmFolder, 'package.json'),
    JSON.stringify(packageJsonEsm, null, '\t')
  )

  fs.writeFileSync(
    path.join(cjsFolder, 'package.json'),
    JSON.stringify(packageJsonCjs, null, '\t')
  )

  const esmTypesFilePath = `${esmFolder}/index.d.ts`
  const esmTypesFile = fs.readFileSync(esmTypesFilePath, 'utf-8')
  const esmTypesFileWithExtensions = esmTypesFile.replace(
    /from\s'(.*)';/g,
    (match) => match.replace(/';/g, `.ts';`)
  )
  fs.writeFileSync(esmTypesFilePath, esmTypesFileWithExtensions)
}

function createNodeNextSupport() {
  return {
    name: 'createNodeNextSupport',
    closeBundle: createNodeNextSupportForPackage
  }
}

export {
  FOLDERS,
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
  kebabToPascalCase,
  createNodeNextSupport
}
