import { EmblaOptionsType } from 'embla-carousel-react'

const EMPTY_LINE_REGEX = /^\s*\n/m
const SLIDE_COUNT_VARIABLE_REGEX = /SLIDE_COUNT = \d{1,}/

export const createSandboxReactDefaultEntry = async (
  slides: number[],
  options: EmblaOptionsType,
): Promise<string> => {
  const defaultEntryJavaScript = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.jsx'
  )
  // Add tsx too!

  return defaultEntryJavaScript.default
    .replace('./CarouselDefault', './EmblaCarousel')
    .replace(SLIDE_COUNT_VARIABLE_REGEX, `SLIDE_COUNT = ${slides.length}`)
    .replace('OPTIONS = {}', `OPTIONS = ${JSON.stringify(options)}`)
    .replace(EMPTY_LINE_REGEX, "import '../css/base.css' \n\n")
    .replace(EMPTY_LINE_REGEX, "import '../css/sandbox.css' \n\n")
    .replace(EMPTY_LINE_REGEX, "import '../css/embla.css' \n\n")
}
