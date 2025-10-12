import React, { useMemo } from 'react'
import { PrismSyntaxFrame } from './PrismSyntaxFrame'
import Highlight, { Prism, defaultProps, Language } from 'prism-react-renderer'
import { capitalizeFirstLetter } from 'utils/stringCasing'
import { parseHighlightedLines } from 'utils/prismHighlight'
import { addPrismSvelteSupport } from 'utils/prismSvelteSupport'
import {
  PRISM_HIGHLIGHT_CLASS_NAME,
  PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME,
  PRISM_HIGHLIGHT_LINE_CLASS_NAME
} from 'consts/prismHighlight'

addPrismSvelteSupport(Prism)

type PropType = {
  code: string
  language: string
  asLanguage?: string
  highlight?: string
}

export const PrismHighlight = (props: PropType) => {
  const { language, asLanguage, code, highlight } = props
  const displayLanguage = asLanguage || language
  const ariaLabelLanguage = `Code block language: ${capitalizeFirstLetter(
    displayLanguage
  )}`

  const highlightedLines = useMemo(() => {
    return parseHighlightedLines(`{${highlight}}`)
  }, [highlight])

  return (
    <div className={PRISM_HIGHLIGHT_CLASS_NAME}>
      <span
        className={PRISM_HIGHLIGHT_CODE_LANGUAGE_CLASS_NAME}
        data-display-language={displayLanguage}
        aria-label={ariaLabelLanguage}
      >
        <span aria-hidden>{displayLanguage}</span>
      </span>

      <PrismSyntaxFrame code={code}>
        <Highlight
          {...defaultProps}
          code={code}
          language={language as Language}
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
