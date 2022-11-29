import { THEME_PREFIX } from 'consts/themes'
import { getThemeFromDocument } from 'utils/getThemeFromDocument'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { SANDBOX_REGEX_THEME, SANDBOX_REGEX_TITLE } from '../sandboxRegex'

export const createSandboxReactIndexHtml = async (
  id: string,
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
}
