import { TsConfigType } from 'consts/sandbox'

export const createSandboxVanillaTsConfig = (): TsConfigType => {
  return {
    include: ['./src/**/*'],
    compilerOptions: {
      strict: true,
      module: 'commonjs',
      jsx: 'preserve',
      esModuleInterop: true,
      sourceMap: true,
      allowJs: true,
      lib: ['es6', 'dom'],
      rootDir: 'src',
      moduleResolution: 'node'
    }
  }
}
