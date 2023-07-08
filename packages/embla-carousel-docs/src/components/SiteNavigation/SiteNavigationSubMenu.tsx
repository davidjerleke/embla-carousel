import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { ALGOLIA_CLASSNAMES } from 'consts/algoliaSearch'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { BORDER_SIZES } from 'consts/border'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { RouteType } from 'components/Routes/RoutesContext'
import { ButtonBare } from 'components/Button/ButtonBare'
import { LinkNavigation } from 'components/Link/LinkNavigation'
import { useRouteActive } from 'hooks/useRouteActive'
import { Icon } from 'components/Icon/Icon'

const createMenuId = (title: string = '', isDesktopMenu: boolean): string => {
  const titleInKebabCase = title.toLowerCase().split(' ').join('-')
  const menuType = isDesktopMenu ? 'desktop' : 'compact'
  return `${titleInKebabCase}-navigation-${menuType}-menu`
}

const ITEM_SPACING = SPACINGS.ONE
const TOGGLE_SVG_SIZE = SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)

const SiteNavigationSubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.65;

  ${MEDIA.COMPACT} {
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_MEDIUM_CONTRAST};
  }
`

const Toggle = styled(ButtonBare)<{ $isActive: boolean }>`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  padding: ${ITEM_SPACING} 0 ${ITEM_SPACING}
    calc(${TOGGLE_SVG_SIZE} + ${SPACINGS.TWO});
  margin: 0 0;
  position: relative;
  line-height: inherit;
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;

  ${({ $isActive }) => css`
    font-weight: ${$isActive && FONT_WEIGHTS.MEDIUM};
    > span {
      ${$isActive && BRAND_GRADIENT_TEXT_STYLES};
    }
  `};

  ${MEDIA.COMPACT} {
    padding: ${SPACINGS.TWO} 0 ${SPACINGS.TWO}
      calc(${TOGGLE_SVG_SIZE} + ${SPACINGS.TWO});
  }
`

const ToggleSvg = styled(Icon)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => $isOpen && 'rotate(90deg)'};
  color: ${COLORS.TEXT_LOW_CONTRAST};
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

    ${MEDIA.COMPACT} {
      margin-top: ${$isOpen && `-${SPACINGS.ONE}`};
      padding-bottom: ${$isOpen && SPACINGS.TWO};
    }
  `};
  padding-left: calc(${TOGGLE_SVG_SIZE} + ${SPACINGS.FOUR});
  position: relative;

  ${MEDIA.DESKTOP} {
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0.3rem;
      width: ${BORDER_SIZES.DETAIL};
      bottom: 0;
      background-color: ${COLORS.DETAIL_MEDIUM_CONTRAST};
    }
  }
`

const Link = styled(LinkNavigation)`
  margin: 0 0;
  text-align: left;
  padding: ${ITEM_SPACING} 0;
`

type PropType = {
  route: RouteType
  isDesktopMenu: boolean
}

export const SiteNavigationSubMenu = (props: PropType) => {
  const { route, isDesktopMenu } = props
  const { title, children } = route
  const { isPartiallyActive, isActive } = useRouteActive(route.slug)
  const [isOpen, setIsOpen] = useState(isPartiallyActive)
  const toggleAction = isOpen ? 'Hide' : 'Show'
  const applyAlgoliaClass = isPartiallyActive && isDesktopMenu
  const algoliaClass = applyAlgoliaClass ? ALGOLIA_CLASSNAMES.LVL_0 : undefined
  const id = createMenuId(title, isDesktopMenu)

  const toggleOpen = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      setIsOpen((open) => !open)
    },
    [setIsOpen]
  )

  useEffect(() => {
    setIsOpen(isPartiallyActive)
  }, [setIsOpen, isPartiallyActive])

  return (
    <SiteNavigationSubMenuWrapper aria-labelledby={id}>
      <Toggle
        id={id}
        onClick={toggleOpen}
        $isActive={isPartiallyActive}
        aria-expanded={isOpen}
        aria-label={`${toggleAction} Navigation Menu`}
      >
        <ToggleSvg $isOpen={isOpen} svg="chevronRight" size={TOGGLE_SVG_SIZE} />
        <span className={algoliaClass}>{title}</span>
      </Toggle>
      <Menu $isOpen={isOpen}>
        <li>
          <Link slug={route.slug} isActive={isActive}>
            Overview
          </Link>
        </li>
        {children.map((child) => (
          <li key={child.id}>
            <Link slug={child.slug}>{child.title}</Link>
          </li>
        ))}
      </Menu>
    </SiteNavigationSubMenuWrapper>
  )
}
