import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLORS, THEME_KEYS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { OUTLINE_SIZE } from 'components/KeyNavigating/keyNavigatingStyles'
import { LAYERS } from 'consts/layers'
import { TableOfContents } from 'components/TableOfContents/TableOfContents'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { TabsItem } from 'components/Tabs/TabsItem'
import { Tab, TabList, TabPanel, Tabs } from 'components/Tabs/Tabs'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { useTheme } from 'hooks/useTheme'
import { useNavigation } from 'hooks/useNavigation'
import { useTableOfContents } from 'hooks/useTableOfContents'
import {
  ThemeToggle,
  LightThemeSvg,
  DarkThemeSvg,
} from 'components/Theme/ThemeToggle'

const MAX_WIDTH_COMPACT = '36rem'

const scrollShadowStyles = `0 0 transparent, 0 -1.2rem 1.6rem ${COLORS.BACKGROUND_SITE}`

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
    border-top: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: 0;
    justify-content: center;
  }

  ${TabPanel} {
    position: relative;
    height: 100%;
    outline-offset: -${OUTLINE_SIZE};
    overflow: hidden;

    &:before,
    &:after {
      box-shadow: ${({ $isKeyNavigating }) =>
        $isKeyNavigating ? 'none' : scrollShadowStyles};

      position: absolute;
      z-index: ${LAYERS.STEP};
      height: ${HEADER_HEIGHT};
      left: 0;
      right: 0;
      content: '';
      pointer-events: none;
    }

    &:before {
      top: -${HEADER_HEIGHT};
      transform: rotate(180deg);
    }

    &:after {
      bottom: -${HEADER_HEIGHT};
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
  padding-top: ${SPACINGS.TWO};
  padding-bottom: ${SPACINGS.FOUR};
  max-width: ${MAX_WIDTH_COMPACT};
  overflow: auto;
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

const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  justify-content: center;
`

type PropType = PropsWithChildren<{}>

export const SiteNavigationMenuCompact = (props: PropType) => {
  const { children } = props
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
              {children}

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
