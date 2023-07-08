import { EmblaOptionsType } from 'embla-carousel-react'
import { sandboxInjectIosPickerLoop, sandboxInjectOptions } from 'utils/sandbox'
import {
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS
} from 'consts/sandbox'

export const createSandboxVanillaOptions = (
  carouselScript: string,
  options: EmblaOptionsType
): string => {
  const loop = options?.loop
  return carouselScript
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, sandboxInjectIosPickerLoop(loop))
}
