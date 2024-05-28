import React, {
  PropsWithChildren,
  Suspense,
  lazy,
  useCallback,
  useEffect
} from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import FocusTrap from 'focus-trap-react'
import { useEventListener } from 'hooks/useEventListener'
import { useBreakpoints } from 'hooks/useBreakpoints'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { HEADER_HEIGHT, HEADER_ID } from 'components/Header/Header'
import { MODALS } from 'consts/modal'
import { SPACINGS } from 'consts/spacings'
import { isBrowser } from 'utils/isBrowser'
import { ModalLoadingTrigger } from 'components/Modal/ModalLoadingTrigger'
import { SiteNavigationMenuDesktop } from 'components/SiteNavigation/SiteNavigationMenuDesktop'
import {
  selectIsModalOpen,
  setModalClosed
} from 'components/Modal/modalReducer'

const SiteNavigationMenuCompactLazy = lazy(async () => {
  const module = await import(
    'components/SiteNavigation/SiteNavigationMenuCompact'
  )
  return { default: module.SiteNavigationMenuCompact }
})

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
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_NAVIGATION))
  const dispatch = useAppDispatch()

  const closeNavigation = useCallback(() => {
    dispatch(setModalClosed(MODALS.SITE_NAVIGATION))
  }, [dispatch])

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
    [closeNavigation]
  )

  useEventListener('keyup', onKeyUp)

  useEffect(() => {
    if (!isCompact) closeNavigation()

    return () => {
      closeNavigation()
    }
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
        <SiteNavigationMenuDesktop />

        {isOpen && (
          <Suspense fallback={<ModalLoadingTrigger />}>
            <SiteNavigationMenuCompactLazy />
          </Suspense>
        )}
      </SiteNavigationWrapper>
    </FocusTrap>
  )
}
