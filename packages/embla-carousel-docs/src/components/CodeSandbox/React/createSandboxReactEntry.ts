import { EmblaOptionsType } from 'embla-carousel-react'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'
import {
  SANDBOX_REGEX_IOS_PICKER_LOOP,
  SANDBOX_REGEX_OPTIONS,
} from '../sandboxRegex'

const CAROUSEL_IMPORT_REGEX = /((?<=EmblaCarousel\sfrom\s)(.*))/
const SLIDE_COUNT_REGEX = /((?<=SLIDE_COUNT\s\=\s)\d{1,})/

export const createSandboxReactDefaultEntry = async (
  language: SandboxLanguageType,
  slides: number[],
  options: EmblaOptionsType,
): Promise<string> => {
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
    .replace(CAROUSEL_IMPORT_REGEX, '"./EmblaCarousel"')
    .replace(SLIDE_COUNT_REGEX, slides.length.toString())
    .replace(SANDBOX_REGEX_OPTIONS, JSON.stringify(options))
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
    .replace(CAROUSEL_IMPORT_REGEX, '"./EmblaCarousel"')
    .replace(SANDBOX_REGEX_IOS_PICKER_LOOP, loop.toString())
}
