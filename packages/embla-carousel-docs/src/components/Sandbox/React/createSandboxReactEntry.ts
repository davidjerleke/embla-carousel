import { EmblaOptionsType } from 'embla-carousel'
import { SandboxModuleType } from 'consts/sandbox'
import { sandboxInjectIosPickerLoop, sandboxInjectOptions } from 'utils/sandbox'
import {
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS
} from 'consts/sandbox'

const CAROUSEL_IMPORT_REGEX = /import\sEmblaCarousel\sfrom\s'(.*)'/
const SLIDE_COUNT_REGEX = /const\sSLIDE_COUNT\s=\s\d{1,}/
const CAROUSEL_IMPORT_REPLACE = 'import EmblaCarousel from "./EmblaCarousel"'

export const createSandboxReactDefaultEntry = async (
  isTypeScript: boolean,
  slides: number[],
  options: EmblaOptionsType
): Promise<string> => {
  const slideCount = slides.length.toString()
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselDefaultEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselDefaultEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, sandboxInjectOptions(options))
    .replace(SLIDE_COUNT_REGEX, (match) => match.replace(/\d{1,}/, slideCount))
}

export const createSandboxReactIosPickerEntry = async (
  isTypeScript: boolean,
  loop: boolean
): Promise<string> => {
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselIosPickerEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!components/Sandbox/React/SandboxFilesDist/CarouselIosPickerEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, sandboxInjectIosPickerLoop(loop))
}
