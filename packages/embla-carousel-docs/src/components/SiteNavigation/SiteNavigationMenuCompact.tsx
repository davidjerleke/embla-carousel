import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectTheme } from 'components/Theme/themeReducer'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { selectTableOfContents } from 'components/TableOfContents/tableOfContentsReducer'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { HEADER_HEIGHT } from 'consts/header'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { LAYERS } from 'consts/layers'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { TABS_SITE_NAVIGATION } from 'consts/tabs'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { TabsItem } from 'components/Tabs/TabsItem'
import { Tabs } from 'components/Tabs/Tabs'
import { TabsListScrollArea, TabsListWrapper } from 'components/Tabs/TabsList'
import { TabsButtonWrapper } from 'components/Tabs/TabsButton'
import { TabsPanelWrapper } from 'components/Tabs/TabsPanel'
import { SiteNavigationSubMenus } from './SiteNavigationSubMenus'
import { selectIsModalOpen } from 'components/Modal/modalReducer'
import { MODALS } from 'consts/modal'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE
} from 'consts/scrollBars'
import {
  ThemeToggle,
  LightThemeSvg,
  DarkThemeSvg
} from 'components/Theme/ThemeToggle'

const MAX_WIDTH_COMPACT = '36rem'

const SiteNavigationMenuCompactWrapper = styled.div`
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

const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  justify-content: center;
`

export const SiteNavigationMenuCompact = () => {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const theme = useAppSelector(selectTheme)
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_NAVIGATION))
  const isOpenRef = useRef(isOpen)
  const tableOfContents = useAppSelector(selectTableOfContents)
  const [showTableOfContents, setShowTableOfContents] = useState(true)
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  useEffect(() => {
    if (isOpen !== isOpenRef.current) {
      const show = !!tableOfContents.items?.length
      setShowTableOfContents(show)
      isOpenRef.current = isOpen
    }
  }, [isOpen, tableOfContents])

  return (
    <SiteNavigationMenuCompactWrapper>
      <MenuTabs $isKeyNavigating={isKeyNavigating}>
        <TabsItem tab={TABS_SITE_NAVIGATION.TABS.MAIN_MENU}>
          <ScrollArea>
            <ul>
              <SiteNavigationSubMenus />

              <li>
                <ThemeToggleButton>
                  <ThemeToggleText>
                    Activate {oppositeTheme} theme
                  </ThemeToggleText>
                </ThemeToggleButton>
              </li>

              <li>
                <MiscLinks />
              </li>
            </ul>
          </ScrollArea>
        </TabsItem>

        <TabsItem
          tab={TABS_SITE_NAVIGATION.TABS.ON_THIS_PAGE}
          disabled={!showTableOfContents}
        >
          <ScrollArea>
            <TableOfContents />
          </ScrollArea>
        </TabsItem>
      </MenuTabs>
    </SiteNavigationMenuCompactWrapper>
  )
}
