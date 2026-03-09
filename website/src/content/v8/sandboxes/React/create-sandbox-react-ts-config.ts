import { TsConfigType } from '@/content/v8/sandboxes/sandbox-utils'

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
