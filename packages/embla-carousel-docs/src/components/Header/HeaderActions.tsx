import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeToggle } from 'components/Theme/ThemeToggle'
import { NavigationLink } from 'components/Link/NavigationLink'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { useRoutes } from 'hooks/useRoutes'
import { Search } from 'components/Search/Search'

const ITEM_SPACING_SM_UP = SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.4)

const HeaderActionsWrapper = styled.ul`
  display: flex;
  align-items: center;
  line-height: 1.65;
  ${MEDIA.MIN_SM} {
    margin-left: -${ITEM_SPACING_SM_UP};
  }
`

const Item = styled.li<{ $hiddenAtCompact?: boolean }>`
  ${MEDIA.MIN_SM} {
    padding-left: ${ITEM_SPACING_SM_UP};
  }
  display: flex;
  align-items: center;

  ${({ $hiddenAtCompact }) =>
    $hiddenAtCompact &&
    css`
      ${MEDIA.COMPACT} {
        display: none;
      }
    `};
`

const Link = styled(NavigationLink)`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  display: inline-flex;
  text-align: center;
  padding: ${SPACINGS.ONE} 0;
`

export const HeaderActions = () => {
  const { hierarchical: routes } = useRoutes()

  return (
    <HeaderActionsWrapper>
      <Item $hiddenAtCompact>
        <nav aria-label="Quick Navigation Menu">
          <HeaderActionsWrapper>
            {routes.map((route) => (
              <Item key={route.id}>
                <Link slug={route.slug}>{route.title}</Link>
              </Item>
            ))}
          </HeaderActionsWrapper>
        </nav>
      </Item>
      <Item>
        <Search />
      </Item>
      <Item $hiddenAtCompact>
        <ThemeToggle />
      </Item>
    </HeaderActionsWrapper>
  )
}
