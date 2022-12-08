import { EmblaOptionsType } from 'embla-carousel-react'
import {
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS,
} from '../sandboxRegex'

export const createSandboxVanillaOptions = (
  carouselScript: string,
  options: EmblaOptionsType,
): string => {
  const iosPickerLoop = options?.loop || false
  return carouselScript
    .replace(SANDBOX_REGEX_OPTIONS, JSON.stringify(options))
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, iosPickerLoop.toString())
}
