import React, { useState, useEffect, useCallback, MouseEvent } from 'react'
import styled from 'styled-components'
import { LinkButtonPrimaryOutlined } from 'components/Link/LinkButton'
import { navigate } from '@reach/router'
import { isBrowser } from 'utils/isBrowser'
import { LAYERS } from 'consts/layers'
import { KEY_NAVIGATING_STYLES } from 'consts/keyEvents'
import { MAIN_CONTENT_ID } from 'consts/page'

const KeyEventsSkipToContentWrapper = styled(LinkButtonPrimaryOutlined)`
  z-index: ${LAYERS.SEARCH + 1};
  top: 1rem;
  left: 1rem;
  position: absolute;
  transform: translateX(-1000rem);

  &:focus,
  &:active {
    ${KEY_NAVIGATING_STYLES};
    position: fixed;
    transform: translateX(0);
  }
`

export const KeyEventsSkipToContent = () => {
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
    <KeyEventsSkipToContentWrapper
      to={`#${MAIN_CONTENT_ID}`}
      onClick={onClick}
      $isKeyNavigating
    >
      Skip to content
    </KeyEventsSkipToContentWrapper>
  )
}
