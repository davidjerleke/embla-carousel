import packageJson from './package.json'
import {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  CONFIG_GLOBALS,
  babel,
  typescript,
  resolve,
  terser,
  kebabToPascalCase,
} from '../../rollup.config'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${packageJson.name}.cjs.js`,
        format: 'cjs',
        globals: CONFIG_GLOBALS,
        strict: true,
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: `${packageJson.name}.esm.js`,
        format: 'esm',
        globals: CONFIG_GLOBALS,
        strict: true,
        sourcemap: true,
      },
      {
        file: `${packageJson.name}.umd.js`,
        format: 'umd',
        globals: CONFIG_GLOBALS,
        strict: true,
        sourcemap: false,
        name: kebabToPascalCase(packageJson.name),
        plugins: [terser()],
      },
    ],
    external: Object.keys(CONFIG_GLOBALS),
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
  },
]
