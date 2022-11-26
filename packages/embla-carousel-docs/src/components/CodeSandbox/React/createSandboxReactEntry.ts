import { EmblaOptionsType } from 'embla-carousel-react'
import {
  isLanguageTypeScript,
  SandboxLanguageType,
  SandboxModuleType,
} from '../types'

const CAROUSEL_IMPORT_REGEX = /((?<=EmblaCarousel\sfrom\s)(.*))/
const SLIDE_COUNT_REGEX = /((?<=SLIDE_COUNT\s\=\s)\d{1,})/
const LOOP_REGEX = /((?<=LOOP\s\=\s)(true|false))/
const OPTIONS_REGEX =
  /((?<=EmblaOptionsType\s\=\s)(.*))|((?<=OPTIONS\s\=\s)(.*))/

export const createSandboxReactDefaultEntry = async (
  language: SandboxLanguageType,
  slides: number[],
  options: EmblaOptionsType,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, '"./EmblaCarousel"')
    .replace(SLIDE_COUNT_REGEX, slides.length.toString())
    .replace(OPTIONS_REGEX, JSON.stringify(options))
}

export const createSandboxReactIosPickerEntry = async (
  language: SandboxLanguageType,
  loop: boolean,
): Promise<string> => {
  const isTypeScript = isLanguageTypeScript(language)
  let entry: SandboxModuleType

  if (isTypeScript) {
    entry = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPickerEntry.tsx'
    )
  } else {
    entry = await import(
      '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselIosPickerEntry.jsx'
    )
  }

  return entry.default
    .replace(CAROUSEL_IMPORT_REGEX, '"./EmblaCarousel"')
    .replace(LOOP_REGEX, loop.toString())
}
