import { EmblaOptionsType } from '@vendor/embla-carousel-v8/embla-carousel'
import {
  SANDBOX_REGEX_OPTIONS,
  sandboxInjectOptions
} from '@/content/v8/sandboxes/sandbox-utils'

export function createSandboxVanillaOptions(
  carouselScript: string,
  options: EmblaOptionsType
): string {
  return carouselScript.replace(
    SANDBOX_REGEX_OPTIONS,
    sandboxInjectOptions(options)
  )
}
