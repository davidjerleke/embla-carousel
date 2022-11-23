import { ThemeKeyType, THEME_KEYS, THEME_PREFIX } from 'consts/themes'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

export const createSandboxReactIndexHtml = async (
  title: string = '',
  themeKey: ThemeKeyType = THEME_KEYS.LIGHT,
): Promise<string> => {
  const indexHTML = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/index.html'
  )

  // get theme from document.html!

  const formattedTitle = kebabCaseToPascalCase(title, ' ')
  return indexHTML.default
    .replace('__replace_sandbox_name__', formattedTitle)
    .replace('__replace_sandbox_theme__', THEME_PREFIX + themeKey)
}
