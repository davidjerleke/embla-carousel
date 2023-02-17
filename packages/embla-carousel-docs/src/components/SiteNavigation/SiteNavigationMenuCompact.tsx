import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { Links } from 'components/Footer/Links'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { OUTLINE_SIZE } from 'components/KeyNavigating/keyNavigatingStyles'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'
import { TabItem } from 'components/Tabs/TabItem'
import { LAYERS } from 'consts/layers'
import { Tab, TabList, TabPanel, Tabs } from 'components/Tabs/Tabs'
import { hiddenAtBreakpointStyles } from 'utils/hiddenAtBreakpointStyles'
import { useTheme } from 'hooks/useTheme'
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
  padding-bottom: calc(${HEADER_HEIGHT} + ${OUTLINE_SIZE});
  padding-top: calc(${HEADER_HEIGHT} + ${SPACINGS.TWO});
`

const MenuTabs = styled(Tabs)<{ $showTabs?: boolean }>`
  height: 100%;

  ${TabList} {
    height: ${HEADER_HEIGHT};
    position: absolute;
    bottom: 0;
    left: ${FRAME_SPACING};
    right: ${FRAME_SPACING};
    margin-bottom: 0;
    background-color: ${COLORS.BACKGROUND_SITE};
    border-top: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    z-index: ${LAYERS.STEP * 2};
    max-width: calc(${MAX_WIDTH_COMPACT} + ${FRAME_SPACING} * 2);
    margin-left: auto;
    margin-right: auto;
  }

  ${TabPanel} {
    height: 100%;
  }

  ${Tab} {
    flex-grow: 1;
    justify-content: center;
  }
`

const ScrollArea = styled.ul`
  padding-bottom: ${SPACINGS.FOUR};
  max-width: ${MAX_WIDTH_COMPACT};
  overflow: auto;
  position: relative;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
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
  justify-content: center;
`

type PropType = PropsWithChildren<{}>

export const SiteNavigationMenuCompact = (props: PropType) => {
  const { children } = props
  const { theme } = useTheme()
  const isLightTheme = theme === THEME_KEYS.LIGHT
  const oppositeTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

  return (
    <SiteNavigationMenuCompactWrapper>
      <MenuTabs>
        <TabItem label="Main menu" value="main-menu">
          <ScrollArea>
            {children}

            <ThemeToggleWrapper $hidden="DESKTOP">
              <ThemeToggleButton>
                <ThemeToggleText>
                  Activate {oppositeTheme} theme
                </ThemeToggleText>
              </ThemeToggleButton>
            </ThemeToggleWrapper>

            <li>
              <MiscLinks />
            </li>
          </ScrollArea>
        </TabItem>

        <TabItem
          label="On this page"
          value="table-of-contents"
          disabled={false /* TODO: fix! */}
        >
          <ScrollArea>
            <TableOfContents />
          </ScrollArea>
        </TabItem>
      </MenuTabs>
    </SiteNavigationMenuCompactWrapper>
  )
}
