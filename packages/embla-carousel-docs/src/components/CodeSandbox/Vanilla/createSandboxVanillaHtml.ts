import { SANDBOX_IMAGE_URLS } from '../sandboxImages'

const SANDBOX_SLIDE_TEMPLATE_TEXT_REGEX = /__replace_sandbox_slide_template__/g

const SANDBOX_SLIDE_TEMPLATE_REGEX =
  /__replace_sandbox_slide_template__((.|\n)*)__replace_sandbox_slide_template__/g

const SANDBOX_SLIDES_REGEX = /__replace_sandbox_slides__/g

export const createSandboxVanillaDefaultHtml = (
  slides: number[],
  carouselHtml: string,
): string => {
  const slidesTemplate =
    carouselHtml
      .match(SANDBOX_SLIDE_TEMPLATE_REGEX)
      ?.map((match) =>
        match.replace(SANDBOX_SLIDE_TEMPLATE_TEXT_REGEX, ''),
      )[0] || ''

  const slidesHtml = slides
    .map((_, index) => {
      return slidesTemplate
        .replace(/__replace_sandbox_slide_index__/g, (index + 1).toString())
        .replace(
          /__replace_sandbox_slide_img__/g,
          `src/images/slide-${(index % SANDBOX_IMAGE_URLS.length) + 1}.jpg`,
        )
    })
    .join('')

  const newHtml = carouselHtml
    .replace(SANDBOX_SLIDE_TEMPLATE_REGEX, '')
    .replace(SANDBOX_SLIDES_REGEX, slidesHtml)

  return newHtml
}
