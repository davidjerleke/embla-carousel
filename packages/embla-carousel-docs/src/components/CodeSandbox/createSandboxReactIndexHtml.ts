import { ThemeKeyType, THEME_KEYS, THEME_PREFIX } from 'consts/themes'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

const indexHTML: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/index.html').default

export const createSandboxReactIndexHtml = (
  title: string = '',
  themeKey: ThemeKeyType = THEME_KEYS.LIGHT,
): string => {
  const formattedTitle = kebabCaseToPascalCase(title, ' ')
  return indexHTML
    .replace('__replace_sandbox_name__', formattedTitle)
    .replace('__replace_sandbox_theme__', THEME_PREFIX + themeKey)
}
