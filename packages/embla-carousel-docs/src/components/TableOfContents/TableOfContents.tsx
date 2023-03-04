import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { TableOfContentsMenu } from './TableOfContentsMenu'

const scrollShadowStyles = `0 0 transparent, 0 -1.2rem 1.6rem ${COLORS.BACKGROUND_SITE}`

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
      box-shadow: ${({ $isKeyNavigating }) =>
        $isKeyNavigating ? 'none' : scrollShadowStyles};

      position: absolute;
      z-index: ${LAYERS.STEP};
      height: ${HEADER_HEIGHT};
      left: -${FRAME_SPACING};
      right: -${FRAME_SPACING};
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
