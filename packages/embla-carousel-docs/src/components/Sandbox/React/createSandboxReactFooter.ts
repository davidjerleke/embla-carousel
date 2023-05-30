import { URLS } from 'consts/urls'
import { SandboxModuleType } from 'consts/sandbox'
import { SANDBOX_REGEX_REPOSITORY_URL } from 'consts/sandbox'

export const createSandboxReactFooter = async (
  isTypeScript: boolean
): Promise<string> => {
  let footer: SandboxModuleType

  if (isTypeScript) {
    footer = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/Footer.tsx'
    )
  } else {
    footer = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/Footer.jsx'
    )
  }

  return footer.default.replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
}
