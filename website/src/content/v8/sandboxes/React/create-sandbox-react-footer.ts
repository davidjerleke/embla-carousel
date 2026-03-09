import { GLOBAL_DATA } from '@/utils/global-data'
import {
  SandboxModuleType,
  SandboxReactExtensionType,
  SANDBOX_REGEX_REPOSITORY_URL
} from '@/content/v8/sandboxes/sandbox-utils'

export async function createSandboxReactFooter(
  reactScriptExtension: SandboxReactExtensionType
): Promise<string> {
  const footer: SandboxModuleType = await import(
    `@/content/v8/sandboxes/React/SandboxFilesDist/Footer.${reactScriptExtension}`
  )
  return footer.default.replace(
    SANDBOX_REGEX_REPOSITORY_URL,
    GLOBAL_DATA.URLS.GITHUB_ROOT
  )
}
