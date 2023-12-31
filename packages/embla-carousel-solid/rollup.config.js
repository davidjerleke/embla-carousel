import packageJson from './package.json'
import {
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
} from '../../rollup.config'

const CONFIG_GLOBALS_MODULE = {
  ...CONFIG_GLOBALS,
  'solid-js': 'solidJs'
}

const CONFIG_GLOBALS_UMD = {
  'solid-js': 'solidJs'
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: createBuildPath(packageJson, FOLDERS.CJS),
        format: FOLDERS.CJS,
        globals: CONFIG_GLOBALS_MODULE,
        strict: true,
        sourcemap: true,
        exports: 'auto',
        plugins: resolve(CONFIG_EXTERNAL_MODULES)
      },
      {
        file: createBuildPath(packageJson, FOLDERS.ESM),
        format: FOLDERS.ESM,
        globals: CONFIG_GLOBALS_MODULE,
        strict: true,
        sourcemap: true,
        plugins: resolve(CONFIG_EXTERNAL_MODULES)
      }
    ],
    onwarn: CONFIG_EXTERNAL_MODULE_SUPPRESS,
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
    external: Object.keys(CONFIG_GLOBALS_MODULE)
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: createBuildPath(packageJson, FOLDERS.UMD),
        format: FOLDERS.UMD,
        globals: CONFIG_GLOBALS_UMD,
        strict: true,
        sourcemap: false,
        name: kebabToPascalCase(packageJson.name),
        plugins: [resolve(), terser()]
      }
    ],
    onwarn: CONFIG_EXTERNAL_MODULE_SUPPRESS,
    plugins: [
      resolve(),
      typescript(CONFIG_TYPESCRIPT),
      babel(CONFIG_BABEL),
      createNodeNextSupport()
    ],
    external: Object.keys(CONFIG_GLOBALS_UMD)
  }
]
