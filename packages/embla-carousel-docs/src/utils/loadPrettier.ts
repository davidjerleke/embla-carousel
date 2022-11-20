import prettierrc from '../../.prettierrc'
import { Options as PretterOptions } from 'prettier'

const PRETTIER_CONFIG = <PretterOptions>prettierrc

export const loadPrettier = async () => {
  const prettier = await import('prettier')
  const cssParser = await import('prettier/parser-postcss')
  const babelParser = await import('prettier/parser-babel')

  const prettierCssParser: PretterOptions = {
    ...PRETTIER_CONFIG,
    parser: 'css',
    plugins: [cssParser],
  }

  const prettierBabelParser: PretterOptions = {
    ...PRETTIER_CONFIG,
    parser: 'babel',
    plugins: [babelParser],
  }

  const formatCss = (css: string): string =>
    prettier.format(css, prettierCssParser)

  const formatJs = (js: string): string =>
    prettier.format(js, prettierBabelParser)

  return {
    prettier,
    prettierConfig: PRETTIER_CONFIG,
    formatCss,
    formatJs,
  }
}
