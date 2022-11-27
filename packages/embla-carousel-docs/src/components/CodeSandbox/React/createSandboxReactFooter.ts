import { URLS } from 'consts/urls'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'
import { SANDBOX_REGEX_REPOSITORY_URL } from '../sandboxRegex'

export const createSandboxReactFooter = async (
  language: SandboxLanguageType,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let footer: SandboxModuleType

  if (isTypeScript) {
    footer = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Footer.tsx'
    )
  } else {
    footer = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Footer.jsx'
    )
  }

  return footer.default.replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
}
