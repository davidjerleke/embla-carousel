import { SandboxModuleType } from 'consts/sandbox'

const IMAGE_BY_INDEX_IMPORT_REGEX = /import(.*)from\s'assets/g

export const createSandboxReactImages = async (
  isTypeScript: boolean
): Promise<string> => {
  let imageByIndex: SandboxModuleType

  if (isTypeScript) {
    imageByIndex = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/imageByIndex.ts'
    )
  } else {
    imageByIndex = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/imageByIndex.js'
    )
  }
  return imageByIndex.default.replace(IMAGE_BY_INDEX_IMPORT_REGEX, (match) =>
    match.replace('assets', '..')
  )
}
