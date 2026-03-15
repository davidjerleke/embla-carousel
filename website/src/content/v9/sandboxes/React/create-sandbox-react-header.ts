import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  SandboxModuleType,
  SandboxReactExtensionType,
  SANDBOX_REGEX_TITLE
} from '@/content/v9/sandboxes/sandbox-utils'

export async function createSandboxReactHeader(
  reactScriptExtension: SandboxReactExtensionType,
  id: string
): Promise<string> {
  const header: SandboxModuleType = await import(
    `@/content/v9/sandboxes/React/SandboxFilesDist/Header.${reactScriptExtension}`
  )
  const formattedTitle = kebabCaseToPascalCase(id, ' ')
  return header.default.replace(SANDBOX_REGEX_TITLE, formattedTitle)
}
