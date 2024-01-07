import React, { useMemo } from 'react'
import { PrismSyntaxFrame } from './PrismSyntaxFrame'
import Highlight, { defaultProps } from 'prism-react-renderer'
import {
  PRISM_HIGHLIGHT_CLASS_NAME,
  PRISM_HIGHLIGHT_LINE_CLASS_NAME,
  PRISM_HIGHLIGHT_PROP_SEPARATOR,
  PrismCodeBlockPropsType
} from 'consts/prismHighlight'

const REGEX_HIGHLIGHT_RANGE = /\d{1,}-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_END = /-\d{1,}/
const REGEX_HIGHLIGHT_RANGE_START = /\d{1,}-/
const REGEX_LANGUAGE_PREFIX = /language-/gm

const parseHighlightedLines = (highlight: string = ''): number[] => {
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

const parseCodeBlockProps = (string: string): PrismCodeBlockPropsType => {
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

type PropType = {
  children: string
  className: string
}

export const PrismSyntaxHighlight = (props: PropType) => {
  const { children, className } = props

  const { language, highlightedLines } = useMemo(() => {
    const { language, highlight } = parseCodeBlockProps(className)
    return {
      language,
      highlightedLines: parseHighlightedLines(highlight)
    }
  }, [className])

  return (
    <div className={PRISM_HIGHLIGHT_CLASS_NAME} data-language={language}>
      <PrismSyntaxFrame code={children}>
        <Highlight
          {...defaultProps}
          code={children}
          language={language}
          theme={undefined}
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <pre className={className}>
              <code className={className}>
                {tokens
                  .filter((line, index) => {
                    const isTokenLast = index === tokens.length - 1
                    const isLineSingle = line.length === 1
                    const isLineEmpty = line[0].empty
                    return !(isTokenLast && isLineSingle && isLineEmpty)
                  })
                  .map((line, index) => {
                    const lineProps = getLineProps({ line, key: index })
                    const lineNumber = index + 1

                    if (highlightedLines.includes(lineNumber)) {
                      lineProps.className = `${lineProps.className} ${PRISM_HIGHLIGHT_LINE_CLASS_NAME}`
                    }

                    return (
                      <span key={index} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    )
                  })}
              </code>
            </pre>
          )}
        </Highlight>
      </PrismSyntaxFrame>
    </div>
  )
}
