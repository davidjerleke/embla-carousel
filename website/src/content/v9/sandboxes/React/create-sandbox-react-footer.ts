import { URLS } from '@/utils/urls'
import {
  SandboxModuleType,
  SandboxReactExtensionType,
  SANDBOX_REGEX_REPOSITORY_URL
} from '@/content/v9/sandboxes/sandbox-utils'

export async function createSandboxReactFooter(
  reactScriptExtension: SandboxReactExtensionType
): Promise<string> {
  const footer: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Footer.${reactScriptExtension}`
  )
  return footer.default.replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
}
