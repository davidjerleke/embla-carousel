'use client'

import { useCallback, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  SIDEBAR_NAVIGATION_ID,
  SIDEBAR_NAVIGATION_ID_PRETTY
} from '@/components/SidebarNavigation/SidebarNavigation'
import { COLORS } from '@/utils/theme'
import { BORDER_RADIUSES } from '@/utils/border'
import { MODALS } from '@/utils/modal'
import { ButtonBare } from '@/components/Button/ButtonBare'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { useEventListener } from '@/hooks/use-event-listener'
import {
  selectIsModalOpen,
  setModalClosed,
  setModalOpen
} from '@/components/Modal/modal-reducer'

const BUTTON_SIZE = '4rem'
const BURGER_SIZE = '2.35rem'

const MainNavigationToggleWrapper = styled(ButtonBare)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);
  margin-right: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);
`

const Burger = styled.div<{ $isOpen: boolean }>`
  position: relative;
  > span {
    background-color: ${COLORS.TEXT_HIGH_CONTRAST};
    display: block;
    height: 0.2rem;
    border-radius: ${BORDER_RADIUSES.LINE};
    position: relative;
    width: ${BURGER_SIZE};
    &:before,
    &:after {
      background-color: ${COLORS.TEXT_HIGH_CONTRAST};
      position: absolute;
      content: "";
      border-radius: ${BORDER_RADIUSES.LINE};
      display: block;
      height: 100%;
      width: 100%;
    }
    &:before {
      transform: translateY(0.8rem);
    }
    &:after {
      transform: translateY(-0.8rem);
    }

    ${({ $isOpen }) => css`
      background-color: ${$isOpen && 'transparent'};
      &:before {
        transform: ${$isOpen && 'rotate(-45deg) translateY(0)'};
      }
      &:after {
        transform: ${$isOpen && 'rotate(45deg) translateY(0)'};
      }
    `}};
  }
`

type PropType = {}

export function SidebarNavigationToggle(props: PropType) {
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SIDEBAR_NAVIGATION))
  const toggleAction = isOpen ? 'Hide' : 'Show'
  const toggleElement = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()

  const onClick = useCallback(() => {
    if (isOpen) {
      dispatch(setModalClosed())
      return
    }

    dispatch(setModalOpen(MODALS.SIDEBAR_NAVIGATION))
  }, [dispatch, isOpen])

  const loadSidebarNavigationMenu = useCallback(async () => {
    const module = await import(
      '@/components/SidebarNavigation/SidebarNavigationMenuCompact'
    )
    return { default: module.SidebarNavigationMenuCompact }
  }, [])

  useEventListener('mouseenter', loadSidebarNavigationMenu, toggleElement, {
    passive: true
  })
  useEventListener('touchstart', loadSidebarNavigationMenu, toggleElement, {
    passive: true
  })

  return (
    <MainNavigationToggleWrapper
      id={SIDEBAR_NAVIGATION_ID}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${toggleAction} ${SIDEBAR_NAVIGATION_ID_PRETTY}`}
      ref={toggleElement}
      type="button"
      {...props}
    >
      <Burger $isOpen={isOpen} aria-hidden="true">
        <span />
      </Burger>
    </MainNavigationToggleWrapper>
  )
}
