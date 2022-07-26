import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { plainLinkStyles } from 'components/Link'
import { gradientTextStyles, isBrowser } from 'utils'
import { COLORS, LAYERS, SPACINGS } from 'consts'

export const SKIP_TO_CONTENT_ID = 'main-content'

const Wrapper = styled.a`
  ${plainLinkStyles};
  z-index: ${LAYERS.SEARCH + 1};
  background-color: ${COLORS.BACKGROUND_SITE};
  top: 1rem;
  left: 1rem;
  position: absolute;
  transform: translateX(-1000rem);
  font-size: 1.8rem;
  font-weight: 500;
  padding: ${SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)}
    ${SPACINGS.CUSTOM(({ THREE }) => THREE + 0.2)};

  &:focus,
  &:active {
    position: fixed;
    transform: translateX(0);
  }
`

const LinkText = styled.span`
  ${gradientTextStyles};
  z-index: ${LAYERS.STEP};
  position: relative;
`

export const SkipToContent = () => {
  const [contentElement, setContentElement] = useState<HTMLElement | null>(null)

  const onClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.currentTarget.blur()
      event.preventDefault()
      navigate(event.currentTarget.href)
      contentElement?.focus()
    },
    [contentElement],
  )

  useEffect(() => {
    if (!isBrowser) return
    setContentElement(document.getElementById(SKIP_TO_CONTENT_ID))
  }, [setContentElement])

  if (!contentElement) return null

  return (
    <Wrapper href={`#${SKIP_TO_CONTENT_ID}`} onClick={onClick} $isTabbing>
      <LinkText>Skip to content</LinkText>
    </Wrapper>
  )
}
