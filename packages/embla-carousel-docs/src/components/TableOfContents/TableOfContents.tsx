import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { SPACINGS } from 'consts/spacings'
import { Menu } from './Menu'

export const THIS_PAGE_NAVIGATION_WIDTH = '28rem'

const Wrapper = styled.nav`
  ${MEDIA.MIN_LG} {
    position: fixed;
    z-index: ${LAYERS.NAVIGATION};
    width: ${THIS_PAGE_NAVIGATION_WIDTH};
    top: calc(${FRAME_SPACING} + ${HEADER_HEIGHT});
    padding-left: ${SPACINGS.SEVEN};
    padding-bottom: ${SPACINGS.FOUR};
    bottom: 0;
  }
`

export const TableOfContents = () => {
  return (
    <Wrapper aria-label="table of contents">
      <Menu />
    </Wrapper>
  )
}
