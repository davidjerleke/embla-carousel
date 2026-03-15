'use client'

import { PropsWithChildren, lazy, useCallback, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { FocusTrap } from 'focus-trap-react'
import { useEventListener } from '@/hooks/use-event-listener'
import { useBreakpoints } from '@/hooks/use-breakpoints'
import { MEDIA } from '@/utils/breakpoints'
import { LAYERS } from '@/utils/layers'
import { MODAL_CLOSE_KEYS, MODALS } from '@/utils/modal'
import { SPACINGS } from '@/utils/spacings'
import { HEADER_HEIGHT, HEADER_ID } from '@/utils/header'
import { isBrowser } from '@/utils/is-browser'
import { SidebarNavigationMenuDesktop } from '@/components/SidebarNavigation/SidebarNavigationMenuDesktop'
import { LoadSpinnerWithSuspense } from '@/components/LoadSpinner/LoadSpinnerWithSuspense'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  selectIsModalOpen,
  setModalClosed
} from '@/components/Modal/modal-reducer'

const SidebarNavigationMenuCompactLazy = lazy(async () => {
  const module = await import(
    '@/components/SidebarNavigation/SidebarNavigationMenuCompact'
  )
  return { default: module.SidebarNavigationMenuCompact }
})

export const SIDEBAR_NAVIGATION_ID = 'sidebar-navigation-menu'
export const SIDEBAR_NAVIGATION_ID_PRETTY = kebabCaseToPascalCase(
  SIDEBAR_NAVIGATION_ID,
  ' '
)
const MENU_ID = 'sidebar-menu'

const SidebarNavigationWrapper = styled.nav<{ $isOpen: boolean }>`
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

export function SidebarNavigation(props: PropType) {
  const { isCompact } = useBreakpoints()
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SIDEBAR_NAVIGATION))
  const dispatch = useAppDispatch()

  const closeNavigation = useCallback(() => {
    dispatch(setModalClosed())
  }, [dispatch])

  const getFocusTrapElements = useCallback((): HTMLElement[] => {
    if (!isBrowser()) return []
    const header = document.getElementById(HEADER_ID)
    const nav = document.getElementById(MENU_ID)
    return header && nav ? [header, nav] : []
  }, [])

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (MODAL_CLOSE_KEYS.includes(key)) closeNavigation()
    },
    [closeNavigation]
  )

  useEventListener('keyup', onKeyUp)

  useEffect(() => {
    if (!isCompact) closeNavigation()
    return closeNavigation
  }, [isCompact, closeNavigation])

  return (
    <FocusTrap active={isOpen} containerElements={getFocusTrapElements()}>
      <SidebarNavigationWrapper
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={SIDEBAR_NAVIGATION_ID}
        aria-label={SIDEBAR_NAVIGATION_ID_PRETTY}
        $isOpen={isOpen}
        {...props}
      >
        <SidebarNavigationMenuDesktop />

        {isOpen && (
          <LoadSpinnerWithSuspense>
            <SidebarNavigationMenuCompactLazy />
          </LoadSpinnerWithSuspense>
        )}
      </SidebarNavigationWrapper>
    </FocusTrap>
  )
}
