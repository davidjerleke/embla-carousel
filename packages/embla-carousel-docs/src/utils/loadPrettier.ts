import prettierrc from '../../.prettierrc'
import { Options as PretterOptions } from 'prettier'

const PRETTIER_CONFIG = <PretterOptions>prettierrc

export const loadPrettier = async () => {
  const [prettier, cssParser, babelParser] = await Promise.all([
    import('prettier'),
    import('prettier/parser-postcss'),
    import('prettier/parser-babel'),
  ])

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

  const formatCss = (css: string): string =>
    prettier.format(css, prettierCssParser)

  const formatJs = (js: string): string =>
    prettier.format(js, prettierBabelParser)

  const formatTs = (ts: string): string =>
    prettier.format(ts, prettierBabeTsParser)

  return {
    prettier,
    prettierConfig: PRETTIER_CONFIG,
    formatCss,
    formatJs,
    formatTs,
  }
}
