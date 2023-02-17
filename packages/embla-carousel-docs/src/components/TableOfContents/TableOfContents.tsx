import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { SPACINGS } from 'consts/spacings'
import { Menu } from './Menu'

const TableOfContentsWrapper = styled.nav`
  ${MEDIA.DESKTOP} {
    position: fixed;
    z-index: ${LAYERS.NAVIGATION};
    top: calc(${FRAME_SPACING} + ${HEADER_HEIGHT});
    bottom: 0;
    padding-bottom: ${SPACINGS.FOUR};
    width: inherit;
    max-width: inherit;
  }

  ${MEDIA.MIN_LG} {
    padding-left: ${SPACINGS.SEVEN};
  }
`

export const TableOfContents = () => {
  return (
    <TableOfContentsWrapper aria-label="table of contents">
      <Menu />
    </TableOfContentsWrapper>
  )
}
