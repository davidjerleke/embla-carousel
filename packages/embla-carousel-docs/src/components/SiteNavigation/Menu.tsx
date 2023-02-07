import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { useRoutes } from 'hooks/useRoutes'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { Links } from 'components/Footer/Links'
import { SubMenu } from './SubMenu'
import { hiddenAtBreakpointStyles } from 'utils/hiddenAtBreakpointStyles'
import { useTheme } from 'hooks/useTheme'
import {
  DarkThemeSvg,
  LightThemeSvg,
  ThemeToggle,
} from 'components/Theme/ThemeToggle'

const MAX_WIDTH_COMPACT = '36rem'

const Wrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;

  ${MEDIA.COMPACT} {
    z-index: ${LAYERS.STEP};
    padding-right: ${FRAME_SPACING};
    padding-left: ${FRAME_SPACING};
    box-shadow: 0.1rem 0 0 0 ${COLORS.DETAIL_LOW_CONTRAST};
  }
`

const ScrollArea = styled.ul`
  padding-bottom: ${SPACINGS.FOUR};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${MEDIA.COMPACT} {
    padding-bottom: ${SPACINGS.TWELVE};
    padding-top: calc(${HEADER_HEIGHT} + ${SPACINGS.TWO});
    max-width: ${MAX_WIDTH_COMPACT};
    margin-left: auto;
    margin-right: auto;
  }
`

const ThemeToggleWrapper = styled.li`
  ${hiddenAtBreakpointStyles};
`

const ThemeToggleButton = styled(ThemeToggle)`
  background-color: ${COLORS.BACKGROUND_CODE};
  width: 100%;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  margin-top: ${SPACINGS.FOUR};
  height: auto;
  margin-right: 0;
  margin-left: 0;
  border-radius: 0.4rem;
  overflow: hidden;

  > ${LightThemeSvg}, ${DarkThemeSvg} {
    left: auto;
    right: 2rem;
    transform: translateY(-50%);
  }
`

const ThemeToggleText = styled.span`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
`

const MiscLinks = styled(Links)`
  padding-top: ${SPACINGS.THREE};

  ${MEDIA.COMPACT} {
    justify-content: center;
  }

  ${MEDIA.DESKTOP} {
    flex-direction: column;
    margin-bottom: -${SPACINGS.ONE};
  }
`

export const Menu = () => {
  const { hierarchical: routes } = useRoutes()
  const { theme } = useTheme()
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <Wrapper>
      <ScrollArea>
        {routes.map((route) => (
          <li key={route.id}>
            <SubMenu route={route} />
          </li>
        ))}
        <ThemeToggleWrapper $hidden="DESKTOP">
          <ThemeToggleButton>
            <ThemeToggleText>Activate {oppositeTheme} theme</ThemeToggleText>
          </ThemeToggleButton>
        </ThemeToggleWrapper>
        <li>
          <MiscLinks />
        </li>
      </ScrollArea>
    </Wrapper>
  )
}
