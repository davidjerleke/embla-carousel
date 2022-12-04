import { EmblaOptionsType } from 'embla-carousel-react'
import { SANDBOX_REGEX_OPTIONS } from '../sandboxRegex'

export const createSandboxVanillaOptions = (
  carouselScript: string,
  options: EmblaOptionsType,
): string => {
  return carouselScript.replace(SANDBOX_REGEX_OPTIONS, JSON.stringify(options))
}
