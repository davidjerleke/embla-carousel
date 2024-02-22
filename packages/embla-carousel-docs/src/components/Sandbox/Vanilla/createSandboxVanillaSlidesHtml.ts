import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { SandboxModuleType } from 'consts/sandbox'

const SANDBOX_SLIDE_NR_REGEX = /__replace_sandbox_slide_nr__/g
const SANDBOX_SLIDES = /__replace_sandbox_slides__/

export const createSandboxVanillaSlidesHtml = (
  settings: SandboxGeneratorSettingsType,
  slideHTML: SandboxModuleType,
  carouselHtml: string
): string => {
  const slidesHtml = settings.slideList.map((index) => {
    const slideNumber = (index + 1).toString()
    return slideHTML.default.replace(SANDBOX_SLIDE_NR_REGEX, slideNumber)
  })

  return carouselHtml.replace(SANDBOX_SLIDES, slidesHtml.join(''))
}
