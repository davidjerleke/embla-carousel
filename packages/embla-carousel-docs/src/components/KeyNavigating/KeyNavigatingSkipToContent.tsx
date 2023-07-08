import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { LinkButtonPrimaryOutlined } from 'components/Link/LinkButton'
import { navigate } from '@reach/router'
import { isBrowser } from 'utils/isBrowser'
import { LAYERS } from 'consts/layers'
import { keyNavigatingStyles } from './keyNavigatingStyles'

export const MAIN_CONTENT_ID = 'main-content'

const KeyNavigatingSkipToContentWrapper = styled(LinkButtonPrimaryOutlined)`
  z-index: ${LAYERS.SEARCH + 1};
  top: 1rem;
  left: 1rem;
  position: absolute;
  transform: translateX(-1000rem);

  &:focus,
  &:active {
    ${keyNavigatingStyles};
    position: fixed;
    transform: translateX(0);
  }
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
    [contentElement]
  )

  useEffect(() => {
    if (!isBrowser) return
    setContentElement(document.getElementById(MAIN_CONTENT_ID))
  }, [setContentElement])

  if (!contentElement) return null

  return (
    <KeyNavigatingSkipToContentWrapper
      to={`#${MAIN_CONTENT_ID}`}
      onClick={onClick}
      $isKeyNavigating
    >
      Skip to content
    </KeyNavigatingSkipToContentWrapper>
  )
}
