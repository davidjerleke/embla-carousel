import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { useRoutes } from 'hooks/useRoutes'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { hiddenAtBreakpointStyles } from 'utils/hiddenAtBreakpointStyles'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { Logo } from 'components/Header/Logo'
import { Links } from 'components/Footer/Links'
import { ThemeToggle } from 'components/Theme/ThemeToggle'
import { NavigationClose } from './NavigationClose'
import { SubMenu } from './SubMenu'

const MAX_WIDTH = '37.5rem'
const MAX_HEIGHT_COMPACT = `calc(100vh - ${HEADER_HEIGHT})`

const Wrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;

  ${MEDIA.COMPACT} {
    z-index: ${LAYERS.STEP};
    padding-right: ${FRAME_SPACING};
    padding-left: ${FRAME_SPACING};
    max-width: ${MAX_WIDTH};
    box-shadow: 0.1rem 0 0 0 ${COLORS.DETAIL_LOW_CONTRAST};
  }
`

const ScrollArea = styled.ul`
  padding-bottom: ${SPACINGS.FOUR};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${MEDIA.COMPACT} {
    padding-bottom: ${SPACINGS.ELEVEN};
    padding-top: ${SPACINGS.TWO};
    max-height: ${MAX_HEIGHT_COMPACT};
  }
`

const Header = styled.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${hiddenAtBreakpointStyles};
`

const Buttons = styled.div`
  display: flex;
  align-items: center;

  > button:first-child {
    margin-right: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  }
`

const MiscMenu = styled(Links)`
  padding-top: ${SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)};
  flex-direction: column;
`

export const Menu = () => {
  const { hierarchical: routes } = useRoutes()

  return (
    <Wrapper>
      <Header $hidden="DESKTOP">
        <Logo />
        <Buttons>
          <ThemeToggle />
          <NavigationClose />
        </Buttons>
      </Header>
      <ScrollArea>
        {routes.map((route) => (
          <li key={route.id}>
            <SubMenu route={route} />
          </li>
        ))}
        <li>
          <MiscMenu />
        </li>
      </ScrollArea>
    </Wrapper>
  )
}
