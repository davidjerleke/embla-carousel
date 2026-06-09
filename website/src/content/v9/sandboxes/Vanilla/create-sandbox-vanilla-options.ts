import { EmblaOptionsType } from 'embla-carousel'
import {
  SANDBOX_REGEX_OPTIONS,
  sandboxInjectOptions
} from '@/content/v9/sandboxes/sandbox-utils'

export function createSandboxVanillaOptions(
  carouselScript: string,
  options: EmblaOptionsType
): string {
  return carouselScript.replace(
    SANDBOX_REGEX_OPTIONS,
    sandboxInjectOptions(options)
  )
}
