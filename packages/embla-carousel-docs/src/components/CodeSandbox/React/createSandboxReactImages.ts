import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'

const IMAGE_BY_INDEX_IMPORT_REGEX = /import(.*)from\s'assets/g

export const createSandboxReactImages = async (
  language: SandboxLanguageType,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let imageByIndex: SandboxModuleType

  if (isTypeScript) {
    imageByIndex = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/imageByIndex.ts'
    )
  } else {
    imageByIndex = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/imageByIndex.js'
    )
  }
  return imageByIndex.default.replace(IMAGE_BY_INDEX_IMPORT_REGEX, (match) =>
    match.replace('assets', '..'),
  )
}
