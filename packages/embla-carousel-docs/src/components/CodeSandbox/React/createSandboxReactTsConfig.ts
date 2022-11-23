import { TsConfigType } from '../types'

export const createSandboxReactTsConfig = (
  overrides?: TsConfigType,
): TsConfigType => {
  const tsConfig: TsConfigType = {
    include: ['./src/**/*', './declarations.d.ts'],
    compilerOptions: {
      strict: true,
      esModuleInterop: true,
      lib: ['dom', 'es2015'],
      jsx: 'react-jsx',
    },
  }

  return Object.assign({}, tsConfig, overrides)
}
