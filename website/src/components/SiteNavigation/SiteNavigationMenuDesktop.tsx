import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { COLORS } from '@/utils/theme'
import { MEDIA } from '@/utils/breakpoints'
import { SPACINGS } from '@/utils/spacings'
import { PAGE_FRAME_SPACING } from '@/components/Page/PageFrame'
import { FONT_SIZES } from '@/utils/font-sizes'
import { FooterLinks } from '@/components/Footer/FooterLinks'
import { LAYERS } from '@/utils/layers'
import type { KeyNavigatingPropType } from '@/utils/key-events'
import { SiteNavigationSubMenus } from './SiteNavigationSubMenus'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE
} from '@/utils/scrollbars'

const SiteNavigationMenuDesktopWrapper = styled.div<KeyNavigatingPropType>`
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

export function SiteNavigationMenuDesktop() {
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
