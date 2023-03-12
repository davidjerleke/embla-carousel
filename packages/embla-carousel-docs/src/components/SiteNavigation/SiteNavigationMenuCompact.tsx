import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { LAYERS } from 'consts/layers'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { TabsItem } from 'components/Tabs/TabsItem'
import { Tab, TabList, TabPanel, Tabs } from 'components/Tabs/Tabs'
import { SiteNavigationSubMenus } from './SiteNavigationSubMenus'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { useTheme } from 'hooks/useTheme'
import { useNavigation } from 'hooks/useNavigation'
import { useTableOfContents } from 'hooks/useTableOfContents'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE,
} from 'consts/scrollBars'
import {
  ThemeToggle,
  LightThemeSvg,
  DarkThemeSvg,
} from 'components/Theme/ThemeToggle'

const MAX_WIDTH_COMPACT = '36rem'

const SiteNavigationMenuCompactWrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
  z-index: ${LAYERS.STEP};
  padding-right: ${FRAME_SPACING};
  padding-left: ${FRAME_SPACING};
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

  ${TabList} {
    height: ${HEADER_HEIGHT};
    z-index: ${LAYERS.STEP * 2};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-left: ${FRAME_SPACING};
    padding-right: ${FRAME_SPACING};
    margin-bottom: 0;
    background-color: ${COLORS.BACKGROUND_SITE};
    border-top: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    justify-content: center;
  }

  ${TabPanel} {
    position: relative;
    height: 100%;
    outline-offset: -${BORDER_SIZES.OUTLINE};
    overflow: hidden;

    &:before,
    &:after {
      position: absolute;
      z-index: ${LAYERS.STEP};
      left: -${FRAME_SPACING};
      right: -${FRAME_SPACING};
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

  ${Tab} {
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

  > ${LightThemeSvg}, ${DarkThemeSvg} {
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
  const { theme } = useTheme()
  const { isKeyNavigating } = useKeyNavigating()
  const { isOpen } = useNavigation()
  const isOpenRef = useRef(isOpen)
  const tableOfContents = useTableOfContents()
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
        <TabsItem label="Main menu" value="main-menu">
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
          label="On this page"
          value="table-of-contents"
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
