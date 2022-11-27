import { THEME_PREFIX } from 'consts/themes'
import { URLS } from 'consts/urls'
import { getThemeFromDocument } from 'utils/getThemeFromDocument'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { SandboxVanillaExtensionType } from '../sandboxTypes'
import { SANDBOX_IMAGE_URLS } from '../sandboxImages'
import {
  SANDBOX_REGEX_LANGUAGE_EXTENSION,
  SANDBOX_REGEX_REPOSITORY_URL,
  SANDBOX_REGEX_THEME,
  SANDBOX_REGEX_TITLE,
} from '../sandboxRegex'

const SANDBOX_SLIDE_TEMPLATE_TEXT_REGEX = /__replace_sandbox_slide_template__/g

const SANDBOX_SLIDE_TEMPLATE_REGEX =
  /__replace_sandbox_slide_template__((.|\n)*)__replace_sandbox_slide_template__/g

const SANDBOX_SLIDES_REGEX = /__replace_sandbox_slides__/g

export const createSandboxVanillaDefaultHtml = async (
  id: string = '',
  languageExtension: SandboxVanillaExtensionType,
  slides: number[],
  html: string,
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!embla-carousel-vanilla-sandboxes/src/SandboxFilesDist/index.html'
  )

  const slidesTemplate =
    html
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

  const newHtml = html
    .replace(SANDBOX_SLIDE_TEMPLATE_REGEX, '')
    .replace(SANDBOX_SLIDES_REGEX, slidesHtml)

  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
    .replace(SANDBOX_REGEX_LANGUAGE_EXTENSION, languageExtension)
    .replace(SANDBOX_REGEX_REPOSITORY_URL, URLS.GITHUB_ROOT)
    .replace(/__replace_sandbox_code__/g, newHtml)
}
