import { URLS } from 'consts/urls'
import {
  isLanguageTypeScript,
  SandboxLanguageType,
  SandboxModuleType,
} from '../types'

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

  return footer.default.replace('__replace_repository_url__', URLS.GITHUB_ROOT)
}
