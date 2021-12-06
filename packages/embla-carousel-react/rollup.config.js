import packageJson from './package.json'
import {
  CONFIG_BABEL,
  CONFIG_TYPESCRIPT,
  babel,
  typescript,
  resolve,
  terser,
  kebabCaseToPascalCase,
} from '../../rollup.config'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${packageJson.name}.js`,
        format: 'cjs',
        globals: { react: 'React' },
        strict: true,
        sourcemap: true,
        exports: 'auto',
      },
      {
        file: `${packageJson.name}.esm.js`,
        format: 'esm',
        globals: { react: 'React' },
        strict: true,
        sourcemap: true,
      },
      {
        file: `${packageJson.name}.umd.js`,
        format: 'umd',
        globals: { react: 'React' },
        strict: true,
        sourcemap: false,
        name: kebabCaseToPascalCase(packageJson.name),
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), typescript(CONFIG_TYPESCRIPT), babel(CONFIG_BABEL)],
    external: ['react'],
  },
]
