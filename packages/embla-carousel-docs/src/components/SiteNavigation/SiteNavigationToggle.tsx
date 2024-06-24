import React, { useCallback, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { NAVIGATION_ID } from './SiteNavigation'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { BORDER_RADIUSES } from 'consts/border'
import { MODALS } from 'consts/modal'
import { ButtonBare } from 'components/Button/ButtonBare'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { useEventListener } from 'hooks/useEventListener'
import {
  selectIsModalOpen,
  setModalClosed,
  setModalOpen
} from 'components/Modal/modalReducer'

const BUTTON_SIZE = '4rem'
const BURGER_SIZE = '2.35rem'

const SiteNavigationToggleWrapper = styled(ButtonBare)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);
  margin-right: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);

  ${MEDIA.DESKTOP} {
    display: none;
  }
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

export const SiteNavigationToggle = () => {
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_NAVIGATION))
  const toggleAction = isOpen ? 'Hide' : 'Show'
  const toggleElement = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()

  const onClick = useCallback(() => {
    const toggleModal = isOpen ? setModalClosed : setModalOpen
    dispatch(toggleModal(MODALS.SITE_NAVIGATION))
  }, [dispatch, isOpen])

  const loadSiteNavigationMenu = useCallback(async () => {
    const module = await import(
      'components/SiteNavigation/SiteNavigationMenuCompact'
    )
    return { default: module.SiteNavigationMenuCompact }
  }, [])

  useEventListener('mouseenter', loadSiteNavigationMenu, toggleElement, {
    passive: true
  })
  useEventListener('touchstart', loadSiteNavigationMenu, toggleElement, {
    passive: true
  })

  return (
    <SiteNavigationToggleWrapper
      id={NAVIGATION_ID}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={`${toggleAction} Main Navigation Menu`}
      ref={toggleElement}
    >
      <Burger $isOpen={isOpen} aria-hidden="true">
        <span />
      </Burger>
    </SiteNavigationToggleWrapper>
  )
}
