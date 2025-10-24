import {
  PRISM_HIGHLIGHT_PROP_SEPARATOR,
  PrismCodeBlockPropsType
} from 'consts/prismHighlight'

const REGEX_HIGHLIGHT_RANGE = /\d{1,}-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_END = /-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_START = /\d{1,}-/
const REGEX_LANGUAGE_PREFIX = /language-/gm

export const parseHighlightedLines = (highlight: string = ''): number[] => {
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

export const parseCodeBlockProps = (
  string: string
): PrismCodeBlockPropsType => {
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

export const removeUnwantedStrings = (code: string): string => {
  const unwantedStrings = ['/** @jsxImportSource solid-js */']

  return unwantedStrings
    .reduce((acc, string) => {
      const escaped = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`^.*${escaped}.*(?:\\r?\\n)?`, 'gm')
      return acc.replace(regex, '')
    }, code)
    .trim()
}
