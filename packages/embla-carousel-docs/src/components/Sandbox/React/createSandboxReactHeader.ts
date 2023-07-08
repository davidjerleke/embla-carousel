import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { SandboxModuleType } from 'consts/sandbox'
import { SANDBOX_REGEX_TITLE } from 'consts/sandbox'

export const createSandboxReactHeader = async (
  isTypeScript: boolean,
  id: string
): Promise<string> => {
  let header: SandboxModuleType

  if (isTypeScript) {
    header = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/Header.tsx'
    )
  } else {
    header = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/Header.jsx'
    )
  }

  const formattedTitle = kebabCaseToPascalCase(id, ' ')
  return header.default.replace(SANDBOX_REGEX_TITLE, formattedTitle)
}
