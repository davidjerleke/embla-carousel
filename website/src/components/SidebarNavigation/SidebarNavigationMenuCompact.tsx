'use client'

import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { MEDIA } from '@/utils/breakpoints'
import { HEADER_HEIGHT } from '@/utils/header'
import { LAYERS } from '@/utils/layers'
import { BORDER_RADIUSES, BORDER_SIZES } from '@/utils/border'
import { TABS_SIDEBAR_NAVIGATION } from '@/utils/tabs'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { FooterLinks } from '@/components/Footer/FooterLinks'
import { TabsItem } from '@/components/Tabs/TabsItem'
import { Tabs } from '@/components/Tabs/Tabs'
import { TableOfContents } from '@/components/TableOfContents/TableOfContents'
import { TabsListScrollArea, TabsListWrapper } from '@/components/Tabs/TabsList'
import { VersionBadge } from '@/components/VersionBadge/VersionBadge'
import { TabsButtonWrapper } from '@/components/Tabs/TabsButton'
import { TabsPanelWrapper } from '@/components/Tabs/TabsPanel'
import { SidebarNavigationSubMenus } from './SidebarNavigationSubMenus'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE
} from '@/utils/scrollbars'
import {
  ThemeToggle,
  LightThemeSvg,
  DarkThemeSvg
} from '@/components/Theme/ThemeToggle'

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

const MenuTabs = styled(Tabs)<{
  $isKeyNavigating: boolean
}>`
  height: 100%;

  ${TabsListWrapper} {
    height: ${HEADER_HEIGHT};
    z-index: ${LAYERS.STEP * 2};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: ${PAGE_FRAME_SPACING};
    padding-right: ${PAGE_FRAME_SPACING};
    margin-bottom: 0;
    background-color: ${COLORS.BACKGROUND_SITE};
    border-top: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    justify-content: center;

    &:before,
    &:after {
      display: none;
    }
  }

  ${TabsListScrollArea} {
    max-width: ${MAX_WIDTH_COMPACT};
    overflow: visible;
    padding-bottom: 0;

    &:before,
    &:after {
      display: none;
    }
  }

  ${TabsPanelWrapper} {
    position: relative;
    height: 100%;
    outline-offset: -${BORDER_SIZES.OUTLINE};
    overflow: hidden;

    &:before,
    &:after {
      position: absolute;
      z-index: ${LAYERS.STEP};
      left: -${PAGE_FRAME_SPACING};
      right: -${PAGE_FRAME_SPACING};
      content: '';
    }

    &:before {
      ${createScrollBarShadowStyles('top')};
      top: -${SCROLL_BAR_SHADOW_SIZE};
    }

    &:after {
      ${createScrollBarShadowStyles('bottom')};
      bottom: -${SCROLL_BAR_SHADOW_SIZE};
    }

    &:focus {
      z-index: ${LAYERS.HEADER};
    }
  }

  ${TabsButtonWrapper} {
    flex-grow: 1;
    justify-content: center;
    max-width: calc(${MAX_WIDTH_COMPACT} / 2);
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

// TODO: Remove?
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

// TODO: Remove?
const ThemeToggleText = styled.span`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
`

// TODO: Remove?
const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  justify-content: center;
`

const VersionBadgeWrapper = styled.div`
  display: flex;
  padding-top: ${SPACINGS.THREE};
  justify-content: center;
`

export function SidebarNavigationMenuCompact() {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  // TODO: Remove?

  // const theme = useAppSelector(selectTheme)
  // const [showTableOfContents, setShowTableOfContents] = useState(true)
  // const isLightTheme = theme === THEME_KEYS.LIGHT
  // const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <SidebarNavigationMenuCompactWrapper>
      <MenuTabs $isKeyNavigating={isKeyNavigating}>
        <TabsItem tab={TABS_SIDEBAR_NAVIGATION.TABS.MAIN_MENU}>
          <ScrollArea>
            <ul>
              <SidebarNavigationSubMenus />

              <li>
                <VersionBadgeWrapper>
                  <VersionBadge />
                </VersionBadgeWrapper>
              </li>
            </ul>
          </ScrollArea>
        </TabsItem>

        <TabsItem tab={TABS_SIDEBAR_NAVIGATION.TABS.ON_THIS_PAGE}>
          <ScrollArea>
            <TableOfContents />
          </ScrollArea>
        </TabsItem>
      </MenuTabs>
    </SidebarNavigationMenuCompactWrapper>
  )
}
