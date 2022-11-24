import { EmblaOptionsType } from 'embla-carousel-react'
import {
  isLanguageTypeScript,
  SandboxLanguageType,
  SandboxModuleType,
} from '../types'

const FIRST_EMPTY_LINE_REGEX = /^\s*\n/m
const SLIDE_COUNT_REGEX = /SLIDE_COUNT = \d{1,}/
const OPTIONS_REGEX =
  /((?<=EmblaOptionsType\s\=\s)(.*))|((?<=OPTIONS\s\=\s)(.*))/
const CAROUSEL_IMPORT_REGEX = /(?<=.\/)CarouselDefault/

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
    .replace(CAROUSEL_IMPORT_REGEX, 'EmblaCarousel')
    .replace(SLIDE_COUNT_REGEX, `SLIDE_COUNT = ${slides.length}`)
    .replace(OPTIONS_REGEX, JSON.stringify(options))
    .replace(FIRST_EMPTY_LINE_REGEX, "import '../css/base.css' \n\n")
    .replace(FIRST_EMPTY_LINE_REGEX, "import '../css/sandbox.css' \n\n")
    .replace(FIRST_EMPTY_LINE_REGEX, "import '../css/embla.css' \n\n")
}
