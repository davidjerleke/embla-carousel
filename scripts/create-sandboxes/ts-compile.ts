import ts from 'typescript'
import {
  preserveEmptyLinesEnd,
  preserveEmptyLinesStart
} from './preserve-empty-lines'

const createTsConfig = (
  overrides?: ts.TranspileOptions['compilerOptions']
): ts.TranspileOptions => {
  return {
    compilerOptions: {
      target: 99,
      useDefineForClassFields: true,
      lib: ['DOM', 'DOM.Iterable', 'ESNext'],
      allowJs: false,
      skipLibCheck: true,
      esModuleInterop: false,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: 99,
      moduleResolution: 2,
      resolveJsonModule: true,
      isolatedModules: true,
      removeComments: false,
      noEmit: false,
      emitDeclarationOnly: false,
      ...overrides
    }
  }
}

export const tsCompile = (
  content: string,
  tsConfigOverrides?: ts.TranspileOptions['compilerOptions']
): string => {
  const tsConfig = createTsConfig(tsConfigOverrides)
  const typeScriptContent = preserveEmptyLinesStart(content)
  const javaScriptContent = ts.transpileModule(typeScriptContent, tsConfig)
  return preserveEmptyLinesEnd(javaScriptContent.outputText)
}
