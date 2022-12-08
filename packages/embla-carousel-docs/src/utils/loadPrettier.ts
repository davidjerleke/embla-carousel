import prettierrc from '../../.prettierrc'
import { Options as PretterOptions } from 'prettier'

const PRETTIER_CONFIG = <PretterOptions>prettierrc

export const loadPrettier = async () => {
  const [prettier, htmlParser, cssParser, babelParser] = await Promise.all([
    import('prettier'),
    import('prettier/parser-html'),
    import('prettier/parser-postcss'),
    import('prettier/parser-babel'),
  ])

  const prettierHtmlParser: PretterOptions = {
    ...PRETTIER_CONFIG,
    parser: 'html',
    plugins: [htmlParser],
  }

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

  const prettierBabeTsParser: PretterOptions = {
    ...PRETTIER_CONFIG,
    parser: 'babel-ts',
    plugins: [babelParser],
  }

  const prettierFormatSafe = (
    subject: string,
    parser: PretterOptions,
  ): string => {
    let formattedString = ''
    try {
      formattedString = prettier.format(subject, parser)
    } catch (error) {
      console.warn(
        'Pretter was not able to format a file caused by invalid syntax',
        error,
      )
    }
    return formattedString
  }

  const formatHtml = (html: string): string =>
    prettierFormatSafe(html, prettierHtmlParser)

  const formatCss = (css: string): string =>
    prettierFormatSafe(css, prettierCssParser)

  const formatJs = (js: string): string =>
    prettierFormatSafe(js, prettierBabelParser)

  const formatTs = (ts: string): string =>
    prettierFormatSafe(ts, prettierBabeTsParser)

  return {
    prettier,
    prettierConfig: PRETTIER_CONFIG,
    formatHtml,
    formatCss,
    formatJs,
    formatTs,
  }
}
