import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { PlainButton } from 'components/Button'
import { FRAME_SPACING } from 'components/SiteLayout'
import { COLORS, FONT_SIZES, LAYERS, SPACINGS } from 'consts'
import {
  copyToClipboard,
  gradientBackgroundStyles,
  visuallyHiddenStyles,
} from 'utils'

const extractTextFromCodeBlock = (node: React.ReactNode = ''): string => {
  const nodes = typeof node === 'string' ? [node] : React.Children.toArray(node)
  return nodes.reduce((text: string, child: React.ReactNode): string => {
    if (typeof child === 'string') return text + child
    if (!React.isValidElement(child)) return text
    const { className, children } = child.props
    const newLine = className === 'gatsby-highlight-code-line' ? '\n' : ''
    return text + extractTextFromCodeBlock(children) + newLine
  }, '')
}

const TIMEOUT = 3000
const COPY_CODE_BUTTON_PADDING = SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)
const COPY_CODE_BUTTON_HEIGHT = SPACINGS.FOUR

const Wrapper = styled.div`
  position: relative;
  &:before,
  &:after {
    width: ${FRAME_SPACING};
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    pointer-events: none;
  }
  &:before {
    left: 0;
    background: linear-gradient(
      to left,
      rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 0) 0,
      ${COLORS.BACKGROUND_CODE} 100%
    );
  }
  &:after {
    right: 0;
    background: linear-gradient(
      to right,
      rgba(${COLORS.BACKGROUND_CODE_RGB_VALUE}, 0) 0,
      ${COLORS.BACKGROUND_CODE} 100%
    );
  }
`

const CopyCode = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 0;
`

const CopyCodeButton = styled(PlainButton)`
  position: relative;
  z-index: ${LAYERS.STEP};
  margin-right: calc(${FRAME_SPACING} - ${COPY_CODE_BUTTON_PADDING});
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding: 0 ${COPY_CODE_BUTTON_PADDING};
  height: ${COPY_CODE_BUTTON_HEIGHT};
  line-height: ${COPY_CODE_BUTTON_HEIGHT};
  font-size: ${FONT_SIZES.DETAIL};
  align-items: center;

  &:before {
    content: '';
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0.4rem;
    ${gradientBackgroundStyles};
  }

  &:hover {
    color: ${COLORS.BACKGROUND_SITE};
    &:before {
      visibility: visible;
    }
  }

  @media (hover: none), (hover: on-demand) {
    &:hover {
      color: ${COLORS.TEXT_LOW_CONTRAST};
      &:before {
        display: none;
      }
    }
  }
`

const ButtonStatus = styled.span`
  ${visuallyHiddenStyles};
`

const ButtonText = styled.span`
  position: relative;
  z-index: ${LAYERS.STEP};
`

type PropType = PropsWithChildren<{}>

export const Pre = (props: PropType) => {
  const { children } = props
  const [isCopied, setIsCopied] = useState(false)
  const text = useMemo(() => extractTextFromCodeBlock(children), [children])
  const timeout = useRef(0)

  const onButtonClick = useCallback(() => {
    copyToClipboard(text)
    setIsCopied(true)
    timeout.current = window.setTimeout(() => setIsCopied(false), TIMEOUT)
  }, [text, setIsCopied])

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current)
    }
  }, [])

  return (
    <Wrapper>
      <CopyCode>
        <CopyCodeButton
          aria-label="Copy code snippet to clipboard"
          onClick={onButtonClick}
          disabled={isCopied}
          type="button"
        >
          <ButtonStatus aria-roledescription="status">
            {isCopied
              ? 'Code snipped copied to clipboard'
              : 'Copy code snippet to clipboard'}
          </ButtonStatus>
          <ButtonText>{isCopied ? 'Copied' : 'Copy'}</ButtonText>
        </CopyCodeButton>
      </CopyCode>
      <pre {...props} />
    </Wrapper>
  )
}
