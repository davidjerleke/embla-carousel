import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useNavigation } from 'hooks/useNavigation'
import { useEventListener } from 'hooks/useEventListener'
import { hiddenAtBreakpointStyles } from 'utils/hiddenAtBreakpointStyles'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { Menu } from './Menu'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { HEADER_HEIGHT } from 'components/Header/Header'

export const NAVIGATION_ID = 'main-navigation-menu'

const Nav = styled.nav<{ $isOpen: boolean }>`
  z-index: ${LAYERS.NAVIGATION};
  position: fixed;

  ${MEDIA.COMPACT} {
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
    top: calc(${FRAME_SPACING} + ${HEADER_HEIGHT});
    bottom: 0;
  }
`

const Overlay = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  opacity: 0.9;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${hiddenAtBreakpointStyles};
`

type PropType = PropsWithChildren<{
  collapsed: boolean
}>

export const Navigation = (props: PropType) => {
  const { collapsed } = props
  const { isOpen, closeNavigation } = useNavigation()
  const id = collapsed ? NAVIGATION_ID : undefined
  const role = collapsed ? 'dialog' : undefined
  const ariaModal = collapsed ? 'true' : undefined
  const closeKeys = useRef(['Escape', 'Esc'])

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (closeKeys.current.includes(key)) closeNavigation()
    },
    [closeNavigation],
  )

  useEventListener({
    type: 'keyup',
    listener: onKeyUp,
  })

  useEffect(() => {
    if (!collapsed) closeNavigation()
    return () => closeNavigation()
  }, [collapsed, closeNavigation])

  return (
    <Nav
      role={role}
      aria-modal={ariaModal}
      aria-labelledby={id}
      aria-label="Main Navigation Menu"
      $isOpen={isOpen}
      {...props}
    >
      <Overlay onPointerUp={closeNavigation} $hidden="DESKTOP" />
      <Menu />
    </Nav>
  )
}
