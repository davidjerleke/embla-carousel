import React from 'react'
import styled, { css } from 'styled-components'
import { Frame } from 'components/SiteLayout/Frame'
import { SiteNavigationToggle } from 'components/SiteNavigation/SiteNavigationToggle'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { Actions } from './Actions'
import { Logo } from './Logo'

export const HEADER_HEIGHT = SPACINGS.TEN
export const HEADER_ID = 'site-header'

const HEIGHT = css`
  height: ${HEADER_HEIGHT};
`

const Wrapper = styled.header`
  ${HEIGHT};
`

const Fixed = styled.div`
  ${HEIGHT};
  z-index: ${LAYERS.HEADER};
  background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.8);
  border-bottom: 0.1rem solid ${COLORS.DETAIL_LOW_CONTRAST};
  backdrop-filter: saturate(180%) blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${MEDIA.DESKTOP} {
    z-index: ${LAYERS.NAVIGATION + 1};
  }
`

const Content = styled(Frame)`
  ${HEIGHT};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Header = () => {
  return (
    <Wrapper id={HEADER_ID}>
      <Fixed>
        <Content>
          <SiteNavigationToggle />
          <Logo />
          <Actions />
        </Content>
      </Fixed>
    </Wrapper>
  )
}
