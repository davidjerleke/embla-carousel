import { THEME_PREFIX } from '@/utils/theme'
import { getThemeFromDocument } from '@/utils/get-theme-from-document'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  SANDBOX_REGEX_THEME,
  SANDBOX_REGEX_TITLE
} from '@/content/v8/sandboxes/sandbox-utils'

export async function createSandboxReactIndexHtml(id: string): Promise<string> {
  const indexHTML = await import(
    '@/content/v8/sandboxes/React/SandboxFilesDist/index.html'
  )
  const theme = THEME_PREFIX + getThemeFromDocument()
  const title = kebabCaseToPascalCase(id, ' ')
  return indexHTML.default
    .replace(SANDBOX_REGEX_THEME, theme)
    .replace(SANDBOX_REGEX_TITLE, title)
}
