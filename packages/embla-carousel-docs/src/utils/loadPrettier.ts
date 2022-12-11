import prettierrc from '../../.prettierrc'
import { Options as PretterOptions } from 'prettier'

type LoadPrettierType = {
  prettierConfig: PretterOptions
  formatHtml: (html: string) => string
  formatCss: (css: string) => string
  formatJs: (js: string) => string
  formatTs: (ts: string) => string
}

const PRETTIER_CONFIG = <PretterOptions>prettierrc

export const loadPrettier = async (): Promise<LoadPrettierType> => {
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
      console.warn('Prettier was not able to format file', error) // eslint-disable-line no-console
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
    prettierConfig: PRETTIER_CONFIG,
    formatHtml,
    formatCss,
    formatJs,
    formatTs,
  }
}
