import { EmblaOptionsType } from 'embla-carousel'
import { sandboxInjectOptions } from 'utils/sandbox'
import { SANDBOX_REGEX_OPTIONS } from 'consts/sandbox'

export const createSandboxVanillaOptions = (
  carouselScript: string,
  options: EmblaOptionsType
): string => {
  return carouselScript.replace(
    SANDBOX_REGEX_OPTIONS,
    sandboxInjectOptions(options)
  )
}
