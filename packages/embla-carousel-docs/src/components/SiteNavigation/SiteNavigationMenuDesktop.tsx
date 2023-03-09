import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { FooterLinks } from 'components/Footer/FooterLinks'
import { LAYERS } from 'consts/layers'
import { SiteNavigationSubMenus } from './SiteNavigationSubMenus'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import {
  createScrollBarShadowStyles,
  SCROLL_BAR_SHADOW_SIZE,
} from 'consts/scrollBars'

const SiteNavigationMenuDesktopWrapper = styled.div<{
  $isKeyNavigating: boolean
}>`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;

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

  ${MEDIA.COMPACT} {
    display: none;
  }
`

const ScrollArea = styled.ul`
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
  overflow: auto;
  max-height: 100%;
`

const MiscLinks = styled(FooterLinks)`
  padding-top: ${SPACINGS.THREE};
  flex-direction: column;
`

export const SiteNavigationMenuDesktop = () => {
  const { isKeyNavigating } = useKeyNavigating()

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
