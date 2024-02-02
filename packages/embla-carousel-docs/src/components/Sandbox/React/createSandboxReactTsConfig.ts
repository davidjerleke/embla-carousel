import { TsConfigType } from 'consts/sandbox'

export const createSandboxReactTsConfig = (): TsConfigType => {
  return {
    include: ['./src/**/*'],
    compilerOptions: {
      strict: true,
      esModuleInterop: true,
      lib: ['es6', 'dom'],
      jsx: 'react-jsx'
    }
  }
}
