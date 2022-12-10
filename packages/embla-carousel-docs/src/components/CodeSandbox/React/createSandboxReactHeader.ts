import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript, SANDBOX_REGEX_TITLE } from '../sandboxUtils'

export const createSandboxReactHeader = async (
  language: SandboxLanguageType,
  id: string,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let header: SandboxModuleType

  if (isTypeScript) {
    header = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Header.tsx'
    )
  } else {
    header = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/Header.jsx'
    )
  }

  const formattedTitle = kebabCaseToPascalCase(id, ' ')
  return header.default.replace(SANDBOX_REGEX_TITLE, formattedTitle)
}
