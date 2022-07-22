import React from 'react'
import styled, { css } from 'styled-components'
import { createSquareSizeStyles, hiddenAtBreakpointStyles } from 'utils'
import { PlainButton } from 'components/Button'
import { useNavigation } from 'hooks'
import { NAVIGATION_ID } from './Navigation'

const BUTTON_SIZE = '4rem'
const BURGER_SIZE = '2.35rem'

const Wrapper = styled(PlainButton)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);
  margin-right: calc((${BUTTON_SIZE} - ${BURGER_SIZE}) / 2 * -1);
  ${hiddenAtBreakpointStyles};
`

const Burger = styled.div<{ $isOpen: boolean }>`
  position: relative;
  > span {
    background-color: var(--text-high-contrast);
    display: block;
    height: 0.2rem;
    border-radius: 0.2rem;
    position: relative;
    width: ${BURGER_SIZE};
    &:before,
    &:after {
      background-color: var(--text-high-contrast);
      position: absolute;
      content: "";
      border-radius: 0.2rem;
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

export const NavigationToggle = () => {
  const { isOpen, toggleNavigation } = useNavigation()
  const toggleAction = isOpen ? 'Hide' : 'Show'

  return (
    <Wrapper
      id={NAVIGATION_ID}
      onClick={toggleNavigation}
      aria-expanded={isOpen}
      aria-label={`${toggleAction} Main Navigation Menu`}
      $hidden="DESKTOP"
    >
      <Burger $isOpen={isOpen} aria-hidden="true">
        <span />
      </Burger>
    </Wrapper>
  )
}
