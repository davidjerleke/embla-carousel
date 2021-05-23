import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { ctaButtonStyles } from 'components/Button'
import { plainLinkStyles } from 'components/Link'
import { isBrowser } from 'utils'
import { LAYERS } from 'consts'

export const SKIP_TO_CONTENT_ID = 'main-content'

const SkipToContentLink = styled.a`
  ${plainLinkStyles};
  ${ctaButtonStyles};
  z-index: ${LAYERS.SEARCH + 1};
  top: 0.5rem;
  left: 0.5rem;
  position: absolute;
  transform: translateX(-1000rem);

  &:focus,
  &:active {
    position: fixed;
    transform: translateX(0);
  }
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
    <SkipToContentLink
      href={`#${SKIP_TO_CONTENT_ID}`}
      onClick={onClick}
      $isTabbing
    >
      Skip to content
    </SkipToContentLink>
  )
}
