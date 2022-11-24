import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import {
  isLanguageTypeScript,
  SandboxLanguageType,
  SandboxModuleType,
} from '../types'

export const createSandboxReactHeader = async (
  language: SandboxLanguageType,
  id: string = '',
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let header: SandboxModuleType

  if (isTypeScript) {
    header = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Header.tsx'
    )
  } else {
    header = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Header.jsx'
    )
  }

  const formattedTitle = kebabCaseToPascalCase(id, ' ')
  return header.default.replace('__replace_sandbox_name__', formattedTitle)
}
