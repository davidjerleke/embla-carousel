import packageJson from './package.json'
import {
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
} from '../../rollup.config'

const CONFIG_GLOBALS_MODULE = {
  ...CONFIG_GLOBALS,
  react: 'React'
}

const CONFIG_GLOBALS_UMD = {
  react: 'React'
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${packageJson.name}.cjs.js`,
        format: 'cjs',
        globals: CONFIG_GLOBALS_MODULE,
        strict: true,
        sourcemap: true,
        exports: 'auto',
        plugins: resolve(CONFIG_EXTERNAL_MODULES)
      },
      {
        file: `${packageJson.name}.esm.js`,
        format: 'esm',
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
        file: `${packageJson.name}.umd.js`,
        format: 'umd',
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
