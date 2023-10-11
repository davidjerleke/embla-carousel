import packageJson from './package.json'
import {
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
} from '../../rollup.config'

const CONFIG_GLOBALS_MODULE = {
  ...CONFIG_GLOBALS,
  svelte: 'Svelte'
}

const CONFIG_GLOBALS_UMD = {
  svelte: 'Svelte'
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: createBuildPath(packageJson, PACKAGE_FORMATS.CJS),
        format: PACKAGE_FORMATS.CJS,
        globals: CONFIG_GLOBALS_MODULE,
        strict: true,
        sourcemap: true,
        exports: 'auto',
        plugins: resolve(CONFIG_EXTERNAL_MODULES)
      },
      {
        file: createBuildPath(packageJson, PACKAGE_FORMATS.ESM),
        format: PACKAGE_FORMATS.ESM,
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
        file: createBuildPath(packageJson, PACKAGE_FORMATS.UMD),
        format: PACKAGE_FORMATS.UMD,
        globals: CONFIG_GLOBALS_UMD,
        strict: true,
        sourcemap: false,
        name: kebabToPascalCase(packageJson.name),
        plugins: [resolve(), terser()]
      }
    ],
    onwarn: CONFIG_EXTERNAL_MODULE_SUPPRESS,
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
    external: Object.keys(CONFIG_GLOBALS_UMD)
  }
]
