import { THEME_PREFIX } from 'consts/themes'
import { getThemeFromDocument } from 'utils/getThemeFromDocument'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

export const createSandboxReactIndexHtml = async (
  id: string = '',
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  return indexHTML.default
    .replace('__replace_sandbox_theme__', theme)
    .replace('__replace_sandbox_name__', title)
}
