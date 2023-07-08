import { TsConfigType } from 'consts/sandbox'

export const createSandboxReactTsConfig = (): TsConfigType => {
  return {
    include: ['./src/**/*', './declarations.d.ts'],
    compilerOptions: {
      strict: true,
      esModuleInterop: true,
      lib: ['dom', 'es2015'],
      jsx: 'react-jsx'
    }
  }
}
