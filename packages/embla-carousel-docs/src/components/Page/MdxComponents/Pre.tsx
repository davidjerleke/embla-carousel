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
import { copyToClipboard, visuallyHiddenStyles } from 'utils'
import { LAYERS } from 'consts'

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
      rgba(var(--background-code-rgb-value), 0) 0,
      var(--background-code) 100%
    );
  }
  &:after {
    right: 0;
    background: linear-gradient(
      to right,
      rgba(var(--background-code-rgb-value), 0) 0,
      var(--background-code) 100%
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
  margin-right: calc(${FRAME_SPACING} - 0.8rem);
  color: var(--text-low-contrast);
  padding: 0 0.8rem;
  font-size: 1.2rem;
  height: 2.5rem;
  line-height: 2.5rem;
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
    background-image: linear-gradient(
      45deg,
      var(--brand-primary),
      var(--brand-secondary)
    );
  }

  &:hover {
    color: var(--background-site);
    &:before {
      visibility: visible;
    }
  }

  @media (hover: none), (hover: on-demand) {
    &:hover {
      color: var(--text-low-contrast);
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
