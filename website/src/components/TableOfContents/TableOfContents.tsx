import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { TableOfContentsMenu } from '@/components/TableOfContents/TableOfContentsMenu'
import { MEDIA } from '@/utils/breakpoints'
import { LAYERS } from '@/utils/layers'
import { HEADER_HEIGHT } from '@/utils/header'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES } from '@/utils/font-sizes'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import {
  createScrollBarShadowStyles,
  SCROLL_BAR_SHADOW_SIZE
} from '@/utils/scrollbars'

const TableOfContentsWrapper = styled.nav`
  ${MEDIA.DESKTOP} {
    position: sticky;
    z-index: ${LAYERS.NAVIGATION};
    top: ${HEADER_HEIGHT};
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    bottom: 0;
    width: inherit;
    max-width: inherit;
  }

  ${MEDIA.MIN_LG} {
    padding-left: ${SPACINGS.SEVEN};
  }
`

const MenuWrapper = styled.div<{
  $isKeyNavigating: boolean
}>`
  ${MEDIA.DESKTOP} {
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
  }
`

export function TableOfContents() {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <TableOfContentsWrapper aria-label="table of contents">
      <MenuWrapper $isKeyNavigating={isKeyNavigating}>
        <TableOfContentsMenu />
      </MenuWrapper>
    </TableOfContentsWrapper>
  )
}
