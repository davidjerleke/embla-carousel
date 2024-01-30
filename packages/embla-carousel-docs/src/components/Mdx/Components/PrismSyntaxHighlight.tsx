import React, { useMemo } from 'react'
import { PrismSyntaxFrame } from './PrismSyntaxFrame'
import Highlight, { defaultProps } from 'prism-react-renderer'
import {
  parseCodeBlockProps,
  parseHighlightedLines
} from 'utils/prismHighlight'
import {
  PRISM_HIGHLIGHT_CLASS_NAME,
  PRISM_HIGHLIGHT_LINE_CLASS_NAME
} from 'consts/prismHighlight'

type PropType = {
  children: string
  className: string
}

export const PrismSyntaxHighlight = (props: PropType) => {
  const { children, className } = props

  const { asLanguage, language, highlightedLines } = useMemo(() => {
    const { asLanguage, language, highlight } = parseCodeBlockProps(className)
    return {
      language,
      asLanguage,
      highlightedLines: parseHighlightedLines(highlight)
    }
  }, [className])

  return (
    <div className={PRISM_HIGHLIGHT_CLASS_NAME} data-language={language}>
      <PrismSyntaxFrame code={children}>
        <Highlight
          {...defaultProps}
          code={children}
          language={asLanguage || language}
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
