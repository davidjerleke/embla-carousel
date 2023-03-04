import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { plainLinkStyles } from 'components/Link/BareLink'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { isBrowser } from 'utils/isBrowser'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'

export const MAIN_CONTENT_ID = 'main-content'

const KeyNavigatingSkipToContentWrapper = styled.a`
  ${plainLinkStyles};
  z-index: ${LAYERS.SEARCH + 1};
  background-color: ${COLORS.BACKGROUND_SITE};
  top: 1rem;
  left: 1rem;
  position: absolute;
  transform: translateX(-1000rem);
  font-size: ${FONT_SIZES.H4};
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

export const KeyNavigatingSkipToContent = () => {
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
    setContentElement(document.getElementById(MAIN_CONTENT_ID))
  }, [setContentElement])

  if (!contentElement) return null

  return (
    <KeyNavigatingSkipToContentWrapper
      href={`#${MAIN_CONTENT_ID}`}
      onClick={onClick}
      $isKeyNavigating
    >
      <LinkText>Skip to content</LinkText>
    </KeyNavigatingSkipToContentWrapper>
  )
}
