import { EmblaOptionsType } from 'embla-carousel-react'
import { SANDBOX_REGEX_OPTIONS } from '../sandboxRegex'
import { SandboxLanguageType, SandboxModuleType } from '../sandboxTypes'
import { isLanguageTypeScript } from '../sandboxUtils'

const CAROUSEL_IMPORT_REGEX = /((?<=EmblaCarousel\sfrom\s)(.*))/
const SLIDE_COUNT_REGEX = /((?<=SLIDE_COUNT\s\=\s)\d{1,})/
const LOOP_REGEX = /((?<=LOOP\s\=\s)(true|false))/

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
    .replace(LOOP_REGEX, loop.toString())
}
