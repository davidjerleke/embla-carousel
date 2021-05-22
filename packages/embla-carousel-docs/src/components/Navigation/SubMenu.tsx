import React, { useCallback, useEffect, useState } from 'react'
import { gradientTextStyles, createSquareSizeStyles } from 'utils'
import styled, { css } from 'styled-components'
import { RouteType } from 'components/Routes'
import { PlainButton } from 'components/Button'
import { NavigationLink } from 'components/Link'
import { ChevronRightIcon } from 'assets/icons'
import { useRouteActive } from 'hooks'

const ITEM_SPACING = '0.6rem'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.65;
`

const Toggle = styled(PlainButton)<{ $isActive: boolean }>`
  color: var(--text-medium-contrast);
  padding: ${ITEM_SPACING} 0 ${ITEM_SPACING} 2rem;
  margin: 0 0;
  position: relative;
  line-height: inherit;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;

  ${({ $isActive }) => css`
    font-weight: ${$isActive && '500'};
    > span {
      ${$isActive && gradientTextStyles};
    }
  `};
`

const ToggleSvg = styled(ChevronRightIcon)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => $isOpen && 'rotate(90deg)'};
  color: var(--text-low-contrast);
  ${createSquareSizeStyles('0.8rem')};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`

const Menu = styled.ul<{ $isOpen: boolean }>`
  ${({ $isOpen }) => css`
    height: ${!$isOpen && '0px'};
    overflow: ${!$isOpen && 'hidden'};
    visibility: ${!$isOpen && 'hidden'};
  `};
  padding-left: 3.4rem;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0.3rem;
    width: 0.1rem;
    bottom: 0;
    background-color: var(--detail-medium-contrast);
  }
`

const Link = styled(NavigationLink)`
  padding: ${ITEM_SPACING} 0;
  margin: 0 0;
  text-align: left;
`

type PropType = { route: RouteType }

export const SubMenu = (props: PropType) => {
  const { route } = props
  const { title, children } = route
  const { isPartiallyActive, isActive } = useRouteActive(route)
  const [isOpen, setIsOpen] = useState(isPartiallyActive)
  const id = `${title.toLowerCase().split(' ').join('-')}-navigation-menu`
  const toggleAction = isOpen ? 'Hide' : 'Show'

  const toggleOpen = useCallback(() => {
    setIsOpen((open) => !open)
  }, [setIsOpen])

  useEffect(() => {
    setIsOpen(isPartiallyActive)
  }, [setIsOpen, isPartiallyActive])

  return (
    <Wrapper aria-labelledby={id}>
      <Toggle
        id={id}
        onClick={toggleOpen}
        $isActive={isPartiallyActive}
        aria-expanded={isOpen}
        aria-label={`${toggleAction} Navigation Menu`}
      >
        <ToggleSvg $isOpen={isOpen} aria-hidden="true" focusable="false" />
        <span>{title}</span>
      </Toggle>
      <Menu $isOpen={isOpen}>
        <li>
          <Link route={route} isActive={isActive}>
            Overview
          </Link>
        </li>
        {children.map((child) => (
          <li key={child.id}>
            <Link route={child}>{child.title}</Link>
          </li>
        ))}
      </Menu>
    </Wrapper>
  )
}
