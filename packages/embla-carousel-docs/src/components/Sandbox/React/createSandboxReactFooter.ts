import { URLS } from 'consts/urls'
import { SandboxModuleType, SandboxReactExtensionType } from 'consts/sandbox'
import { SANDBOX_REGEX_REPOSITORY_URL } from 'consts/sandbox'

export const createSandboxReactFooter = async (
  reactScriptExtension: SandboxReactExtensionType
): Promise<string> => {
  const footer: SandboxModuleType = await import(
    `!!raw-loader!components/Sandbox/React/SandboxFilesDist/Footer.${reactScriptExtension}`
  )
  return footer.default.replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
}
