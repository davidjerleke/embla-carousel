import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'
import { SANDBOX_REGEX_IMAGE_IMPORT } from '../sandboxRegex'

export const createSandboxReactImages = async (
  language: SandboxLanguageType,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let imageByIndex: SandboxModuleType

  if (isTypeScript) {
    imageByIndex = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/imageByIndex.ts'
    )
  } else {
    imageByIndex = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/imageByIndex.js'
    )
  }

  return imageByIndex.default.replace(SANDBOX_REGEX_IMAGE_IMPORT, '..')
}
