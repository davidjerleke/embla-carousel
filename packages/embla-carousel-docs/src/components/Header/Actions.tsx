import React from 'react'
import styled from 'styled-components'
import { ThemeToggle } from 'components/Theme'
import { NavigationLink } from 'components/Link'
import { COLORS, MEDIA, SPACINGS } from 'consts'
import { useRoutes } from 'hooks'
import { Search } from 'components/Search'
import { hiddenAtBreakpointStyles } from 'utils'

const ITEM_SPACING_SM_UP = SPACINGS.CUSTOM(({ FOUR }) => FOUR + 0.4)

const Wrapper = styled.ul`
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
    <Wrapper>
      <Item $hidden="COMPACT">
        <nav aria-label="Quick Navigation Menu">
          <Wrapper>
            {routes.map((route) => (
              <Item key={route.id}>
                <Link route={route}>{route.title}</Link>
              </Item>
            ))}
          </Wrapper>
        </nav>
      </Item>
      <Item>
        <Search />
      </Item>
      <Item $hidden="COMPACT">
        <ThemeToggle />
      </Item>
    </Wrapper>
  )
}
