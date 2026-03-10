import { Language as PrismLanguage } from 'prism-react-renderer'

/* CONSTS */
export const PRISM_HIGHLIGHT_CLASS_NAME = 'prism-highlight'
export const PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME = `${PRISM_HIGHLIGHT_CLASS_NAME}-code-language`
export const PRISM_HIGHLIGHT_LINE_CLASS_NAME = `${PRISM_HIGHLIGHT_CLASS_NAME}-code-line`
export const PRISM_HIGHLIGHT_PROP_SEPARATOR = '___'

const REGEX_HIGHLIGHT_RANGE = /\d{1,}-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_END = /-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_START = /\d{1,}-/
const REGEX_LANGUAGE_PREFIX = /language-/gm

export type PrismCodeBlockPropsType = {
  language: PrismLanguage
  asLanguage?: PrismLanguage
  highlight?: string
}

/* UTILS */
export function parseHighlightedLines(highlight: string = ''): number[] {
  const highlightedLines: number[] = []
  const matches = highlight.replace(/{|}/g, '').split(',')

  return matches.reduce((highlightedLinesArray, match) => {
    if (REGEX_HIGHLIGHT_RANGE.test(match)) {
      const start = parseInt(match.replace(REGEX_HIGHLIGHT_RANGE_END, ''), 10)
      const end = parseInt(match.replace(REGEX_HIGHLIGHT_RANGE_START, ''), 10)

      for (let i = start; i <= end; i += 1) highlightedLinesArray.push(i)
    } else if (/\d{1,}/.test(match)) {
      highlightedLinesArray.push(parseInt(match, 10))
    }
    return highlightedLinesArray
  }, highlightedLines)
}

export function parseCodeBlockProps(string: string): PrismCodeBlockPropsType {
  return string
    .split(PRISM_HIGHLIGHT_PROP_SEPARATOR)
    .reduce((props, propString, index) => {
      if (index === 0) {
        const language = propString.replace(REGEX_LANGUAGE_PREFIX, '')
        return { language }
      }

      const [prop, value] = propString.split('=')
      return {
        ...props,
        [prop]: value
      }
    }, {}) as PrismCodeBlockPropsType
}

export function removeUnwantedStrings(code: string): string {
  const unwantedStrings = ['/** @jsxImportSource solid-js */']

  return unwantedStrings
    .reduce((acc, string) => {
      const escaped = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`^.*${escaped}.*(?:\\r?\\n)?`, 'gm')
      return acc.replace(regex, '')
    }, code)
    .trim()
}

export function stringifyAsJs(
  codeOrEmpty: string | Record<string, unknown>
): string {
  const JS_IFY_REGEX = /"(\w+)":/g
  const QUOTES_TO_SINGLE_QUOTES_REGEX = /"([^"]*)"/g

  const code = codeOrEmpty || ''
  return JSON.stringify(code, null, 2)
    .replace(JS_IFY_REGEX, '$1:')
    .replace(QUOTES_TO_SINGLE_QUOTES_REGEX, "'$1'")
}
