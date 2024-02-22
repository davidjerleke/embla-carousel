import { THEME_PREFIX } from 'consts/themes'
import { getThemeFromDocument } from 'utils/getThemeFromDocument'
import { kebabCaseToPascalCase } from 'utils/stringCasing'
import { SANDBOX_REGEX_THEME, SANDBOX_REGEX_TITLE } from 'consts/sandbox'

export const createSandboxReactIndexHtml = async (
  id: string
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!components/Sandbox/React/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
}
