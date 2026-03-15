'use client'

import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectTheme } from '@/components/Theme/theme-reducer'
import { COLORS, THEME_KEYS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { MEDIA } from '@/utils/breakpoints'
import { HEADER_HEIGHT } from '@/utils/header'
import { LAYERS } from '@/utils/layers'
import { BORDER_RADIUSES } from '@/utils/border'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { useSiteNavigationContext } from '@/components/SiteNavigation/SiteNavigationContext'
import { LinkNavigation } from '@/components/Link/LinkNavigation'
import { createScrollBarStyles } from '@/utils/scrollbars'
import {
  ThemeToggle,
  LightThemeSvg,
  DarkThemeSvg
} from '@/components/Theme/ThemeToggle'

const ITEM_SPACING = SPACINGS.ONE
const MAX_WIDTH_COMPACT = '36rem'

const SidebarNavigationMenuCompactWrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
  z-index: ${LAYERS.STEP};
  padding-right: ${PAGE_FRAME_SPACING};
  padding-left: ${PAGE_FRAME_SPACING};
  padding-bottom: ${HEADER_HEIGHT};
  padding-top: ${HEADER_HEIGHT};

  ${MEDIA.DESKTOP} {
    display: none;
  }
`

const ScrollArea = styled.div`
  ${createScrollBarStyles('y')};
  padding-top: ${SPACINGS.TWO};
  padding-bottom: ${SPACINGS.FOUR};
  max-width: ${MAX_WIDTH_COMPACT};
  overflow: auto;
  scrollbar-gutter: stable both-edges;
  position: relative;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`

const Link = styled(LinkNavigation)`
  margin: 0 0;
  text-align: left;
  padding: ${ITEM_SPACING} 0;
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
  border-radius: ${BORDER_RADIUSES.BOX};
  overflow: hidden;

  ${LightThemeSvg}, ${DarkThemeSvg} {
    left: auto;
    right: 2rem;
    transform: translateY(-50%);
  }
`

const ThemeToggleText = styled.span`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
`

export function SiteNavigationMenuCompact() {
  const { flatRoutes } = useSiteNavigationContext()
  const theme = useAppSelector(selectTheme)
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <SidebarNavigationMenuCompactWrapper>
      <ScrollArea>
        <ul>
          {flatRoutes.map((route) => (
            <li key={route.slug}>
              <Link slug={route.slug}>{route.title}</Link>
            </li>
          ))}

          <li>
            <ThemeToggleButton>
              <ThemeToggleText>Activate {oppositeTheme} theme</ThemeToggleText>
            </ThemeToggleButton>
          </li>
        </ul>
      </ScrollArea>
    </SidebarNavigationMenuCompactWrapper>
  )
}
