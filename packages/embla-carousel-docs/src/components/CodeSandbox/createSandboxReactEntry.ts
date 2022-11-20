import { EmblaOptionsType } from 'embla-carousel-react'

const defaultEntry: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefaultEntry.jsx').default
// Add tsx too!

const EMPTY_LINE_REGEX = /^\s*\n/m
const SLIDE_COUNT_VARIABLE_REGEX = /SLIDE_COUNT = \d{1,}/

export const createSandboxReactDefaultEntry = (
  slideCount: number,
  options: EmblaOptionsType,
): string => {
  return defaultEntry
    .replace('./CarouselDefault', './EmblaCarousel')
    .replace(SLIDE_COUNT_VARIABLE_REGEX, `SLIDE_COUNT = ${slideCount}`)
    .replace('OPTIONS = {}', `OPTIONS = ${JSON.stringify(options)}`)
    .replace(EMPTY_LINE_REGEX, "import '../css/base.css' \n\n")
    .replace(EMPTY_LINE_REGEX, "import '../css/sandbox.css' \n\n")
    .replace(EMPTY_LINE_REGEX, "import '../css/embla.css' \n\n")
}
