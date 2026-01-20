import { Language as PrismLanguage } from 'prism-react-renderer'

export const PRISM_HIGHLIGHT_CLASS_NAME = 'prism-highlight'
export const PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME = `${PRISM_HIGHLIGHT_CLASS_NAME}-code-language`
export const PRISM_HIGHLIGHT_LINE_CLASS_NAME = `${PRISM_HIGHLIGHT_CLASS_NAME}-code-line`
export const PRISM_HIGHLIGHT_PROP_SEPARATOR = '___'

export type PrismCodeBlockPropsType = {
  language: PrismLanguage
  asLanguage?: PrismLanguage
  highlight?: string
}
