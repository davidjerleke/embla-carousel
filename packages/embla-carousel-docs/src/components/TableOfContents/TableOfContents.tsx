import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { HEADER_HEIGHT } from 'consts/header'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { TableOfContentsMenu } from './TableOfContentsMenu'
import {
  createScrollBarShadowStyles,
  SCROLL_BAR_SHADOW_SIZE
} from 'consts/scrollBars'

const TableOfContentsWrapper = styled.nav`
  ${MEDIA.DESKTOP} {
    position: fixed;
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
  height: 100%;

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

export const TableOfContents = () => {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <TableOfContentsWrapper aria-label="table of contents">
      <MenuWrapper $isKeyNavigating={isKeyNavigating}>
        <TableOfContentsMenu />
      </MenuWrapper>
    </TableOfContentsWrapper>
  )
}
