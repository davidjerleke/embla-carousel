import packageJson from './package.json'
import path from 'path'
import { compileModule } from 'svelte/compiler'
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
  svelte: 'Svelte'
}

const CONFIG_GLOBALS_UMD = {
  svelte: 'Svelte'
}

export default [
  {
    input: 'src/attachment.ts',
    output: [FOLDERS.CJS, FOLDERS.ESM].map((format) => ({
      file: `${format}/${packageJson.name}-attachment.${format}.js`,
      format,
      sourcemap: true
    })),
    external: [
      ...Object.keys(CONFIG_GLOBALS_MODULE),
      'svelte/attachments',
      'svelte/internal/client'
    ],
    plugins: [
      typescript({
        ...CONFIG_TYPESCRIPT,
        tsconfig: path.join(__dirname, 'tsconfig.attachment.json')
      }),
      {
        name: 'svelte-attachment',
        transform(code, id) {
          if (!id.endsWith('.svelte.ts')) return
          const result = compileModule(code, {
            filename: id,
            generate: 'client'
          })
          return { code: result.js.code, map: result.js.map }
        }
      },
      babel(CONFIG_BABEL)
    ]
  },
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
