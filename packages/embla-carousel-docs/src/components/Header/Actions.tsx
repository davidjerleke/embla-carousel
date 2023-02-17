import React from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'components/Theme/ThemeToggle'
import { NavigationLink } from 'components/Link/NavigationLink'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { useRoutes } from 'hooks/useRoutes'
import { Search } from 'components/Search/Search'
import { hiddenAtBreakpointStyles } from 'utils/hiddenAtBreakpointStyles'

const ITEM_SPACING_SM_UP = SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.4)

const ActionsWrapper = styled.ul`
  display: flex;
  align-items: center;
  line-height: 1.65;
  ${MEDIA.MIN_SM} {
    margin-left: -${ITEM_SPACING_SM_UP};
  }
`

const Item = styled.li`
  ${MEDIA.MIN_SM} {
    padding-left: ${ITEM_SPACING_SM_UP};
  }
  display: flex;
  align-items: center;
  ${hiddenAtBreakpointStyles};
`

const Link = styled(NavigationLink)`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  display: inline-flex;
  text-align: center;
  padding: ${SPACINGS.ONE} 0;
`

export const Actions = () => {
  const { hierarchical: routes } = useRoutes()

  return (
    <ActionsWrapper>
      <Item $hidden="COMPACT">
        <nav aria-label="Quick Navigation Menu">
          <ActionsWrapper>
            {routes.map((route) => (
              <Item key={route.id}>
                <Link slug={route.slug}>{route.title}</Link>
              </Item>
            ))}
          </ActionsWrapper>
        </nav>
      </Item>
      <Item>
        <Search />
      </Item>
      <Item $hidden="COMPACT">
        <ThemeToggle />
      </Item>
    </ActionsWrapper>
  )
}
