import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { SPACINGS } from 'consts/spacings'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { TableOfContentsMenu } from './TableOfContentsMenu'
import {
  createScrollBarShadowStyles,
  SCROLL_BAR_SHADOW_SIZE,
} from 'consts/scrollBars'

const TableOfContentsWrapper = styled.nav`
  ${MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${LAYERS.NAVIGATION};
    top: ${HEADER_HEIGHT};
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
  }
`

export const TableOfContents = () => {
  const { isKeyNavigating } = useKeyNavigating()

  return (
    <TableOfContentsWrapper aria-label="table of contents">
      <MenuWrapper $isKeyNavigating={isKeyNavigating}>
        <TableOfContentsMenu />
      </MenuWrapper>
    </TableOfContentsWrapper>
  )
}
