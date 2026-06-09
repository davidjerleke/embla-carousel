import { TsConfigType } from '@/content/v9/sandboxes/sandbox-utils'

export function createSandboxReactTsConfig(): TsConfigType {
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
