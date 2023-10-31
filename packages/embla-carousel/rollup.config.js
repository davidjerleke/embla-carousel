import packageJson from './package.json'
import {
  PACKAGE_FORMATS,
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  babel,
  typescript,
  resolve,
  terser,
  createBuildPath,
  kebabToPascalCase
} from '../../rollup.config'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: createBuildPath(packageJson, PACKAGE_FORMATS.CJS),
        format: PACKAGE_FORMATS.CJS,
        strict: true,
        sourcemap: true,
        exports: 'auto'
      },
      {
        file: createBuildPath(packageJson, PACKAGE_FORMATS.ESM),
        format: PACKAGE_FORMATS.ESM,
        strict: true,
        sourcemap: true
      },
      {
        file: createBuildPath(packageJson, PACKAGE_FORMATS.UMD),
        format: PACKAGE_FORMATS.UMD,
        strict: true,
        sourcemap: false,
        name: kebabToPascalCase(packageJson.name),
        plugins: [terser()]
      }
    ],
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)]
  }
]
