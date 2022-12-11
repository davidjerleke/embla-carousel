import { EmblaOptionsType } from 'embla-carousel-react'
import {
  injectSandboxIosPickerLoop,
  injectSandboxOptions,
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS,
} from '../sandboxUtils'

export const createSandboxVanillaOptions = (
  carouselScript: string,
  options: EmblaOptionsType,
): string => {
  const loop = options?.loop
  return carouselScript
    .replace(SANDBOX_REGEX_OPTIONS, injectSandboxOptions(options))
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, injectSandboxIosPickerLoop(loop))
}
