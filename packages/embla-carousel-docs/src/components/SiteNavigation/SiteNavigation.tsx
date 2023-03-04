import React, { PropsWithChildren, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import FocusTrap from 'focus-trap-react'
import { useNavigation } from 'hooks/useNavigation'
import { useEventListener } from 'hooks/useEventListener'
import { useBreakpoints } from 'hooks/useBreakpoints'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { SiteNavigationMenu } from './SiteNavigationMenu'
import { HEADER_HEIGHT, HEADER_ID } from 'components/Header/Header'
import { SPACINGS } from 'consts/spacings'
import { isBrowser } from 'utils/isBrowser'

export const NAVIGATION_ID = 'main-navigation-menu'
const CLOSE_KEYS = ['Escape', 'Esc']
const MENU_ID = 'main-menu'

const SiteNavigationWrapper = styled.nav<{ $isOpen: boolean }>`
  position: fixed;

  ${MEDIA.COMPACT} {
    z-index: ${LAYERS.NAVIGATION};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    ${({ $isOpen }) => css`
      transform: ${!$isOpen && 'translateX(-100%)'};
      visibility: ${!$isOpen && 'hidden'};
    `};
  }

  ${MEDIA.DESKTOP} {
    width: inherit;
    max-width: inherit;
    top: ${HEADER_HEIGHT};
    bottom: 0;
  }

  ${MEDIA.MIN_LG} {
    padding-right: ${SPACINGS.SEVEN};
  }
`

export type PropType = PropsWithChildren<{}>

export const SiteNavigation = (props: PropType) => {
  const { isCompact } = useBreakpoints()
  const { isOpen, closeNavigation } = useNavigation()

  const getFocusTrapElements = useCallback((): HTMLElement[] => {
    if (!isBrowser) return []
    const header = document.getElementById(HEADER_ID)
    const nav = document.getElementById(MENU_ID)
    return header && nav ? [header, nav] : []
  }, [])

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (CLOSE_KEYS.includes(key)) closeNavigation()
    },
    [closeNavigation],
  )

  useEventListener('keyup', onKeyUp)

  useEffect(() => {
    if (!isCompact) closeNavigation()
    return () => closeNavigation()
  }, [isCompact, closeNavigation])

  return (
    <FocusTrap active={isOpen} containerElements={getFocusTrapElements()}>
      <SiteNavigationWrapper
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={NAVIGATION_ID}
        aria-label="Main Navigation Menu"
        $isOpen={isOpen}
        {...props}
      >
        <SiteNavigationMenu />
      </SiteNavigationWrapper>
    </FocusTrap>
  )
}
