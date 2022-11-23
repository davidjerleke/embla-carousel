import {
  isLanguageTypeScript,
  SandboxLanguageType,
  SandboxModuleType,
} from '../types'

const IMAGE_PATH_IN_IMPORT_REGEX = /(?<=from\s')(.*)(?=\/images)/g

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

  return imageByIndex.default.replace(IMAGE_PATH_IN_IMPORT_REGEX, '..')
}
