import { kebabCaseToPascalCase } from 'utils/stringCasing'
import { SandboxModuleType, SandboxReactExtensionType } from 'consts/sandbox'
import { SANDBOX_REGEX_TITLE } from 'consts/sandbox'

export const createSandboxReactHeader = async (
  reactScriptExtension: SandboxReactExtensionType,
  id: string
): Promise<string> => {
  const header: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Header.${reactScriptExtension}`
  )
  const formattedTitle = kebabCaseToPascalCase(id, ' ')
  return header.default.replace(SANDBOX_REGEX_TITLE, formattedTitle)
}
