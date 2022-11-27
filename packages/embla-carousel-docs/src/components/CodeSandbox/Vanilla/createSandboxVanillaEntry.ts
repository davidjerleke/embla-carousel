import { EmblaOptionsType } from 'embla-carousel-react'
import { SANDBOX_REGEX_OPTIONS } from '../sandboxRegex'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'

export const createSandboxVanillaDefaultEntry = async (
  language: SandboxLanguageType,
  options: EmblaOptionsType,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!embla-carousel-vanilla-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.ts'
    )
  } else {
    entry = await import(
      '!!raw-loader!embla-carousel-vanilla-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.js'
    )
  }

  return entry.default.replace(SANDBOX_REGEX_OPTIONS, JSON.stringify(options))
}
