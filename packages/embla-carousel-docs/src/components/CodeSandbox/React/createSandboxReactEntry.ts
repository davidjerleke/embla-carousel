import { EmblaOptionsType } from 'embla-carousel-react'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import {
  injectSandboxIosPickerLoop,
  injectSandboxOptions,
  isLanguageTypeScript,
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS,
} from '../sandboxUtils'

const CAROUSEL_IMPORT_REGEX = /import\sEmblaCarousel\sfrom\s'(.*)'/
const SLIDE_COUNT_REGEX = /const\sSLIDE_COUNT\s=\s\d{1,}/
const CAROUSEL_IMPORT_REPLACE = 'import EmblaCarousel from "./EmblaCarousel"'

export const createSandboxReactDefaultEntry = async (
  language: SandboxLanguageType,
  slides: number[],
  options: EmblaOptionsType,
): Promise<string> => {
  const slideCount = slides.length.toString()
  const isTypeScript = isLanguageTypeScript(language)
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselDefaultEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselDefaultEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_OPTIONS, injectSandboxOptions(options))
    .replace(SLIDE_COUNT_REGEX, (match) => match.replace(/\d{1,}/, slideCount))
}

export const createSandboxReactIosPickerEntry = async (
  language: SandboxLanguageType,
  loop: boolean,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselIosPickerEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/CarouselIosPickerEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, CAROUSEL_IMPORT_REPLACE)
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, injectSandboxIosPickerLoop(loop))
}
