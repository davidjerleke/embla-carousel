import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { FONT_SIZES } from 'consts/fontSizes'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { LAYERS } from 'consts/layers'
import { SiteNavigationSubMenus } from './SiteNavigationSubMenus'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE
} from 'consts/scrollBars'

const SiteNavigationMenuDesktopWrapper = styled.div<{
  $isKeyNavigating: boolean
}>`
  background-color: ${COLORS.BACKGROUND_SITE};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  position: relative;
  height: 100%;

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

  ${MEDIA.COMPACT} {
    display: none;
  }
`

const ScrollArea = styled.ul`
  ${createScrollBarStyles('y')};
  padding-top: ${PAGE_FRAME_SPACING};
  padding-bottom: ${PAGE_FRAME_SPACING};
  overflow: auto;
  max-height: 100%;
`

const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  flex-direction: column;
`

export const SiteNavigationMenuDesktop = () => {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <SiteNavigationMenuDesktopWrapper $isKeyNavigating={isKeyNavigating}>
      <ScrollArea>
        <SiteNavigationSubMenus isDesktopMenu />
        <li>
          <MiscLinks />
        </li>
      </ScrollArea>
    </SiteNavigationMenuDesktopWrapper>
  )
}
